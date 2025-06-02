import { Browser, chromium, firefox, webkit } from 'playwright';

export async function launchBrowser(): Promise<Browser> {
  const browserType = process.env.BROWSER || 'chromium';
  switch (browserType) {
    case 'firefox':
      // console.log('Launching Firefox browser');
      return await firefox.launch();
    case 'webkit':
      // console.log('Launching WebKit browser');
      return await webkit.launch();
    default:
      // console.log('Launching Chromium browser');
      return await chromium.launch();
  }
}
