import { execSync } from 'child_process';

const isCI = process.env.CI === 'true';

const command = isCI
  ? 'npm-run-all --sequential --continue-on-error test:chromium test:firefox test:webkit'
  : 'npm-run-all --parallel --continue-on-error test:chromium test:firefox test:webkit';

try {
  execSync(command, { stdio: 'inherit' });
} catch (e) {
  console.warn('テストの一部が失敗しました。');
  process.exit(1);
}
