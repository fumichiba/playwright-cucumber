import { expect, Page } from '@playwright/test';

export class MyPage {
  constructor(private page: Page) {}

  async verifyUsername(username: string) {
    await expect(this.page.locator('xpath=//h5[text()="氏名"]/following-sibling::p')).toHaveText(username);
  }

  async verifyRank(rank: string) {
    await expect(this.page.locator('xpath=//h5[text()="会員ランク"]/following-sibling::p')).toHaveText(rank);
  }

  async verifyEmail(email: string) {
    await expect(this.page.locator('xpath=//h5[text()="メールアドレス"]/following-sibling::p')).toHaveText(email);
  }

  async verifyPhone(phone: string) {
    await expect(this.page.locator('xpath=//h5[text()="電話番号"]/following-sibling::p')).toHaveText(phone);
  }

  async verifyAddress(address: string) {
    await expect(this.page.locator('xpath=//h5[text()="住所"]/following-sibling::p')).toHaveText(address);
  }

  async verifyBirthday(birthday: string) {
    await expect(this.page.locator('xpath=//h5[text()="生年月日"]/following-sibling::p')).toHaveText(birthday);
  }

  async verifyGender(gender: string) {
    await expect(this.page.locator('xpath=//h5[text()="性別"]/following-sibling::p')).toHaveText(gender);
  }

  async verifyNotice(notice: string) {
    await expect(this.page.locator('xpath=//h5[text()="お知らせ"]/following-sibling::p')).toHaveText(notice);
  }
}
