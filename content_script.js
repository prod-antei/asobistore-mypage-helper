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
        .filter(text => isLikelyProductName(text));

      // 🔥 重複を除去
      const uniqueProductNames = Array.from(new Set(productNames));

      const td01 = button.closest('td.td01');
      const tr = td01 ? td01.parentElement : null;

      if (tr) {
        // 商品情報を表示する<tr>を作成
        const detailTr = document.createElement('tr');
        detailTr.style.display = ''; // 最初から表示する
        const detailTd = document.createElement('td');
        detailTd.colSpan = tr.children.length;
        detailTd.style.padding = '10px';
        detailTd.style.backgroundColor = '#f9f9f9';
        detailTd.style.borderBottom = '1px solid #ddd'; // 見やすく線を引く（オプション）
        detailTd.style.fontSize = '14px';

        // �� 商品リストをきれいに表示
        detailTd.innerHTML = uniqueProductNames.length
          ? `<strong>商品情報</strong><br>` + uniqueProductNames.map((name, index) => `<div>・${name}</div>`).join('')
          : '商品名不明';

        detailTr.appendChild(detailTd);

        // もとの<tr>のすぐ後に商品情報<tr>を追加
        tr.parentNode.insertBefore(detailTr, tr.nextSibling);
      }
    })
    .catch(error => {
      console.error('取得失敗:', error);
    });
});

// 🔥 商品名かどうかを判定する関数
function isLikelyProductName(text) {
  const hasJapanese = /[\u3040-\u30FF\u4E00-\u9FFF]/.test(text);
  const isNotExcluded = !text.includes('指定なし');
  return hasJapanese && isNotExcluded;
}

