const buttons = document.querySelectorAll('button[data-url]');

buttons.forEach(button => {
  const dataUrl = button.getAttribute('data-url');
  const fullUrl = `https://shop.asobistore.jp${dataUrl}`;

  fetch(fullUrl, { credentials: 'include' })
    .then(response => response.text())
    .then(htmlText => {
      // ここでパースする！
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const productNameElement = doc.querySelector('td.td04');
      const productName = productNameElement ? productNameElement.textContent.trim() : '商品名不明';

      const span = document.createElement('span');
      span.textContent = ` 商品名: ${productName}`;
      span.style.marginLeft = '10px';
      span.style.color = 'green';
      button.insertAdjacentElement('afterend', span);
    })
    .catch(error => {
      console.error('取得失敗:', error);
      const span = document.createElement('span');
      span.textContent = ' 商品名: 取得失敗';
      span.style.marginLeft = '10px';
      span.style.color = 'red';
      button.insertAdjacentElement('afterend', span);
    });
});

