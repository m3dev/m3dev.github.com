### Tech side of M3 #m3dev

こちらでアクセスできます。

http://m3dev.github.io/

[![wercker status](https://app.wercker.com/status/c00563e4b57ab0026904909b2752455c/s "wercker status")](https://app.wercker.com/project/bykey/c00563e4b57ab0026904909b2752455c)


### このサイトの運用について

typo の修正やコンテンツの追加は以下のようにして行ってください。

#### 修正方法

fork してから develop ブランチに対して pull request してください。

Middleman を使っています。

http://middlemanapp.com/

```
gem install bundler
bundle install
bundle exec middleman server
```

で http://localhost:4567/ にブラウザからアクセスできます。


OS X El Capitan で [`'openssl/ssl.h' file not found` というエラーが出る場合は `bundle install` の前に以下を実行してください](http://stackoverflow.com/questions/30818391/gem-eventmachine-fatal-error-openssl-ssl-h-file-not-found)。

```
bundle config build.eventmachine --with-cppflags=-I$(brew --prefix openssl)/include
```

#### M3 Tech Talk

発表のデータは `data/talks.yml` に追記してください。これをもとにページを生成します。

- `title`: タイトル
- `by`: 発表者名
- `github_id`: （発表者の GitHub ID）
- `type`: スライドの種類（speakerdeck, slideshare, html, link に対応しています）
- `source`: スライド表示用のデータ（`type` が speakerdeck, slideshare, html の場合は、HTML。link の場合は URL。）

YAML の文字列中に `:` を書く際は文字列全体を `''` で囲ってください。`title` や Slideshare 用の `source` で `:` が入りがちです。

#### デプロイ方法

GitHub の develop ブランチに push すると、Wercker が自動でデプロイしてくれます。
