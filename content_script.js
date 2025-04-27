// ページ上のボタンを全部探す
const buttons = document.querySelectorAll('button[data-url]');

buttons.forEach(button => {
  const dataUrl = button.getAttribute('data-url');
  const fullUrl = `https://shop.asobistore.jp${dataUrl}`;

  // backgroundにURLを送って、商品名を取ってきてもらう
  chrome.runtime.sendMessage({ action: 'fetchProductName', url: fullUrl }, (response) => {
    if (response && response.productName) {
      // 商品名をボタンのすぐ後ろに表示する
      const span = document.createElement('span');
      span.textContent = ` 商品名: ${response.productName}`;
      span.style.marginLeft = '10px';
      span.style.color = 'green';
      button.insertAdjacentElement('afterend', span);
    }
  });
});

