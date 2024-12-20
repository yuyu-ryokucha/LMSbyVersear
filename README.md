# LMS by Versear（仮）


## 構成（仮）

```
まとめのフォルダ（拡張機能本体）
│
├─ manifest.json （拡張機能の名前とかを書いておくファイル。これがかなり重要。）
│
├─ imagesフォルダ（アイコン用）
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├─ mainフォルダ
│   ├── main.js（LMSのサイトに適用するJavaScriptファイル。基本ここであらゆる処理をする。）
│   ├── apple.js
│   ├── banana.js
│   ├── main.css（LMSのサイトに適用するCSS。見た目を整えるだけ。）
│   │
│   └── BaseElement.html（LMSのサイトに埋め込む用のHTMLファイル）
│
├─ popupフォルダ
│   ├── popup.html（拡張機能のボタンを押した時に出る小窓のHTML。小窓が要らない場合はなくていい。）
│   ├── popup.js
│   └── popup.css
│
├─ background.js（関大LMSなどを開いていないときにもバックグラウンドで動くJavaScriptファイル。）
│
└── ...
```


```json
"content_scripts": [
    {
        "matches": ["https://kulms.tl.kansai-u.ac.jp/*"],
        "css": ["main/main.css"],
        "js": ["main/main.js", "main/apple.js", "main/banana.js"]
    }
]
```