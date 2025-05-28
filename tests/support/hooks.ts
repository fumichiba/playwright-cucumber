// tests/support/hooks.ts
import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './custom-world';

setDefaultTimeout(30 * 1000); // firefoxの起動時時間がかかるためタイムアウトを30秒に設定

Before(async function (this: CustomWorld) {
  await this.init(); // page, context, 各Pageオブジェクト初期化
});

After(async function (this: CustomWorld) {
  await this.close(); // cleanup
});
