/* usage
 * shuffleNumber(対象の要素, シャッフルの間隔, 1文字が変わる回数);
 */
var element = document.getElementById('target');
shuffleNumber(element, 100, 10);

function shuffleNumber(element, speed = 50, time = 500) {
  // 対象の文字長を取得
  const numLength = element.textContent.length;
  // 結果の文字列
  let result = '';

  function shuffle(remain) {
    // Promiseを返す
    return new Promise(resolve => {
      let count = 0;
      // speedの周期でシャッフル
      const si = setInterval(function() {
        // ランダムな文字列を生成
        let shuffleStr = '';
        for (var i = 0; i < numLength - remain; i++) {
          shuffleStr += Math.floor(Math.random() * 9);
        }
        // timeに達するまで繰り返す
        if(count < time) {
        　// テキストを変更
          element.textContent = result + shuffleStr;
          count++;
        } else {
          element.textContent = result + shuffleStr;
          // 生成したランダムな文字列の先頭を結果に追加
          result += shuffleStr.slice(0, 1);
          clearInterval(si);
          // resolveを返す
          resolve();
        }
      }, speed);
    })
  }

  // async/awaitで処理を待ってループ
  async function start() {
    for (var i = 0; i < numLength; i++) {
      const res = await shuffle(i);
    }
  }

  // 実行
  start();
}
