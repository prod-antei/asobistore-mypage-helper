// ページ内のボタンを全部取得
const buttons = document.querySelectorAll('button[data-url]');

buttons.forEach(button => {
  const dataUrl = button.getAttribute('data-url');
  const fullUrl = `https://shop.asobistore.jp${dataUrl}`; // URLを構成

  fetch(fullUrl, { credentials: 'include' })
    .then(response => response.text())
    .then(htmlText => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // 🔥 商品名候補をすべて取得
      const productNameElements = doc.querySelectorAll('td.td04');
      const productNames = Array.from(productNameElements)
        .map(el => el.textContent.trim())
        .filter(text => isLikelyProductName(text)); // フィルタリング

      // 🔥 重複を削除
      const uniqueProductNames = Array.from(new Set(productNames));

      // 元の<td class="td01">を探す
      const td01 = button.closest('td.td01');
      const tr = td01 ? td01.parentElement : null;

      if (tr) {
        // 商品情報表示用のボタンを作成
        const toggleButton = document.createElement('button');
        toggleButton.textContent = '商品情報';
        // デザイン設定
        toggleButton.style.marginLeft = '10px';
        toggleButton.style.padding = '4px 12px';
        toggleButton.style.fontSize = '12px';
        toggleButton.style.backgroundColor = '#4CAF50';
        toggleButton.style.color = 'white';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '8px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.transition = 'background-color 0.3s';

        toggleButton.addEventListener('mouseover', () => {
          toggleButton.style.backgroundColor = '#45a049';
        });
        toggleButton.addEventListener('mouseout', () => {
          toggleButton.style.backgroundColor = '#4CAF50';
        });

        const detailTr = document.createElement('tr');
        detailTr.style.display = 'none';
        const detailTd = document.createElement('td');
        detailTd.colSpan = tr.children.length;
        detailTd.style.padding = '10px';
        detailTd.style.backgroundColor = '#f9f9f9';

        // 🔥 商品リストを表示
        detailTd.innerHTML = uniqueProductNames.length
          ? uniqueProductNames.map((name, index) => `<div>商品${index + 1}: ${name}</div>`).join('')
          : '商品名不明';

        detailTr.appendChild(detailTd);

        toggleButton.addEventListener('click', () => {
          if (detailTr.style.display === 'none') {
            detailTr.style.display = '';
          } else {
            detailTr.style.display = 'none';
          }
        });

        td01.appendChild(toggleButton);
        tr.parentNode.insertBefore(detailTr, tr.nextSibling);
      }
    })
    .catch(error => {
      console.error('取得失敗:', error);
    });
});

// 🔥 商品名判定関数
function isLikelyProductName(text) {
  const hasJapanese = /[\u3040-\u30FF\u4E00-\u9FFF]/.test(text);
  const isNotExcluded = !text.includes('指定なし');
  return hasJapanese && isNotExcluded;
}

