/////   !! SELECTORS!!    /////

// FULL LIST OF PLAYLISTS //

var allPlaylists = document.getElementById("full-list");
// ADD AND DELETE SECTION ELEMENTS
var addSectionSection = document.getElementById("add-section-spot");
var deleteSectionButton = document.querySelector(".btn.delete-section");

// SEARCH BAR INPUT
var searchBar = document.getElementById("main-search-bar");
var searchBtn = document.getElementById("searchBtn");
var mainBodySearchBar = document.querySelector(".main-body-section.search-bar");

// DRAGGABLE ELEMENTS
const draggables = document.querySelectorAll(".album-container");
const draggable = document.querySelector(".album-container");
const dropAreas = document.querySelectorAll(".main-row.two.drop");
const dropArea = document.querySelector(".main-row.two.drop");
const newDropArea = document.getElementById("dropAreaNew");
const albumContainerResults = document.querySelector(".album-container");

// ALBUM RESULTS
var albumResults = document.querySelector(".album-container.results");
var albumResultsAll = document.querySelectorAll(".album-container.results");
var albumResultSelected;
var addNewAlbumDashedAll = document.querySelectorAll(".add-new-album");
var addNewAlbumDashed = document.querySelector(".add-new-album");

// POP UP MENU

var playlistNames = document.querySelectorAll(".time-period.name");
var menuListItems = document.querySelectorAll(".menu-list-item");

var playlistNamesArray = Array.from(playlistNames);
var menuListItemsArray = Array.from(menuListItems);
var popUpMenu = document.querySelector(".pop-up-container");

//DOWNLOAD STUFF
var downloadBtn = document.getElementById("downloadBtn");

// API ELEMENTS
const apiUrlArtist =
  "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=";
const apiUrlAlbum =
  "https://theaudiodb.com/api/v1/json/523532/searchalbum.php?a=";
var artistName;
var albumName;
var mainSearchBar = document.getElementById("main-search-bar");
var searchResults = document.querySelector(".main-row.two.results");
var searchDropDown = document.getElementById("dropdown.category");
var searchDropDown = document.getElementById("dropdown");

/////   !! SORTABLES LIBRARY STUFF !!    /////
var sortable = new Sortable(allPlaylists, {
  animation: 150,
  easing: "cubic-bezier(1, 0, 0, 1)",
  ghostClass: "sortable-ghost", // Class name for the drop placeholder
  chosenClass: "sortable-chosen", // Class name for the chosen item
  dragClass: "sortable-drag", // Class name for the dragging item
});

/// DRAGGABLES LIBRARY
/*const sortable = new Sortable.default(document.querySelectorAll("ul"), {
  draggable: "li",
});

sortable.on("sortable:start", () => console.log("sortable:start"));
sortable.on("sortable:sort", () => console.log("sortable:sort"));
sortable.on("sortable:sorted", () => console.log("sortable:sorted"));
sortable.on("sortable:stop", () => console.log("sortable:stop"));


draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    console.log("success");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
}); */

/// TOUCH EVENTS LISTENERS

/*draggables.forEach((draggable) => {
  draggable.addEventListener("touchstart", () => {
    draggable.classList.add("dragging");
    console.log("successTOUCHSTART");
  });

  draggable.addEventListener("touchend", () => {
    draggable.classList.remove("dragging");
    console.log("successTOUCHEND");
  });

  draggable.addEventListener("touchmove", (e) => {
    e.preventDefault();
    console.log("successTOUCHMOVE");
    var touchLocation = e.targetTouches[0];

    draggable.style.left = touchLocation.pageX + "px";
    draggable.style.top = touchLocation.pageY + "px";
  });
}); */

// ADDS ALBUM TO DROP AREA AND REMOVES THE "RESULTS" CLASS FROM THE ALBUM CONTAINER
/*dropAreas.forEach((dropArea) => {
  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    draggable.classList.remove("results");
    dropArea.appendChild(draggable);
  });
});*/

/////   !! FUNCTIONS CALLED EACH TIME A NEW SEARCH IS MADE !!    /////

// FUNCTION TO REMOVE THE PREVIOUS SEARCH RESULTS AND HIDE "RESULTS" HEADER
function resetSearchStyles(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  var resultsText = document.getElementById("results");
  resultsText.classList.add("hide");

  mainBodySearchBar.classList.remove("add-padding");
}

/// FUNCTION THAT READS DROPDOWN VALUE AND CALLS ARTIST OR ALBUM FUNCTION BASED ON VALUE

//FUNCTION CALLED ON SEARCH BUTTON CLICK (CREATES LIST OF ALBUM RESULTS BASED ON USER INPUT)
async function getDataArtist() {
  var userInput = mainSearchBar.value;
  var artistNameRemoveEndSpace = userInput.trimEnd();
  var artistName = artistNameRemoveEndSpace.split(" ").join("_");
  console.log(artistName);
  var fullApiUrl = apiUrlArtist + artistName;
  console.log(fullApiUrl);
  const response = await fetch(fullApiUrl);
  const data = await response.json();

  resetSearchStyles(searchResults);

  //IF THE ALBUM HAS AN IMAGE AND IS CATEGORIZED AS AN ALBUM, ADD IT TO THE RESULTS
  if (data.album == null) {
    var parent = document.querySelector(".main-row.two.results");
    parent.insertAdjacentHTML(
      "beforeend",
      "<div class='no-search-results'>Oops. No results. Please try again.</div>"
    );

    mainBodySearchBar.classList.add("add-padding");
  } else {
    var resultsText = document.getElementById("results");

    resultsText.classList.remove("hide");

    mainBodySearchBar.classList.add("add-padding");

    for (let i = 0; i < data.album.length; i++) {
      var parent = document.querySelector(".main-row.two.results");
      if (
        data.album[i].strAlbumThumb &&
        data.album[i].strReleaseFormat == "Album"
      ) {
        parent.insertAdjacentHTML(
          "beforeend",
          `<div class="album-container results"  draggable="true"><div class="album"><img class="img album" src="${data.album[i].strAlbumThumb}"/></div></div>`
        );
      } else {
      }
    }
  }
}

// THIS IS NOT WORKING BECAUSE THE SITE API IS DOWN FOR THIS SPECIFIC SEARCH CALL
async function getDataAlbum() {
  var userInput = mainSearchBar.value;
  var albumNameRemoveEndSpace = userInput.trimEnd();
  var albumName = albumNameRemoveEndSpace.split(" ").join("_");
  console.log(albumName);
  var fullApiUrl = apiUrlAlbum + albumName;
  console.log(fullApiUrl);
  const response = await fetch(fullApiUrl);
  const data = await response.json();

  resetSearchStyles(searchResults);

  //IF THE ALBUM HAS AN IMAGE AND IS CATEGORIZED AS AN ALBUM, ADD IT TO THE RESULTS
  for (let i = 0; i < data.album.length; i++) {
    var parent = document.querySelector(".main-row.two.results");
    if (
      data.album[i].strAlbumThumb &&
      data.album[i].strReleaseFormat == "Album"
    ) {
      parent.insertAdjacentHTML(
        "beforeend",
        `<div class="album-container"><div class="album"><img class="img album" src="${data.album[i].strAlbumThumb}"/></div></div>`
      );
    } else {
    }
  }
}
/////   !! FUNCTION THAT ADDS SECTION ON BUTTON CLICK !!    /////

function addSection() {
  $("#full-list").append(
    '<section class="main-body-section"><div class="main-body-section-content"><div class="delete-container hide"><div class="delete-pop-up"><div class="delete-icon-container"><div class="delete-icon"><button type="button" class="btn-trash"><i class="far fa-trash-alt"></i></button></div></div></div></div><div class="container"><div class="row"><div class="content-container all"><div class="content-container"><div class="main-row one"><div class="time-period-box left"><div contenteditable="true" class="time-period name">Section Name</div></div><div class="time-period-box right"><div contenteditable="true" class="time-period numbers">Time Period</div></div></div><div class="main-row two drop" class="drop-area"><div class="add-new-album hide"><div class="plus-container"><button type="button" class="btn-add-new-album"><i class="ph-plus"></i></button></div></div></div></div></div></div></div></div></section>'
  );
}
// CHANGE DOWNLOAD BUTTON TEXT ON CLICK //

function changeText() {}

//. JQUERY //

$(document).ready(function () {
  /////   !! FUNCTIONS THAT ADD DRAG  EVENT LISTENERS TO NEWLY CREATED ELEMENTS !!    /////

  /*$("body").on("dragstart", albumContainerResults, function (event) {
    var target = $(event.target).closest(".album-container");
    console.log("success");
    $(target).addClass("dragging");
  });

  $("body").on("dragend", albumContainerResults, function (event) {
    var target = $(event.target).closest(".album-container");
    console.log("finished");
    $(target).removeClass("dragging");
  });

  $("body").on("dragover", newDropArea, function (event) {
    console.log("its draggin bro");
    console.log("new");
    event.preventDefault();
    const draggable = document.querySelector(".dragging");
    newDropArea.append(draggable);
  }); */

  /////   !! FUNCTIONS THAT ADD TOUCH  EVENT LISTENERS TO SEARCH RESULT ALBUMS !!    /////

  /*$(document).on(
    "touchend click",
    ".album-container.results",
    function (event) {
      if (event.handled === false) return;
      event.stopPropagation();
      event.preventDefault();
      event.handled = true;

      var albumResultSelected = event.currentTarget;
      console.log(albumResultSelected);
      setMenuItemNames();
      popUpMenu.classList.remove("hide");
    }
  );*/

  /*$("body").click(function (event) {
    event.preventDefault();
    popUpMenu.classList.add("hide");
    console.log("Here a click event is fired");
  });

  $(popUpMenu).click(function (e) {
    e.stopPropagation();
  });*/

  // REMOVE DELETE BUTTON WHEN CLICK ELSEWHERE
  $("body").on("click", function () {
    $(".delete-container").addClass("hide");
  });
  // ADD ALBUM CONTAINER RED CLASS ON TOUCH HOLD

  // DELETE ALBUM ON TOUCH IF HAS CLASS ALBUM-CONTAINER-RED // IF TOUCH ALBUM-CONTAINER WITH NO ALBUM-CONTAINER-RED CLASS THEN REMOVE ALL ALBUM-CONTAINER-RED CLASSES AND REMOVE ALL ADD-NEW-ALBUM CLASSES

  $("body").on(
    "click",
    ".album-container:not(.album-container.results)",
    function () {
      var thisAlbum = $(this).closest($(".album-container"));
      var thisAddNewAlbum = $(this).closest($(".add-new-album"));
      console.log("clicked bitch");
      if ($(this).closest(".album-container").hasClass("album-container-red")) {
        console.log("already has red class");
        $(this).closest(".album-container").remove();
        $(".add-new-album").addClass("hide");
      } else {
        $(thisAlbum).addClass("album-container-red");
        $(".album-container").not(thisAlbum).removeClass("album-container-red");
        $(".add-new-album").not(thisAlbum.siblings()).removeClass("hide");
        $(thisAlbum).siblings(".add-new-album").addClass("hide");
        $(thisAddNewAlbum).addClass("hide");
      }
    }
  );

  /////   !! ADD GREEN BORDER TO ALBUM RESULT WHEN CLICKED ON !!    /////

  /// WHEN AN ALBUM CONTAINER RESULTS IS CLICKED, BORDER TURNS GREEN AND DASHED "ADD NEW ALBUM" BOXES APPEAR
  // ONLY ALLOW ONE ALBUM TO HAVE GREEN BORDER AT ONCE
  $("body").on("click", ".album-container.results", function () {
    if ($(this).hasClass("album-container-green")) {
      $(this).removeClass("album-container-green");
      $(".add-new-album").addClass("hide");
    } else {
      $(".album-container.results")
        .not(this)
        .removeClass("album-container-green");
      $(this).addClass("album-container-green");
      $(".add-new-album").removeClass("hide");
    }
  });

  /// WHEN A DASHED "ADD NEW ALBUM" BOX IS CLICKED, THE GREEN ALBUM(S) ARE APPENDED, GREEN BORDER GETS REMOVED FROM ALL
  /// ALBUMS, AND THE DASHED "ADD NEW ALBUMS" BOXES GO HIDDEN AGAIN
  $("body").on("click", ".add-new-album", function () {
    console.log("the dashed album was clicked");
    $(".album-container.results.album-container-green").insertBefore($(this));
    $(".album-container.album-container-red").insertBefore($(this));
    $(".add-new-album").addClass("hide");
    $(".album-container.results").removeClass("album-container-green");
    $(this).siblings().removeClass("results");
  });

  /// WHEN USER CLICKS OUTSIDE OF GREEN OR RED ALBUM, THE HIGHLIGHT DISAPPEARS
  $(document).on("click", function (e) {
    if ($(e.target).is(".album") === false) {
      $(".album-container").removeClass("album-container-green");
      $(".album-container").removeClass("album-container-red");
      $(".add-new-album").addClass("hide");
    }

    if ($(e.target).parent().parent().is(".album-container-green") === false) {
      $(".album-container").removeClass("album-container-green");
    }

    if ($(e.target).parent().parent().is(".album-container-red") === false) {
      $(".album-container").removeClass("album-container-red");
    }
  });

  // FUNCTION TO HANDLE DELETE-NO / DELETE-YES BUTTON CLICK (HIDE DELETE POP UP)

  $("body").on("click", ".btn-trash", function () {
    $(this).closest(".main-body-section").remove();
  });

  // ON TOUCHHOLD REMOVE HIDE CLASS FROM DELETE CONTAINER

  /* var timer;
  $("body")
    .on("touchstart", ".main-body-section", function () {
      var touchTarget = $(this);
      timer = setTimeout(function () {
        console.log("TOUCHING ALREADY!");
        $(".album-container").removeClass("album-container-red");
        $(".add-new-album").addClass("hide");
        $(".delete-container").addClass("hide");
        $(touchTarget).find(".delete-container").removeClass("hide");
      }, 750);
    })
    .on("touchend", function () {
      console.log("TIMER CLEARED!");
      clearTimeout(timer);
    });
*/

  // TOUCH SLIDE TO DELETE SECTIONS

  $("body").on("touchstart", ".main-body-section", function () {
    var eventTarg = $(this);
    $(function () {
      //Enable swiping...
      $("body").swipe({
        //Single swipe handler for left swipes
        swipeLeft: function (
          event,
          direction,
          distance,
          duration,
          fingerCount
        ) {
          console.log("swipe initiated");
          $(".album-container").removeClass("album-container-red");
          $(".add-new-album").addClass("hide");
          $(".delete-container")
            .not($(eventTarg))
            .closest(".delete-container")
            .addClass("hide");

          $(eventTarg).find(".delete-container").removeClass("hide");
          $(eventTarg).find(".delete-container").addClass("animationSlideLeft");
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 75,
      });
    });
  });

  // TAKE SCREENSHOT OF PLAYLISTS AND SAVE FILE
  $(downloadBtn).click(function () {
    $(this).text("Downloading...");
    domtoimage.toBlob(allPlaylists).then(function (blob) {
      window.saveAs(blob, "myMusicMap.png");
    });

    setTimeout(function () {
      $(downloadBtn).text("Download");
    }, 5000);
  });

  $(searchBar).keypress(function (e) {
    if (e.which == 13) {
      e.preventDefault();
      searchBtn.click();
    }
  });
});
