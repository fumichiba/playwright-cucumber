import { Given, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/custom-world';

Given('{string} へアクセスする', async function (this: CustomWorld, url: string) {
  await this.basePage.navigateTo(url);
});

When('{string} に {string} を入力する', async function (this: CustomWorld, field: string, value: string) {
  await this.basePage.fillInputByLabel(field, value);
});