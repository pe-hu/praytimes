

[Node.js®について](https://nodejs.org/en/about)
```
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
___

[Node.js 版 Hello world](https://nodejs.keicode.com/nodejs/hello-nodejs.php)
* node -v (Node.js のバージョン確認)
* npm -v (npm "Node Package Manager" のバージョン確認)
* npm init -y (ディレクトリ内にpackage.jsonを作成)

ディレクトリを操作するコマンド
* mkdir ディレクトリを作成
* rmdir ディレクトリを削除
* cd ディレクトリへ移動

***

## npm start
package.json の scripts.start に指定された内容を実行する

実行中のプロセスを終了するコマンド
* Ctrl + c
* Ctrl + c の次に　Ctrl + d

___

### [フレームワークなしの Node.js サーバ](https://developer.mozilla.org/ja/docs/Learn/Server-side/Node_server_without_framework)
* [Ubuntu 18.04、20.04、および 22.04 に Node.js と NPM をインストールする3つの方法](https://www.hostinger.com/tutorials/how-to-install-node-ubuntu)
* [Learning with VS Code on Chromebooks](https://code.visualstudio.com/blogs/2020/12/03/chromebook-get-started)
