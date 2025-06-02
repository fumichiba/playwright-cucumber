const isCI = !!process.env.CI;

const commonConfig = {
  paths: ['tests/features/**/*.feature'],
  require: ['tests/steps/**/*.ts', 'tests/support/**/*.ts'],
  requireModule: ['ts-node/register'],
  format: ['summary'],
  retry: isCI ? 2 : 0,
// テスト失敗時の動作が安定していないので並列実行は強制的にOFF
//   parallel: isCI ? 0 : 4  // 0で並列OFF, 数字で同時実行数を制限
  parallel: 0
};

module.exports = {
  default: {
    ...commonConfig,
  },

  chromium: {
    ...commonConfig,
    format: ['json:reports/json/chromium.json']
  },

  firefox: {
    ...commonConfig,
    format: ['json:reports/json/firefox.json']
  },

  webkit: {
    ...commonConfig,
    format: ['json:reports/json/webkit.json']
  }
};
