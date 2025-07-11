// POST
async function createMovie(newMovie) {
const response = await fetch("http://localhost:3001/movies", {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMovie)
});

if (response.ok) {
    await printMovies();
}
}

async function sendFormData(){

const title = document.getElementById("title").value;
const actors = document.getElementById("actors").value;
const synopsis = document.getElementById("synopsis").value;
const gender = document.getElementById("gender").value;
const rating = document.getElementById("rating").value;

const newMovie = {
    title,
    actors,
    synopsis,
    gender,
    rating,
};

    await createMovie(newMovie);
} 
document.getElementById("MovieForm").addEventListener("submit", function (event) {
event.preventDefault();
sendFormData()
event.target.reset();
});

//GET
async function getMovies(){
const response = await fetch("http://localhost:3001/movies", {
    method: "GET", 
    headers: {
        'Content-Type': 'application/json'
    }
})
const movieData = await response.json()
console.log(movieData)
return movieData
}
getMovies()
function updateMovie(id, editedMovie){
}

//DELETE:
async function deleteMovie(id){
const response = await fetch(`http://localhost:3001/movies/${id}`, {
    method: "DELETE", 
    headers: {
        'Content-Type': 'application/json'
    }
})
if(response.ok){
    await printMovies()
}
}

//IMPRIMIR- print
let moviesContainer = document.getElementById("carousel");
async function printMovies() {
    let movies = await getMovies(); 
    moviesContainer.innerHTML = ""; 

    movies.forEach(movie => {
        const movieCard = document.createElement('div'); 

        movieCard.innerHTML = `
            <h1>${movie.title}</h1>
            <p><strong>Actores:</strong> ${movie.actors}</p>
            <p><strong>Sinopsis:</strong> ${movie.synopsis}</p>
            <p><strong>Género:</strong> ${movie.gender}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <button onclick="deleteMovie('${movie.id}')">Eliminar</button>
            <button onclick="editMovie('${movie.id}', '${movie.title}', '${movie.actors}', '${movie.synopsis}', '${movie.gender}', '${movie.rating}')">Editar</button>
        `;

        moviesContainer.appendChild(movieCard); 
    });
}

function scrollCarousel(direction) {
  const carousel = document.getElementById("carousel");
  const scrollAmount = 300; 
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

//PUT:

async function updateMovie(id, editedMovie) {
  const response = await fetch(`http://localhost:3001/movies/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedMovie)
  });

  if (response.ok) {
    await printMovies(); 
  }
}

function editMovie(id, currentTitle, currentActors, currentSynopsis, currentGender, currentRating) {
  const newTitle = prompt("Nuevo título:", currentTitle);
  const newActors = prompt("Nuevo actors:", currentActors);
  const newSynopsis = prompt("Nueva synopsis:", currentSynopsis);
  const newGender = prompt("Nuevo gender:", currentGender);
  const newRating = prompt("Nuevo rating:", currentRating);
  

  const editedMovie = {
    title: newTitle,
    actors: newActors,
    synopsis: newSynopsis,
    gender: newGender,
    rating: newRating
  };

  updateMovie(id, editedMovie);
}