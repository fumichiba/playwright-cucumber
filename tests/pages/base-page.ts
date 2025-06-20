import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  // 指定のURLに遷移
  async navigateTo(url: string): Promise<void> {
    // どんなページにも対応できるよう、networkidleまで待つ
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  // ラベルで入力フィールドを特定して入力
  async fillInputByLabel(label: string, value: string): Promise<void> {
    await this.page.getByLabel(label).fill(value);
  }

  // セレクタでクリック（ボタンなど）
  async clickBySelector(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  // ボタンをロール名でクリック
  async clickButtonByRoleName(name: string) {
    await this.page.getByRole('button', { name }).click();
  }

  // テキストが表示されるまで待つ（例: ログイン完了メッセージなど）
  async waitForText(text: string, timeout: number = 5000): Promise<void> {
    await this.page.getByText(text, { exact: false }).waitFor({ timeout });
  }

  // セレクタからテキストを取得
  async getText(selector: string): Promise<string> {
    return (await this.page.textContent(selector)) || '';
  }

  // スクリーンショットを取る
  async takeScreenshot(path: string): Promise<void> {
    await this.page.screenshot({ path, fullPage: true });
  }

  // 一定時間待つ（強制）
  async waitForMilliseconds(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
