const accessKey = "sumQ1ZBCXwzd_P6edqn01wsGFtWr9gSGxNMKIEyslfU";

const form = document.querySelector('form');
const input = document.getElementById('search_bar');
const searchResults = document.querySelector('.card-result .row');
const showMore = document.getElementById('load');

let page = 1;

async function searchImages(query) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = ""; // Clear existing content
  }

  if (results.length === 0) {
            // Display a message when there are no cards
            searchResults.innerHTML = "<h1 class ='text-light text-center'>Sorry, we couldn't find any matches</h1>";
        }
  results.forEach((result) => {
    let iHTML = `
      <div class="col-md-4 p-3">
        <div class="card mb-4 d-flex flex-column h-100">
          <img src="${result.urls.full}" class="card-img-top" alt="${result.alt_description}">
          <a href="${result.links.html}" target="_blank"></a>
          <div class="card-body bg-dark text-light">
            <h5 class="card-title">${result.alt_description}</h5>
          </div>
        </div>
      </div>`;

    searchResults.innerHTML += iHTML;
  });

  page++;
}

// Display random images when the page loads
searchImages("random"); // Change this query to what you want to load initially

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  const query = input.value;
  searchImages(query);
});

showMore.addEventListener("click", () => {
  const query = input.value;
  searchImages(query);
});
