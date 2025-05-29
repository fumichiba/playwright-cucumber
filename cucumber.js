module.exports = {
    default: {
        paths: ['tests/features/**/*.feature'],     // feature ファイルの場所
        require: [                                  // テストスクリプトが格納される場所     
            'tests/steps/**/*.ts',
            'tests/support/**/*.ts'
        ],
        requireModule: ['ts-node/register'],        // TypeScript実行用の設定
        format: [
            'summary',
        ],
    }
}