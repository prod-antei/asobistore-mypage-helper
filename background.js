chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchProductName') {
    fetch(message.url)
      .then(response => response.text())
      .then(htmlText => {
        // HTML文字列をパース
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        // td.td04 を探す
        const productNameElement = doc.querySelector('td.td04');
        const productName = productNameElement ? productNameElement.textContent.trim() : '商品名不明';
        sendResponse({ productName });
      })
      .catch(error => {
        console.error('取得エラー:', error);
        sendResponse({ productName: '取得失敗' });
      });
    // 非同期処理を待つため、trueを返す
    return true;
  }
});

