import reporter from 'multiple-cucumber-html-reporter';

reporter.generate({
  jsonDir: './reports/json', // 全てのJSONを含むディレクトリ
  reportPath: './reports/html', // 出力するHTMLのパス
  metadata: {
    browser: {
      name: 'multi-browser',
      version: 'N/A',
    },
    device: 'Local test machine',
    platform: {
      name: 'ubuntu',
      version: '22.04',
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Playwright + Cucumber' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Date', value: new Date().toLocaleString() },
    ],
  },
});
