'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

// カーソル自動設定
userNameInput.focus();

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 診断処理する関数
 * @param {string} userName 入力する名前
 * @return {string} 診断結果
 */
function assessment(userName){
  let userNameNumber = 0;
  for(let i = 0; i < userName.length; i++){
    userNameNumber += userName.charCodeAt(i);
  }
  const index = userNameNumber % answers.length;
  return answers[index].replace(/\{userName\}/g, userName);
}

/**
 * 子要素を消し初期化
 * @param {HTMLElement} element 
 */
function removeAllChildren(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}

/**
 * 診断処理を表示
 * @param {HTMLElement} element
 * @param {string} result
 */
function appendAssessmentResult(element, result){
  // h3タグを作る
  const h3 = document.createElement('h3');
  // タグに診断結果と入れる
  h3.innerText = '診断結果';
  // result-areaにh3を表示
  element.appendChild(h3);
  // pタグを作る
  const p = document.createElement('p');
  p.style.color = "#ffffff";
  // タグに結果を入れる
  p.innerText = result;
  // result-areaにpを表示
  element.appendChild(p);
}

/**
 * tweetボタン作成
 * @param {HTMLElement} element
 * @param {string} result
 */
function appendTweetButton(element, result){
  // aタグ
  const a = document.createElement('a');
  const href = 
    'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ')
    + '&ref_src=twsrc%5Etfw';
  a.setAttribute('href', href);
  a.setAttribute('class', "twitter-hashtag-button");
  a.setAttribute('data-text', result);
  a.innerText = 'Tweet #あなたのいいところ';
  element.appendChild(a);
  // scriptタグ
  const script = document.createElement('script');
  script.setAttribute('src', "https://platform.twitter.com/widgets.js");
  element.appendChild(script);
}

/**
 * ボタンを押したときの処理
 */
assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  //入力が無いときは何もしない処理
  if(!userName){
    return;
  }
  removeAllChildren(resultDivided);
  const result = assessment(userName);
  appendAssessmentResult(resultDivided, result);
  removeAllChildren(tweetDivided);
  appendTweetButton(tweetDivided, result);
}

// Enterキーで診断を実行
userNameInput.onkeydown = (event) =>{
  if(event.key === 'Enter'){
    assessmentButton.onclick();
  }
}

console.assert = (
  assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。', '間違い'
);
