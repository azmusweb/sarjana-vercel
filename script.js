window.onload = () => {
  Tabletop.init({
    key: '1oMHeKOF2_D6deuV8T1l10_GB0wgsPGLV7WrPcJ6Qxww',
    callback: renderData,
    simpleSheet: false
  });
};

function renderData(data, tt) {
  // Ambil config
  const cfg = tt.sheets('Config').all().reduce((a,r)=>{ a[r.FUNGSI]=r.VALUE; return a; },{});
  document.documentElement.style.setProperty('--primary-color', cfg.themeColor);
  document.querySelector('#logo').src = cfg.logoUrl;
  buildMenu(JSON.parse(cfg.menuItems));

  // Ambil konten berita
  const news = tt.sheets('Live Website').all();
  renderArticles(news);
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
    art.innerHTML = `<h2>${item.Judul}</h2>
                     <img src="${item.Gambar}" alt="">
                     <p>${item.Isi.substring(0,100)}...</p>
                     <a href="berita.html?slug=${item.Slug}">Baca Selengkapnya</a>`;
    cont.appendChild(art);
  });
}
