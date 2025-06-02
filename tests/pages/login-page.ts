import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  async clickLoginExecuteButton() {
    await this.clickBySelector('#login-button');
  }
}
