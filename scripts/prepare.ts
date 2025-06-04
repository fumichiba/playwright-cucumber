import fs from 'fs';
import path from 'path';

const screenshotsPath = path.resolve('screenshots');

if (fs.existsSync(screenshotsPath)) {
  fs.rmSync(screenshotsPath, { recursive: true, force: true });
  console.log('Cleaned screenshots directory.');
}
