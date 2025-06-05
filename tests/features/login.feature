Feature: ユーザーログイン

  Scenario Outline: ユーザーがログインできることを確認する
    Given "<url>" へアクセスする
    When ログインボタンをクリックする
    And "メールアドレス" に "<email>" を入力する
    And "パスワード" に "<password>" を入力する
    And ログイン実行ボタンをクリックする
    Then ユーザーネームが "<username>" であること
    And ランクが "<rank>" であること

    Examples:
      | url                                         | email               | password  | username   | rank                 |
      | https://hotel-example-site.takeyaqa.dev/ja/ | ichiro@example.com  | password  | 山田一郎   | プレミアム会員(失敗) |
      | https://hotel-example-site.takeyaqa.dev/ja/ | sakura@example.com  | pass1234  | 松本さくら | 一般会員             |
      | https://hotel-example-site.takeyaqa.dev/ja/ | jun@example.com     | pa55w0rd! | 林潤       | プレミアム会員       |
      | https://hotel-example-site.takeyaqa.dev/ja/ | yoshiki@example.com | pass-pass | 木村良樹   | 一般会員             |
