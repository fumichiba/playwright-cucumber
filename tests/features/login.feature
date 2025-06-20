Feature: ユーザーログイン

  Scenario Outline: ユーザーがログインできることを確認する
    Given "<url>" へアクセスする
    When ログインボタンをクリックする
    And "メールアドレス" に "<email>" を入力する
    And "パスワード" に "<password>" を入力する
    And ログイン実行ボタンをクリックする
    Then ユーザーネームが "<username>" であること
    And ランクが "<rank>" であること
    And メールアドレスが "<email>" であること
    And 電話番号が "<phone>" であること
    And 住所が "<address>" であること
    And 生年月日が "<birthday>" であること
    And 性別が "<gender>" であること
    And お知らせが "<notice>" であること

    @smoke
    Examples:
      | url                                         | email              | password | username | rank           | phone        | address                   | birthday     | gender | notice       |
      | https://hotel-example-site.takeyaqa.dev/ja/ | ichiro@example.com | password | 山田一郎 | プレミアム会員 | 01234567891  | 東京都豊島区池袋          | 未登録       | 男性   | 受け取る     |

    @regression
    Examples:
      | url                                         | email              | password | username   | rank           | phone        | address                         | birthday     | gender | notice       |
      | https://hotel-example-site.takeyaqa.dev/ja/ | ichiro@example.com | password | 山田一郎   | プレミアム会員 | 01234567891  | 東京都豊島区池袋                | 未登録       | 男性   | 受け取る     |
      | https://hotel-example-site.takeyaqa.dev/ja/ | sakura@example.com | pass1234 | 松本さくら | 一般会員       | 未登録       | 神奈川県横浜市鶴見区大黒ふ頭      | 2000年4月1日 | 女性   | 受け取らない |

    Examples:
      | url                                         | email               | password  | username   | rank           | phone        | address                   | birthday       | gender | notice       |
      | https://hotel-example-site.takeyaqa.dev/ja/ | ichiro@example.com  | password  | 山田一郎   | プレミアム会員 | 01234567891  | 東京都豊島区池袋          | 未登録         | 男性   | 受け取る     |
      | https://hotel-example-site.takeyaqa.dev/ja/ | sakura@example.com  | pass1234  | 松本さくら | 一般会員       | 未登録       | 神奈川県横浜市鶴見区大黒ふ頭| 2000年4月1日   | 女性   | 受け取らない |
      | https://hotel-example-site.takeyaqa.dev/ja/ | jun@example.com     | pa55w0rd! | 林潤       | プレミアム会員 | 01212341234  | 大阪府大阪市北区梅田        | 1988年12月17日 | その他 | 受け取らない |
      | https://hotel-example-site.takeyaqa.dev/ja/ | yoshiki@example.com | pass-pass | 木村良樹   | 一般会員       | 01298765432  | 未登録                   | 1992年8月31日   | 未登録 | 受け取る     |
