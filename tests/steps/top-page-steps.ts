import { When } from "@cucumber/cucumber";
import { CustomWorld } from "../support/custom-world";

When("ログインボタンをクリックする", async function (this: CustomWorld) {
  await this.topPage.clickLoginButton();
});
