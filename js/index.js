import EmbedMaker from "./EmbedMaker.js";
import MusicDisplay from "./MusicDisplay.js";
import URIExtractor from "./URIExtractor.js";

let isMinimalPage = false;
/** @type {string|null} */
let mainVideoId = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log("Hello, DOM content loaded");
    isMinimalPage = URIExtractor.getQueryParam('minimal') !== null && URIExtractor.getQueryParam('minimal') === "1";
    if (isMinimalPage) {
        stripPageDown()
        document.body?.classList.add('full-height');
    }
    loadVideo();
});

function stripPageDown() {
    document.querySelector('header')?.remove();
    document.querySelector('footer')?.remove();
}

async function loadVideo() {
    const app = document.getElementById("app");
    const {videoId, playlistId} = URIExtractor.getVideoParams();
    mainVideoId = videoId;

    if (!app) {
        return;
    } else if (!videoId) {
        showError(app, 'Missing "v" parameter in the URL.');
        return;
    }
    
    const container = document.createElement("div");
    container.className = "container";
    if (isMinimalPage) {
        container.classList.add('full-height');
    } else {
        container.classList.add('aspect-16-9');
    }
    app.appendChild(container);
    const pElement = document.createElement('p');
    pElement.id = 'statusDisplay'
    document.querySelector('main')?.appendChild(pElement);
    const iframeManager = new EmbedMaker(videoId, playlistId, true, container, pElement);
}

/**
 * 
 * @param {HTMLElement} app 
 * @param {string} message 
 */
function showError(app, message) {
    const error = document.createElement("div");
    error.className = "error";
    error.textContent = message;
    app.appendChild(error);
}
