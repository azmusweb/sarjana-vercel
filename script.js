window.onload = () => {
  const sheetId = '1oMHeKOF2_D6deuV8T1l10_GB0wgsPGLV7WrPcJ6Qxww';
  const apiKey = 'AIzaSyDKOClQy1z23Hwjr9HyHmzJbuaPE9Ccbv4'; // Ganti dengan API Key Anda dari Google Cloud Console
  fetchConfig(sheetId, apiKey);
};

async function fetchConfig(sheetId, apiKey) {
  // Ambil data Config (kolom A:FUNGSI, B:VALUE)
  const cfgRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Config!A:B?key=${apiKey}`
  );
  const cfgJson = await cfgRes.json();
  const cfg = {};
  cfgJson.values.slice(1).forEach(([key, value]) => {
    cfg[key] = value;
  });
  applyConfig(cfg);

  // Ambil konten berita (A–I untuk kolom 0–8)
  const newsRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Live Website!A:I?key=${apiKey}`
  );
  const newsJson = await newsRes.json();
  const [header, ...rows] = newsJson.values;
  const news = rows.map(r => {
    const obj = {};
    header.forEach((h, i) => obj[h] = r[i] || '');
    return obj;
  });
  renderArticles(news);
}

function applyConfig(cfg) {
  document.documentElement.style.setProperty('--primary-color', cfg.themeColor);
  document.querySelector('#logo').src = cfg.logoUrl;
  buildMenu(JSON.parse(cfg.menuItems));
  document.getElementById('year').textContent = new Date().getFullYear();
}

function buildMenu(items) {
  const nav = document.querySelector('#main-menu');
  const ul = document.createElement('ul');
  items.forEach(i => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = i.url; a.textContent = i.label;
    li.appendChild(a); ul.appendChild(li);
  }); nav.appendChild(ul);
}

function renderArticles(list) {
  const cont = document.getElementById('articles');
  list.forEach(item => {
    const art = document.createElement('article');
    art.innerHTML = `
      <h2>${item.Judul}</h2>
      <img src="${item.Gambar}" alt="">
      <p>${item.Isi.substring(0,100)}...</p>
      <a href="#">Baca Selengkapnya</a>
    `;
    cont.appendChild(art);
  });
}
