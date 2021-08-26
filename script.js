//You can edit ALL of the code here

let allEpisodes;

// let matchedList = document.getElementById("matchedList");
// setup function will load the page with all episodes

function setup() {
  allEpisodes = getAllEpisodes();

  displayAllEpisodes(allEpisodes);
  let searchInput = document.getElementById("search-field");
  searchInput.addEventListener("input", (event) => {
    //allEpisodes = getAllEpisodes();
    let value = event.target.value.toLowerCase();
    let foundLists = allEpisodes.filter((show) => {
      let toLowerCaseName = show.name.toLowerCase();
      let toLowerCaseSummary = show.summary.toLowerCase();

      return (
        toLowerCaseName.includes(value) || toLowerCaseSummary.includes(value)
      );
    });

    document.getElementById(
      "results"
    ).innerHTML = `Displaying ${foundLists.length} / ${allEpisodes.length}`;
    displayAllEpisodes(foundLists)

  });
}

//create all element and append at to root
function display(show) {
  //create elements
  let divContainer = document.createElement("div");
  let divRow = document.createElement("div");
  let divCol_md_4 = document.createElement("div");
  let divEp = document.createElement("div");
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

  HeadP.innerHTML = `${show.name} - S${String(show.season).padStart(
    2,
    "0"
  )}E${String(show.number).padStart(2, "0")} `;

  ContentImg.src = `${show.image.medium}`;
  ContentP.innerHTML = `${show.summary}`;

  //appent element
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

//display all ep
function displayAllEpisodes(array) {
  document.getElementById("root").innerHTML = "";
  array.forEach((show) => {
    display(show);
  });
}

window.onload = setup;
