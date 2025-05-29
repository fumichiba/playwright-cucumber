import { When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/custom-world";

When("ログイン実行ボタンをクリックする", async function (this: CustomWorld) {
  await this.loginPage.clickLoginExecuteButton();
});
