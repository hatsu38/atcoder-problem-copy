document.getElementById('copyButton').addEventListener('click', function() {
  chrome.tabs.executeScript(null, {file: "content.js"});
});
