let movies = [];
let striped = false;

function renderTable(list) {
  const tbody = document.querySelector("#movieTable tbody");
  tbody.innerHTML = "";
  list.forEach((m, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td data-label="Cartaz"><img src="${m.poster || 'https://via.placeholder.com/80x120?text=Sem+Imagem'}" class="poster" alt="Cartaz de ${m.title}"></td>
      <td data-label="Título">${m.title}</td>
      <td data-label="Ano">${m.year}</td>
      <td data-label="Nota">${m.rating}</td>
      <td data-label="Gênero">${m.genre || '-'}</td>
      <td data-label="Ações">
        <button class="secondary delete-btn" data-index="${i}">Excluir</button>
      </td>`;
    tbody.appendChild(tr);
  });

  // Add event listeners to all delete buttons
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      removeMovie(index);
    });
  });
}

function addMovie(e) {
  e.preventDefault();
  const movie = {
    title: title.value.trim(),
    year: +year.value,
    rating: +rating.value,
    genre: genre.value.trim(),
    poster: poster.value.trim()
  };
  movies.push(movie);
  renderTable(movies);
  e.target.reset();
}

movieForm.addEventListener("submit", addMovie);

function removeMovie(index) {
  if (confirm("Tem certeza que deseja remover este filme?")) {
    movies.splice(index, 1);
    renderTable(movies);
  }
}

function searchByTitle() {
  const q = searchTitle.value.trim().toLowerCase();
  renderTable(movies.filter(m => m.title.toLowerCase().includes(q)));
}

function searchByYear() {
  const y = +searchYear.value;
  renderTable(movies.filter(m => m.year === y));
}

function searchByRating() {
  const r = +searchRating.value;
  renderTable(movies.filter(m => m.rating === r));
}

function toggleTableStyle() {
  document.body.classList.toggle("dark-mode");
  striped = !striped;
  if (striped) {
    movieTable.classList.add("table-striped");
  } else {
    movieTable.classList.remove("table-striped");
  }
}

// Add event listener for the style toggle button if it exists
const styleToggleBtn = document.querySelector('.style-toggle-btn');
if (styleToggleBtn) {
  styleToggleBtn.addEventListener('click', toggleTableStyle);
}

renderTable(movies);
        
