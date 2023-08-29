const copyButton = document.createElement("button");
const lang = document.querySelector(".lang-ja");
const parts = lang.querySelectorAll(".part");
const buttonText = "問題をコピー"

copyButton.innerHTML = buttonText;

// スタイリング
copyButton.style.backgroundColor = "#4CAF50"; // 背景色
copyButton.style.border = "none"; // ボーダー
copyButton.style.color = "white"; // 文字色
copyButton.style.padding = "6px 12px"; // パディング
copyButton.style.borderRadius = "6px"; // ボーダーラディウス
copyButton.style.display = "block"; // インラインブロック
copyButton.classList.add("btn-copy"); // クラス追加

copyButton.onclick = function () {
  const problemNode = parts[0].cloneNode(true);
  problemNode
    .querySelectorAll("h3,.katex-mathml")
    .forEach((ele) => ele.remove());

  const formattedProblemText = problemNode.innerText
    .replace(/^配点 : \d+ 点\n/, "") // 配点を削除
    .replace(/\t/g, "") // タブを削除
    .replace(/(\d)\n(?!≤)/g, "$1") // 数字の後の改行を削除(不等号の前ではない場合)
    .replace(/(\d+≤[^\n]+)\n/g, "$1 ") // 数字の前後の改行を削除
    .replace(/\n(≤\d+)/g, " $1") // 数字の前後の改行を削除
    .replace(/([^\n]+≤)\n/g, "$1 ") // 数字の前後の改行を削除
    .replace(/(\w)\n/g, "$1") // アルファベットの後の改行を削除
    .replace(/\n(\w)/g, "$1") // アルファベットの前の改行を削除
    .replace(/(\W)\n/g, "$1") // 記号の後の改行を削除
    .replace(/\n(\W)/g, "$1") // 記号の前の改行を削除
    .replace(/(\d) /g, "$1") // 数字の後の空白を削除
    .replace(/ (\d)/g, "$1") // 数字の前の空白を削除
    .replace(/(\w) /g, "$1") // アルファベットの後の空白を削除
    .replace(/ (\w)/g, "$1") // アルファベットの前の空白を削除
    .replace(/(\W) /g, "$1") // 記号の後の空白を削除
    .replace(/ (\W)/g, "$1") // 記号の前の空白を削除
    .replace(/。/g, "。\n") // 句点の後の改行を2つにする
    .replace(/。\n(?=\))/g, "。"); // 句点の後に)がある場合は、改行を入れない

  const partsOne = parts[1].cloneNode(true);
  partsOne.querySelectorAll(".katex-mathml").forEach((ele) => ele.remove());

  const formattedConstraintsText = partsOne.innerText.replace(/制約/, "\n制約"); // 制約の前の改行を残す

  const partsArray = Array.prototype.slice.call(parts);
  const sampleNodes = partsArray.slice(2).map((part) => part.cloneNode(true));
  sampleNodes.forEach((sample) =>
    sample.querySelectorAll(".katex-mathml").forEach((ele) => ele.remove()),
  );
  const samples = sampleNodes
    .map((part) => part.innerText.replace(/。\n\n/g, "。\n"))
    .join("");

  const formattedSamples = samples
    .replace(/入力例 (\d)/g, "\n入力例 $1\n") // 入力例の前の改行を残す
    .replace(/出力例 (\d)/g, "\n出力例 $1\n") // 出力例の前の改行を残す
    .replace(/Copy/g, "") // Copyを削除
    .replace(/  /g, "\n") // 2つ以上の空白を1つにする
    .replace(/。\n\n/g, "。\n"); // 句点の後の改行を2つにする

  const valueText =
    `${formattedProblemText}\n${formattedConstraintsText}\n${formattedSamples}`.replace(
      /\n\n+/g,
      "\n\n",
    );
  const textArea = document.createElement("textarea");
  textArea.value = valueText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  copyButton.innerHTML = "コピー完了!";
  copyButton.style.backgroundColor = "#DF2D5A";
  setTimeout(function () {
    copyButton.innerHTML = buttonText;
    copyButton.style.backgroundColor = "#4CAF50";
  }, 1500);
};
lang.insertBefore(copyButton, lang.firstChild);
