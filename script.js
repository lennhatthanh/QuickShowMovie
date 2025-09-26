const images = document.querySelectorAll(".image");
const menu = document.querySelector(".menu_mobile");
const movieList = document.querySelector(".movies_list");
let showMore = true;
const showMoreButton = document.querySelector(".show_more");
let dataMovie = [];
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const moviePoster = document.querySelector(".movie__poster");
const movieLanguage = document.querySelector(".movie__language");
const movieTitle = document.querySelector(".movie__title");
const movieRating = document.querySelector(".movie__rating-value");
const movieDescription = document.querySelector(".movie__description");
const movieMeta = document.querySelector(".movie__meta");
const actorList = document.querySelector(".actors_list");
const listDate = document.querySelector(".list_date");
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function openMenu() {
    menu.classList.add("menu_mobile-active");
}
function closeMenu() {
    menu.classList.remove("menu_mobile-active");
}
images.forEach((image) => {
    image.addEventListener("click", () => {
        const videoId = image.getAttribute("data-id");
        const url_video = `https://www.youtube.com/embed/${videoId}`;
        document.querySelector("iframe").src = url_video;
    });
});

async function getData() {
    try {
        const response = await fetch("https://quickshow-server.vercel.app/api/show/all"); // Gửi yêu cầu GET
        if (!response.ok) throw new Error("Lỗi mạng hoặc API"); // Kiểm tra lỗi
        const data = await response.json(); // Chuyển phản hồi thành JSON
        renderData(data.shows);
        dataMovie = data.shows;
    } catch (error) {
        console.error("Lỗi:", error.message); // Xử lý lỗi
    }
}

async function getDataMovie() {
    try {
        const response = await fetch(`https://quickshow-server.vercel.app/api/show/${movieId}`); // Gửi yêu cầu GET
        if (!response.ok) throw new Error("Lỗi mạng hoặc API"); // Kiểm tra lỗi

        const data = await response.json(); // Chuyển phản hồi thành JSON
        console.log("data", data.movie);
        renderMovie(data);
    } catch (error) {
        console.error("Lỗi:", error.message); // Xử lý lỗi
    }
}
getDataMovie();
function handleShowMore() {
    showMore = !showMore;
    renderData(dataMovie);
}

getData();
function renderData(data) {
    movieList.innerHTML = "";
    const newData = showMore ? data.slice(0, 4) : data;
    movieList.innerHTML = newData
        .map((movie) => {
            return `
        <div key="${movie._id}" class="movies_list_item">
            <a href="/movie.html?id=${movie._id}" style="width: 100%">
                <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="" />
            </a>
            <p>${movie.title}</p>
            <p>${new Date(movie.release_date).getFullYear()} • ${movie.genres
                .slice(0, 2)
                .map((g) => g.name)
                .join(" | ")} • ${Math.floor(movie.runtime / 60) + "h " + (movie.runtime % 60) + "m"}</p>
            <div>
                <button class="btn">Buy Ticket</button>
                <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-star w-4 h-4 text-primary fill-primary"
                        aria-hidden="true"
                    >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                    ${movie.vote_average.toFixed(1)}
                </p>
            </div>
        </div>
        `;
        })
        .join("");
}

function renderMovie(data) {
    console.log(data);
    moviePoster.src = `https://image.tmdb.org/t/p/original/${data.movie.poster_path}`;
    movieTitle.innerHTML = data.movie.title;
    movieRating.innerHTML = `${data.movie.vote_average.toFixed(1)} User Rating`;
    movieDescription.innerHTML = data.movie.overview;
    movieMeta.innerHTML = `${
        Math.floor(data.movie.runtime / 60) + "h " + (data.movie.runtime % 60) + "m"
    } • ${data.movie.genres.map((gene) => gene.name).join(", ")} • ${new Date(data.movie.release_date).getFullYear()}`;
    actorList.innerHTML = data.movie.casts
        .map(
            (actor) => `
                <div class="actors_list_item">
                    <img src="https://image.tmdb.org/t/p/original/${actor.profile_path}" alt="" />
                    <p>${actor.name}</p>
                </div>
    `
        )
        .join("");
    listDate.innerHTML = Object.keys(data.dateTime)
        .map(
            (date) => `
            <button>
                <span>${date.split("-")[2]}</span>
                <span>${monthNames[date.split("-")[1] - 1]}</span>
            </button>
            `
        )
        .join("");
}
