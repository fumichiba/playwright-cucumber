import { BasePage } from "./base-page";

export class TopPage extends BasePage {
  async clickLoginButton() {
    await this.clickButtonByRoleName("ログイン");
  }
}
