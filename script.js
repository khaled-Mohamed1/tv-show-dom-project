//You can edit ALL of the code here

//code for shows
let allShows = getAllShows();

//calling function
createDropDownMenuForShows(allShows);
displayAllShows(allShows);
setup(allShows);



//fetch episode
function fetchEpisodes(show) {
  let id = show.id;
  fetch("https://api.tvmaze.com/shows/" + id + "/episodes")
    .then((response) => response.json())
    .then((data) => {
      createDropDownMenuForEpisodes(data);
    });
}

// function dropdown for shows
function createDropDownMenuForShows(allShows) {
  const selectShowTag = document.getElementById("selectShow");
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.innerHTML = `${show.name}`;
    option.value = show.name;
    selectShowTag.appendChild(option);
    selectShowTag.addEventListener("change", (event) => {
      let searchInput = document.getElementById("search-field");
        if (event.target.value === show.name) {
        fetchEpisodes(show);
      }
      document.getElementById("results").innerHTML = "";
      document.getElementById("selectMenu").innerHTML = "";
      searchInput.value = event.target.value; // whatever is selected from the dropdown list will be displayed in the input field

        const selected = allShows.filter((show) => {
        return show.name === event.target.value;
      });
      displayAllShows(selected);
      // when episode choice is selected all episodes will be displayed
      if (event.target.value == "") {
        displayAllShows(allShows);
      }
    });
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

  //give class to element
  divContainer.classList = "container";
  divEp.classList = "ep";
  divHead.classList = "head";
  divContent.classList = "content"
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
function createDropDownMenu(allEpisodes) {
  const selectTag = document.getElementById("selectMenu");
  allEpisodes.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `S${episode.season}E${String(episode.number).padStart(
      2,
      "0"
    )} - ${episode.name}`;
    selectTag.appendChild(option);
    selectTag.addEventListener("change", () => {
      window.location.href = option.value = `${episode.url}`;
    });
  });
}

window.onload = setup;