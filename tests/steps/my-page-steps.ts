import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/custom-world';

Then('ユーザーネームが {string} であること', async function (this: CustomWorld, username: string) {
  await this.myPage.verifyUsername(username);
});

Then('ランクが {string} であること', async function (this: CustomWorld, rank: string) {
  await this.myPage.verifyRank(rank);
});

Then('メールアドレスが {string} であること', async function (this: CustomWorld, email: string) {
  await this.myPage.verifyEmail(email);
});

Then('電話番号が {string} であること', async function (this: CustomWorld, phone: string) {
  await this.myPage.verifyPhone(phone);
});

Then('住所が {string} であること', async function (this: CustomWorld, address: string) {
  await this.myPage.verifyAddress(address);
});

Then('生年月日が {string} であること', async function (this: CustomWorld, birthday: string) {
  await this.myPage.verifyBirthday(birthday);
});

Then('性別が {string} であること', async function (this: CustomWorld, gender: string) {
  await this.myPage.verifyGender(gender);
});

Then('お知らせが {string} であること', async function (this: CustomWorld, notice: string) {
  await this.myPage.verifyNotice(notice);
});
