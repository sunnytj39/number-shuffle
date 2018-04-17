/* usage
 * shuffleNumber(対象の要素, シャッフルの間隔, 1文字が変わる回数);
 */
var element = document.getElementById('target');
shuffleNumber(element, 100, 10);

function shuffleNumber(element, speed = 50, time = 500) {
  const numLength = element.textContent.length;
  let result = '';

  function shuffle(remain) {
    return new Promise(resolve => {
      let count = 0;
      const si = setInterval(function() {
        let shuffleStr = '';
        for (var i = 0; i < numLength - remain; i++) {
          shuffleStr += Math.floor(Math.random() * 9);
        }
        if(count < time) {
          element.textContent = result + shuffleStr;
          count++;
        } else {
          element.textContent = result + shuffleStr;
          result += shuffleStr.slice(0, 1);
          clearInterval(si);
          resolve();
        }
      }, speed);
    })
  }

  async function anim() {
    for (var i = 0; i < numLength; i++) {
      const res = await shuffle(i);
    }
  }

  anim();

}
