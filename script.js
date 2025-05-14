// Mengambil data dari data.json dan menampilkannya di index.html
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('data-container');
        data.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
            container.appendChild(div);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
