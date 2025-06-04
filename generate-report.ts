import os from 'os';
import fs from 'fs';
import path from 'path';
import { chromium, firefox, webkit } from 'playwright';
import reporter from 'multiple-cucumber-html-reporter';
import { execSync } from 'child_process';

// 正規化：browser.name
const normalizeBrowserName = (name: string): string => {
  if (name.includes('chrom')) return 'chrome';
  if (name.includes('firefox')) return 'firefox';
  if (name.includes('webkit') || name.includes('safari')) return 'safari';
  if (name.includes('edge')) return 'edge';
  if (name.includes('explorer') || name.includes('ie')) return 'explorer';
  return 'unknown'; // fallback
};

// 正規化：platform.name
const normalizePlatformName = (platform: string): string => {
  if (platform.includes('win')) return 'windows';
  if (platform.includes('darwin') || platform.includes('mac')) return 'osx';
  if (platform.includes('ubuntu')) return 'ubuntu';
  if (platform.includes('linux')) return 'linux';
  if (platform.includes('android')) return 'android';
  if (platform.includes('ios')) return 'ios';
  return 'unknown';
};

// 推定デバイス
const getDeviceInfo = (): string => {
  const platform = os.platform().toLowerCase();
  const release = os.release().toLowerCase();

  const hostname = os.hostname().toLowerCase();

  if (platform === 'linux' && release.includes('microsoft')) {
    return 'WSL / Virtual Machine';
  }

  // GitHub Actions ホスト名（例: fv-az...）
  if (hostname.startsWith('fv-az')) {
    return 'GitHub Actions / Virtual Machine';
  }

  // CodeBuild コンテナID（例: 3c28ddcca9fc）
  if (/^[0-9a-f]{12}$/.test(hostname)) {
    return 'AWS CodeBuild / Docker Container';
  }

  if (platform === 'darwin') {
    return 'MacBook / iMac';
  } else if (platform === 'win32') {
    return 'Windows PC';
  }

  return 'Unknown Device';
};

// 人間が読めるOS名とバージョン
const getHumanReadableOSInfo = (): { name: string; version: string } => {
  const platform = os.platform();

  try {
    if (platform === 'win32') {
      const caption = execSync('wmic os get Caption', { encoding: 'utf8' });
      const match = caption.match(/Microsoft\s+(Windows\s+\d+)/i);
      return {
        name: 'windows',
        version: match?.[1] || 'Windows',
      };
    }

    if (platform === 'darwin') {
      const version = execSync('sw_vers -productVersion', { encoding: 'utf8' }).trim();
      return {
        name: 'osx',
        version,
      };
    }

    if (platform === 'linux') {
      const osRelease = execSync('cat /etc/os-release', { encoding: 'utf8' });
      const prettyName = osRelease.match(/^PRETTY_NAME="(.+?)"$/m)?.[1];
      const distro = prettyName?.toLowerCase() || '';
      const isUbuntu = distro.includes('ubuntu');

      return {
        name: isUbuntu ? 'ubuntu' : 'linux',
        version: prettyName || os.release(),
      };
    }

    return { name: 'unknown', version: os.release() };
  } catch (e) {
    return { name: 'unknown', version: os.release() };
  }
};

const jsonDir = path.resolve('reports/json');
const mergedJsonDir = path.join(jsonDir, 'merged');
const mergedJsonPath = path.join(mergedJsonDir, 'merged.json');

const browserFiles = [
  { file: 'chromium.json', browser: 'chromium', launcher: chromium },
  { file: 'firefox.json', browser: 'firefox', launcher: firefox },
  { file: 'webkit.json', browser: 'webkit', launcher: webkit },
];

(async () => {
  if (!fs.existsSync(mergedJsonDir)) {
    fs.mkdirSync(mergedJsonDir, { recursive: true });
  }

  const osInfo = getHumanReadableOSInfo();
  let mergedFeatures: any[] = [];

  for (const { file, browser, launcher } of browserFiles) {
    const filePath = path.join(jsonDir, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipped missing file: ${file}`);
      continue;
    }

    let browserVersion = 'unknown';
    try {
      const instance = await launcher.launch();
      browserVersion = instance.version();
      await instance.close();
    } catch {
      console.warn(`Failed to get version for ${browser}`);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const features = JSON.parse(content);

    for (const feature of features) {
      feature.metadata = {
        browser: {
          name: normalizeBrowserName(browser),
          version: browserVersion,
        },
        device: getDeviceInfo(),
        platform: {
          name: osInfo.name,
          version: osInfo.version,
        },
      };
    }

    mergedFeatures = mergedFeatures.concat(features);
  }

  fs.writeFileSync(mergedJsonPath, JSON.stringify(mergedFeatures, null, 2));

  reporter.generate({
    jsonDir: mergedJsonDir,
    reportPath: 'reports/html',
    reportName: 'E2E Test Report',
    pageTitle: 'Playwright Cucumber Report',
    displayDuration: true,
    openReportInBrowser: false,
    customData: {
      title: 'Run Info',
      data: [
        { label: 'Project', value: 'Playwright + Cucumber' },
        { label: 'Release', value: '1.0.0' },
        { label: 'Execution Date', value: new Date().toLocaleString() },
      ],
    },
  });
})();
