import { execSync } from 'child_process';

const isCI = process.env.CI === 'true';

const command = isCI
  ? 'npm-run-all --sequential --continue-on-error test:chromium test:firefox test:webkit'
  : 'npm-run-all --parallel --continue-on-error test:chromium test:firefox test:webkit';

execSync(command, { stdio: 'inherit' });
