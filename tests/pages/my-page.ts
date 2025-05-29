import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class MyPage extends BasePage {
  async verifyUsername(username: string) {
    await expect(this.page.locator('#username')).toHaveText(username);
  }

  async verifyRank(rank: string) {
    await expect(this.page.locator('#rank')).toHaveText(rank);
  }
}
