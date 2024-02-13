function loadContent() {
  let youtubeRightControls, youtubePlayer;  // Controlling youtTube
  let currentVideo = "";                   // Empty video
  let currentVideoBookmarks = [];          // Storing Bookmark  in the array



  /**************************************************************************************************************************************
    fetchBookmark function for fetch the bookmark and arange them when video loaded
  ****************************************************************************************************************************************/

  function fetchBookmarks(){
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };


  /**************************************************************************************************************************************
   addToBookmark function works when we click bookmark it will take time and call fetchBookmark to store the bookmark  
  *************************************************************************************************************************************/


  async function addToBookmark(){
    const currentTime = youtubePlayer.currentTime;
    const bookmarkName = prompt("Enter bookmark name:", "My Bookmark"); 
    const newBookmark = {
      time: currentTime,
      name: bookmarkName,
      desc: getTime(currentTime),
      // title: videoTitle
    };

    currentVideoBookmarks = await fetchBookmarks();

    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
    });
  };

  /**************************************************************************************************************************************
 newVideoLoaded function works when new video is loaded and  bookmark logo is assigned to the video.
  After clicking the button, bookmark is added.
  *************************************************************************************************************************************/

  const newVideoLoaded = async () => {
    const bookmarkButtonExists = document.getElementsByClassName("bookmark-button")[0];

    currentVideoBookmarks = await fetchBookmarks();

    if (!bookmarkButtonExists) {

      console.log("TRUE");
      const bookmarkButton = document.createElement("img");

      bookmarkButton.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkButton.className = "ytp-button " + "bookmark-button";
      bookmarkButton.id="yt_bookmark_btn"
      bookmarkButton.title = "Click to bookmark current timestamp";
      bookmarkButton.style.height="30px"
      bookmarkButton.style.width="30px"     // change the icon  size as per your need
      bookmarkButton.style.marginBottom="8px"

      bookmarkButton.style.transition = 'transform 0.3s ease';

      

      bookmarkButton.addEventListener('mouseenter', function() {
        // Scale the image on mouseenter
        bookmarkButton.style.transform = 'scale(1.5)';  
      });
    
      bookmarkButton.addEventListener('mouseleave', function() {
        // Revert back to the original scale on mouseleave
        bookmarkButton.style.transform = 'scale(1)';
        
      });


      // bookmarkButton.style.hover.transform= scale(1.1);


      youtubeRightControls = document.getElementsByClassName("ytp-right-controls")[0]; //check this class
      youtubePlayer = document.getElementsByClassName('video-stream')[0];

      youtubeRightControls.appendChild(bookmarkButton);
      bookmarkButton.addEventListener("click", addToBookmark);
    }
  };

  /***************************************************************************************************************************************
   below function listen for messages from popup.js file 

    new value will call the function
    play button will stop video and start again from that time stamp
    Delete button will delete that bookmark
  *************************************************************************************************************************************/

  chrome.runtime.onMessage.addListener((obj, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    } 
    
    else if (type === "PLAY") {
      youtubePlayer.currentTime = value;
    }
    
    else if ( type === "DELETE") {
      currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
      chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });

      response(currentVideoBookmarks);
    }
  });

  newVideoLoaded();
}

loadContent();


/***************************************************************************************************************************************
 getTime receive time and convert into sec
  @returns time in sec
*****************************************************************************************************************************************/

function getTime(t) {
  
  var date = new Date(0);
  date.setSeconds(t);

  return date.toISOString().substr(11, 8);
};