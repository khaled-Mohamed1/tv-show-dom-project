//You can edit ALL of the code here

//code for episode
let episodes;

//code for shows
let allShows = getAllShows();

//mode
let mode = "shows"


//calling function
createDropDownMenuForShows(allShows);
displayAllShows(allShows);



//fetch episode
function fetchEpisodes(showId) {
  fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => response.json())
    .then((data) => {
      episodes = data;
      createDropDownMenuForEpisodes(data);
    });
}

//filter for show
function filterShows(event) {
  let value = event.target.value.toLowerCase();
  let foundLists = allShows.filter((show) => {
    let toLowerCaseName = show.name.toLowerCase();
    let toLowerCaseSummary = show.summary.toLowerCase();

        return (
      toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
    );
  });
  displayAllShows(foundLists);
  document.getElementById(
    "results"
  ).innerHTML = `Displaying ${foundLists.length} / ${allShows.length}`;
}

//filter for episode
function filterEpisodes(event) {
  let value = event.target.value.toLowerCase();
  let foundLists = episodes.filter((episode) => {
    let toLowerCaseName = episode.name.toLowerCase();
    let toLowerCaseSummary = episode.summary.toLowerCase();

    return (
      toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
    );
  });
  displayAllEpisodes(foundLists);
  document.getElementById(
    "results"
  ).innerHTML = `Displaying ${foundLists.length} / ${episodes.length}`;
}


// function dropdown for shows
function createDropDownMenuForShows(allShows) {
  const selectShowTag = document.getElementById("selectShow");
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.innerHTML = `${show.name}`;
    option.value = show.id;
    selectShowTag.appendChild(option);
  });
    let searchInput = document.getElementById("search-field");
    searchInput.addEventListener("input", filterShows);
    selectShowTag.addEventListener("change", (event) => {
    searchInput.value = "";
    let showId = event.target.value;
    if (showId) {
      if (mode == "shows") {
        mode = "episodes";
        searchInput.removeEventListener("input", filterShows);
        searchInput.addEventListener("input", filterEpisodes);
      }
      fetchEpisodes(showId);    
    } else {
      if (mode == "episodes") {
        mode = "shows";
        searchInput.removeEventListener("input", filterEpisodes);
        searchInput.addEventListener("input", filterShows);
      }
    }
      displayAllShows(allShows);
  });
}

//this function displays all shows
function displayShow(show) {
  //create elements
  let divContainer = document.createElement("div");
  let divRow = document.createElement("div");
  let divCol_md_4 = document.createElement("div");
  let divEp= document.createElement("div");
  let divHead = document.createElement("div");
  let HeadP = document.createElement("p");
  let divContent = document.createElement("div");
  let ContentImg = document.createElement("img");
  let ContentP = document.createElement("p");
  let genreRatingStatus = document.createElement("div");
  let genreElement = document.createElement("p");
  let runTimeElement = document.createElement("p");
  let statusElement = document.createElement("p");
  let ratingElement = document.createElement("p");
  let readMore = document.createElement("button");
  let readLess = document.createElement("button");


  //give class to element
  divContainer.classList = "container";
  divEp.classList = "ep";
  divHead.classList = "head";
  divContent.classList = "content"
  genreRatingStatus.classList = "genre-rating-status";
  divContainer.id = "div";

  //append element
  document.getElementById("root").appendChild(divContainer);
  divContainer.appendChild(divRow);
  divRow.appendChild(divCol_md_4);
  divCol_md_4.appendChild(divEp);
  divEp.appendChild(divHead);
  divHead.appendChild(HeadP);
  divEp.appendChild(divContent);
  divContent.appendChild(ContentImg);
  divContent.appendChild(ContentP);
  divContent.appendChild(genreRatingStatus);
  genreRatingStatus.appendChild(genreElement);
  genreRatingStatus.appendChild(runTimeElement);
  genreRatingStatus.appendChild(statusElement);
  genreRatingStatus.appendChild(ratingElement);



    // needs to be tided up

  // genre
  genreElement.innerHTML = `Genres:   ${show.genres}`;

  //runtime
  runTimeElement.innerHTML = `Runtime:   ${show.runtime}`;

  // status
  statusElement.innerHTML = `Status:   ${show.status}`;
  
  // rating
  if (show.rating) {
    ratingElement.innerHTML = `Ratings:   ${Object.keys(
      show.rating
    )} : ${Object.values(show.rating)}`;
  }


  //content of element
  HeadP.innerHTML = `${show.name}`;
    if (show.image == null) {
    ContentImg.src = "#";
  } else {
    ContentImg.src = `${show.image.medium}`;
    ContentP.innerHTML = `${show.summary}`;
  }
}

// display all shows
function displayAllShows(array) {
  document.getElementById("root").innerHTML = "";
  array.forEach((element) => {
    displayShow(element);
  });
}

//take array parameter, call searsh input and filter array to display episode
function setup(array) {
  let searchInput = document.getElementById("search-field");
  searchInput.addEventListener("input", (event) => {
    let value = event.target.value.toLowerCase();
    let foundLists = array.filter((show) => {
      let toLowerCaseName = show.name.toLowerCase();
      let toLowerCaseSummary = show.summary.toLowerCase();

      return (
        toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
      );
    });

    displayAllShows(foundLists);

    document.getElementById(
      "results"
    ).innerHTML = `Displaying ${foundLists.length} / ${array.length}`;


  });

}

//create all element and append at to root
function display(episode){
  //create elements
  let divContainer = document.createElement("div");
  let divRow = document.createElement("div");
  let divCol_md_4 = document.createElement("div");
  let divEp= document.createElement("div");
  let divHead = document.createElement("div");
  let HeadP = document.createElement("p");
  let divContent = document.createElement("div");
  let ContentImg = document.createElement("img");
  let ContentP = document.createElement("p");

  //give class to element
  divContainer.classList = "container";
  divEp.classList = "ep";
  divHead.classList = "head";
  divContent.classList = "content"

  //content of element
  HeadP.innerHTML = `${episode.name} - S${String(episode.season
  ).padStart(2, "0")}E${String(episode.number).padStart(2, "0")} `;
  ContentImg.src = `${episode.image.medium}`;
  ContentP.innerHTML = `${episode.summary}`;

  //append element
    document.getElementById("root").appendChild(divContainer);
    divContainer.appendChild(divRow);
    divRow.appendChild(divCol_md_4);
    divCol_md_4.appendChild(divEp);
    divEp.appendChild(divHead);
    divHead.appendChild(HeadP);
    divEp.appendChild(divContent);
    divContent.appendChild(ContentImg);
    divContent.appendChild(ContentP);
}


//display all episode
function displayAllEpisodes(array){
    document.getElementById("root").innerHTML = "";
  array.forEach((episode) => {
    display(episode);
  });
}

//dropdown menu
function createDropDownMenuForEpisodes(allEpisodes) {
  const selectTag = document.getElementById("selectMenu");
  selectEpisodeTag.innerHTML = "";
  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `S${episode.season}E${String(episode.number).padStart(
      2,
      "0"
    )} - ${episode.name}`;
    option.value = episode.name;
    selectEpisodeTag.appendChild(option);

    });
      displayAllEpisodes(episodes);
    selectEpisodeTag.addEventListener("change", (event) => {
    let searchInput = document.getElementById("search-field");
    document.getElementById("results").innerHTML = "";
    searchInput.value = event.target.value; // whatever is selected from the dropdown list will be displayed in the input field
    const selected = episodes.filter((episode) => {
      return episode.name === event.target.value;
  });
      displayAllEpisodes(selected);
    // when the select an episode choice is selected tall episodes will be displayed
    if (event.target.value == "") {
      displayAllEpisodes(episodes);
    }
 });
}