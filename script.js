const API_KEY = "9f35486d37c3b7ff69efeccb40bd95f6";

const getModernMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const getSearchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const getImg = "https://image.tmdb.org/t/p/w500";

// URL ژانرها
const comedyMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`;
const scienceFictionMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878`;
const crimeMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=80`;
const adventureMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=12`;

// المنت‌ها
const main = document.querySelector("main");
const form = document.querySelector("form");
const input = document.querySelector("input");

// آیتم Home
const home = document.querySelector("#item1");

// ژانرها
const genres = [
    {
        element: document.querySelector("#item2"),
        url: comedyMovies,
    },
    {
        element: document.querySelector("#item3"),
        url: scienceFictionMovies,
    },
    {
        element: document.querySelector("#item4"),
        url: crimeMovies,
    },
    {
        element: document.querySelector("#item5"),
        url: adventureMovies,
    },
];

// دریافت اطلاعات از API
async function request(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
}

// تعیین رنگ امتیاز
function chooseClass(rate) {
    if (rate >= 8) {
        return "green";
    } else if (rate >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

// نمایش فیلم‌ها
async function showMovies(url) {
    const movies = await request(url);

    main.innerHTML = "";

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const container = document.createElement("div");
        container.classList.add("container");

        container.innerHTML = `
            <img src="${poster_path ? getImg + poster_path : "./photos/no-photo.jfif"}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${chooseClass(vote_average)}">
                    ${vote_average.toFixed(1)}
                </span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                <p>${overview || "No overview available."}</p>
            </div>
        `;

        main.appendChild(container);
    });
}

// نمایش فیلم‌های محبوب هنگام ورود
showMovies(getModernMovies);

// جستجو
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = input.value.trim();

    if (inputValue) {
        showMovies(getSearchMovies + encodeURIComponent(inputValue));
    } else {
        showMovies(getModernMovies);
    }
});

// Home
home.addEventListener("click", () => {
    location.reload();
});

// ژانرها
genres.forEach((genre) => {
    genre.element.addEventListener("click", () => {
        showMovies(genre.url);
    });
});