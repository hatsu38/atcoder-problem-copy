const copyButton = document.createElement("button");
const lang =
  document.querySelector(".lang-ja") ||
  document.getElementById("task-statement");
const parts = lang.querySelectorAll(".part");
const buttonText = "問題をコピー";

copyButton.innerHTML = buttonText;
styleCopyButton(copyButton);
copyButton.classList.add("btn-copy");

copyButton.onclick = function () {
  const dupParts = cloneAndCleanParts(parts);
  const problemText = formatProblemText(dupParts[0]);
  const constraintsText = formatConstraintsText(dupParts[1]);
  const samplesText = formatSamplesText(dupParts.slice(2));
  const finalText = formatFinalText(problemText, constraintsText, samplesText);

  copyTextToClipboard(finalText);
  changeButtonStyle(copyButton);
};

lang.insertBefore(copyButton, lang.firstChild);

function styleCopyButton(button) {
  button.style.backgroundColor = "#4CAF50";
  button.style.border = "none";
  button.style.color = "white";
  button.style.padding = "6px 12px";
  button.style.borderRadius = "6px";
  button.style.display = "block";
}

function cloneAndCleanParts(parts) {
  const clonedParts = Array.from(parts).map((part) => part.cloneNode(true));
  clonedParts.forEach(cleanPart);
  return clonedParts;
}

function cleanPart(part) {
  part.querySelectorAll(".katex-mathml").forEach((ele) => ele.remove());
  cleanVlistElements(part);
  cleanH3Elements(part);
}

function cleanVlistElements(part) {
  const vlistElements = part.querySelectorAll(".vlist-t");
  vlistElements.forEach((vlistElement) => {
    if (vlistElement.classList.length === 1) {
      vlistElement.innerText = "**" + vlistElement.innerText;
    }
  });
}

function cleanH3Elements(part) {
  const h3Elements = part.querySelectorAll("h3");
  h3Elements.forEach((h3Element) => {
    h3Element.innerText = "## " + h3Element.innerText;
  });
}

function formatProblemText(problemNode) {
  return problemNode.innerText
    .replace(/^配点 : \d+ 点\n/, "")
    .replace(/\t/g, "")
    .replace(/(\d)\n(?!≤)/g, "$1")
    .replace(/(\d+≤[^\n]+)\n/g, "$1 ")
    .replace(/\n(≤\d+)/g, " $1")
    .replace(/([^\n]+≤)\n/g, "$1 ")
    .replace(/(\w)\n/g, "$1")
    .replace(/\n(\w)/g, "$1")
    .replace(/(\W)\n/g, "$1")
    .replace(/\n(\W)/g, "$1")
    .replace(/(\d) /g, "$1")
    .replace(/ (\d)/g, "$1")
    .replace(/(\w) /g, "$1")
    .replace(/ (\w)/g, "$1")
    .replace(/(\W) /g, "$1")
    .replace(/ (\W)/g, "$1")
    .replace(/。/g, "。\n")
    .replace(/。\n(?=\))/g, "。")
    .replace(/##問題文/, "## 問題文\n");
}

function formatConstraintsText(constraintsNode) {
  return constraintsNode.innerText.replace(/## 制約/, "\n## 制約");
}

function formatSamplesText(samples) {
  return samples
    .map((part) => part.innerText.replace(/。\n\n/g, "。\n"))
    .join("")
    .replace(/入力例 (\d)/g, "\n入力例 $1\n")
    .replace(/出力例 (\d)/g, "\n出力例 $1\n")
    .replace(/Copy/g, "")
    .replace(/  /g, "\n")
    .replace(/。\n\n/g, "。\n")
    .replace(/## \n/g, "## ");
}

function formatFinalText(problemText, constraintsText, samplesText) {
  return `${problemText}\n${constraintsText}\n${samplesText}`
    .replace(/\n\n+/g, "\n\n")
    .replace(/\t/g, "")
    .replace(/=/g, "≠");
}

function copyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function changeButtonStyle(button) {
  button.innerHTML = "コピー完了!";
  button.style.backgroundColor = "#DF2D5A";
  setTimeout(function () {
    button.innerHTML = buttonText;
    button.style.backgroundColor = "#4CAF50";
  }, 1500);
}
