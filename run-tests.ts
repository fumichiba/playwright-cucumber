import { execSync } from 'child_process';

const isCI = process.env.CI === 'true';
const tags = process.env.TAGS || '@default';

// 環境変数に渡す
process.env.TAGS = tags;

const command = isCI
  ? 'npm-run-all --sequential --continue-on-error test:chromium test:firefox test:webkit'
  : 'npm-run-all --parallel --continue-on-error test:chromium test:firefox test:webkit';

let hasError = false;

// テストを実行
try {
  execSync(command, { stdio: 'inherit' });
} catch (e) {
  console.warn('テストの一部が失敗しました。');
  hasError = true;
}

// レポート生成は必ず行う
try {
  execSync('npm run report', { stdio: 'inherit' });
} catch (e) {
  console.warn('レポート生成に失敗しました。');
}

if (hasError) {
  process.exit(1);
}
