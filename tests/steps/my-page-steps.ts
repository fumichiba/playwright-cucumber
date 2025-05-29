import { Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/custom-world";

Then(
  "ユーザーネームが {string} であること",
  async function (this: CustomWorld, username: string) {
    await this.myPage.verifyUsername(username);
  }
);

Then(
  "ランクが {string} であること",
  async function (this: CustomWorld, rank: string) {
    await this.myPage.verifyRank(rank);
  }
);
