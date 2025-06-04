import fs from 'fs';
import path from 'path';
import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { CustomWorld } from './custom-world';

setDefaultTimeout(30 * 1000); // firefoxの起動時時間がかかるためタイムアウトを30秒に設定

Before(async function (this: CustomWorld) {
  await this.init(); // page, context, 各Pageオブジェクト初期化
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const dir = path.resolve('screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const safeScenarioName = scenario.pickle.name.replace(/[<>:"/\\|?*]/g, '_');
    const fileName = `${safeScenarioName}(${process.env.BROWSER}).png`;
    const filePath = path.join(dir, fileName);

    await this.page.screenshot({ path: filePath, type: 'png' });
    this.attach(fs.readFileSync(filePath), 'image/png');
  }

  await this.close(); // cleanup
});
