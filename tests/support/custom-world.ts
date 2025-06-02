import { setWorldConstructor, World } from '@cucumber/cucumber';
import { launchBrowser } from './launch-browser';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { TopPage } from '../pages/top-page';
import { LoginPage } from '../pages/login-page';
import { MyPage } from '../pages/my-page';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  basePage!: BasePage;
  topPage!: TopPage;
  loginPage!: LoginPage;
  myPage!: MyPage;

  async init() {
    this.browser = await launchBrowser();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // 各ページオブジェクトの初期化（page を渡す）
    this.basePage = new BasePage(this.page);
    this.topPage = new TopPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.myPage = new MyPage(this.page);
  }

  async close() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
