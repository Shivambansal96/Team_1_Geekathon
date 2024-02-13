import { getActiveTabURL } from "./utils.js";

/****************************************************************************************************************************************
Add new bookmark
*****************************************************************************************************************************************/

function addNewBookmark(bookmarks, bookmark){
  const bookmarkTitleDiv = document.createElement("div");
  const controlDiv = document.createElement("div");
  const newBookmarkDiv = document.createElement("div");

  bookmarkTitleDiv.textContent = bookmark.name + "@" + bookmark.desc;
  bookmarkTitleDiv.className = "bookmark-heading";
  controlDiv.className = "bookmark-controls";

  setBookmarkAttributes("play", onPlay, controlDiv);
  setBookmarkAttributes("delete", onDelete, controlDiv);

  newBookmarkDiv.id = "bookmark-" + bookmark.time;
  newBookmarkDiv.className = "bookmark";
  newBookmarkDiv.setAttribute("timestamp", bookmark.time);

  newBookmarkDiv.appendChild(bookmarkTitleDiv);
  newBookmarkDiv.appendChild(controlDiv);
  bookmarks.appendChild(newBookmarkDiv);
};

function viewBookmarks(currentBookmarks=[]){
  const bookmarksElement = document.getElementById("bookmarks");
  bookmarksElement.innerHTML = "";

  if (currentBookmarks.length > 0) {
    for (let i = 0; i < currentBookmarks.length; i++) {
      const bookmark = currentBookmarks[i];
      addNewBookmark(bookmarksElement, bookmark);
    }
  } 
  
  else {
    bookmarksElement.innerHTML = '<i class="row">No bookmark has been added.</i>';  
  }

  return;
};

async function onPlay(e) {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};

// async function onDelete(e){
//   const activeTab = await getActiveTabURL();
//   const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
//   const bookmarkDeleteElement = document.getElementById(
//     "bookmark-" + bookmarkTime
//   );

//   bookmarkDeleteElement.parentNode.removeChild(bookmarkDeleteElement);

//   chrome.tabs.sendMessage(activeTab.id, {
//     type: "DELETE",
//     value: bookmarkTime,
//   }, viewBookmarks);
// };



async function onDelete(e) {
  const activeTab = await getActiveTabURL();
  const bookmarkTime = parseFloat(e.target.parentNode.parentNode.getAttribute("timestamp"));
  const currentVideo = new URLSearchParams(activeTab.url.split("?")[1]).get("v");

  // Fetch current bookmarks from storage
  chrome.storage.sync.get([currentVideo], (result) => {
    let bookmarks = result[currentVideo] ? JSON.parse(result[currentVideo]) : [];

    // Filter out the bookmark to delete
    bookmarks = bookmarks.filter(bookmark => bookmark.time !== bookmarkTime);

    // Update storage with filtered bookmarks
    chrome.storage.sync.set({ [currentVideo]: JSON.stringify(bookmarks) }, () => {
      // Remove the bookmark element from DOM after updating storage
      const bookmarkDeleteElement = document.getElementById("bookmark-" + bookmarkTime);
      if (bookmarkDeleteElement) {
        bookmarkDeleteElement.parentNode.removeChild(bookmarkDeleteElement);
      }

      // Optionally, refresh the bookmarks displayed to reflect deletion
      viewBookmarks(bookmarks);
    });
  });
};




function setBookmarkAttributes(src, eventListener, controlParentElement){
  const controlElement = document.createElement("img");

  controlElement.src = "assets/" + src + ".png";
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  controlParentElement.appendChild(controlElement);
};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

      viewBookmarks(currentVideoBookmarks);
    });
  } 
  
  else {
    const container = document.getElementsById("Bookmarks-container");

    container.innerHTML = '<div id="title">This is not a youtube video page.</div>';
  }
});