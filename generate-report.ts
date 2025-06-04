import os from 'os';
import fs from 'fs';
import path from 'path';
import { chromium, firefox, webkit } from 'playwright';
import reporter from 'multiple-cucumber-html-reporter';

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

  if (platform === 'linux' && release.includes('microsoft')) {
    return 'WSL / Virtual Machine';
  } else if (platform === 'darwin') {
    return 'MacBook / iMac';
  } else if (platform === 'win32') {
    return 'Windows PC';
  }
  return os.hostname() || 'Unknown Device';
};

const getPlatformVersion = (): string => {
  const platform = os.platform().toLowerCase();

  if (platform === 'linux') {
    try {
      const content = fs.readFileSync('/etc/os-release', 'utf8');
      const match = content.match(/VERSION_ID="(.+?)"/);
      if (match) return match[1]; // 例: "22.04"
    } catch {
      // fallback
      return os.release(); // カーネルバージョンを返す
    }
  }

  // MacやWindowsなどはos.release()で十分
  return os.release();
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
  // ディレクトリ作成（なければ）
  if (!fs.existsSync(mergedJsonDir)) {
    fs.mkdirSync(mergedJsonDir, { recursive: true });
  }

  let mergedFeatures: any[] = [];

  for (const { file, browser, launcher } of browserFiles) {
    const filePath = path.join(jsonDir, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipped missing file: ${file}`);
      continue;
    }

    // Playwright からバージョン取得
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
          name: normalizePlatformName(os.platform()),
          version: getPlatformVersion(),
        },
      };
    }

    mergedFeatures = mergedFeatures.concat(features);
  }

  // 保存
  fs.writeFileSync(mergedJsonPath, JSON.stringify(mergedFeatures, null, 2));

  // レポート生成
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
