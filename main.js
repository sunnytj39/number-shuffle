/* usage
 * shuffleNumber(対象の要素, シャッフルの間隔, 1文字が変わる回数, 結果);
 */
var element = document.getElementById('target');
shuffleNumber(element, 100, 10, 256);

/******************************************************************/

function shuffleNumber(element, speed = 50, time = 500, after = 256) {
  // 対象の桁数を取得
  const numLength = element.textContent.length;
  // 結果後の文字
  const afterStr = after.toString(10);
  // 結果後の桁数
  const resultLength = afterStr.length;
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
        for (let i = 0; i < numLength - remain; i++) {
          shuffleStr += Math.floor(Math.random() * 9);
        }
        // timeに達するまで繰り返す
        if(count < time) {
          // テキストを書き換え
          element.textContent = result + shuffleStr;
          count++;
        } else {
          if (remain == resultLength - 1) {
            // 結果の該当する桁を代入
            result += afterStr.slice(remain, remain + 1);
            element.textContent = result;
          } else {
            result += afterStr.slice(remain, remain + 1);
            element.textContent = result + shuffleStr;
          }
          // Intervalを解除
          clearInterval(si);
          // resolveを返す
          resolve();
        }
      }, speed);
    })
  }

  // async/awaitで処理を待ってループ
  async function start() {
    for (var i = 0; i < resultLength; i++) {
      const res = await shuffle(i);
    }
  }

  // 実行
  start();
}
