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

// REMOVE SECTION BUTTON
var removeSectionBtn = document.getElementById("deleteSectionBtn");

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
  touchStartThreshold: 4,
  delay: 200,
});

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
          `<div class="album-container results"><div class="album"><img class="img album" src="${data.album[i].strAlbumThumb}"/></div></div>`
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
    '<li class="card-playlist"><section class="main-body-section"><div class="main-body-section-content"><div class="content-container all"><div class="content-container"><div class="main-row one"><div class="time-period-box left"><div contenteditable="true" class="time-period name">Add Name</div></div><div class="time-period-box right"><div contenteditable="true" class="time-period numbers">Add Time</div></div></div><div class="main-row two drop" class="drop-area"><div class="add-new-album hide"><div class="plus-container"><button type="button" class="btn-add-new-album"><i class="ph-plus"></i></button></div></div></div></div></div></div></section></li>'
  );
}
// CHANGE DOWNLOAD BUTTON TEXT ON CLICK //

function changeText() {}

//. JQUERY //

$(document).ready(function () {
  // SHOW "CLEAR SEARCH" BUTTON WHEN SEARCH STARTS

  $("#main-search-bar").on("keyup", function () {
    var searchValue = document.getElementById("main-search-bar").value;
    if (
      searchValue.length > 0 ||
      $(mainBodySearchBar).hasClass("add-padding")
    ) {
      $("#btn-clear-search").addClass("visible");
    } else if (
      searchValue.length == 0 &&
      !$(mainBodySearchBar).hasClass("add-padding")
    ) {
      $("#btn-clear-search").removeClass("visible");
    }
  });

  $("#btn-clear-search").on("click", function () {
    resetSearchStyles(searchResults);
    $("#main-search-bar").val("");
    $("#btn-clear-search").removeClass("visible");
  });

  // REMOVE DELETE BUTTON WHEN CLICK ELSEWHERE
  $("#searchBtn").on("click", function () {
    getDataArtist();
  });

  $("#addSectionBtn").on("click", function () {
    addSection();
  });

  $("body").on("click", function () {
    if (!$(this).hasClass("red-background")) {
      $(".card-playlist").removeClass("red-background");
    }
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

  // TOUCH SLIDE TO DELETE SECTIONS

  $("body").on("touchstart", ".card-playlist", function () {
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
          $(eventTarg).addClass("red-background");
          $(".card-playlist").not(eventTarg).removeClass("red-background");
          $(".album-container").removeClass("album-container-red");
          $(".album-container.results").removeClass("album-container-green");
          $(".add-new-album").addClass("hide");
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 200,
      });
    });
  });

  $("body").on("click", ".card-playlist", function () {
    if ($(this).hasClass("red-background")) {
      $(this).remove();
      $(".add-new-album").addClass("hide");
    }
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
