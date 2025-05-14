fetch('https://docs.google.com/spreadsheets/d/1oMHeKOF2_D6deuV8T1l10_GB0wgsPGLV7WrPcJ6Qxww/tq?sheet=Sheet1')
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data.substr(47).slice(0, -2));
        const rows = json.table.rows;
        const container = document.getElementById('data-container');
        
        rows.forEach(row => {
            const title = row.c[0].v; // Judul
            const description = row.c[1].v; // Deskripsi
            
            const div = document.createElement('div');
            div.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            container.appendChild(div);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
