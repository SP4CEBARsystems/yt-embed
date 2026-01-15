import AsyncHelpers from "./AsyncHelpers.js";
import EmbedMaker from "./EmbedMaker.js";
import MusicDisplay from "./MusicDisplay.js";
import URIExtractor from "./URIExtractor.js";

let isMinimalPage = false;
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
    const iframe = EmbedMaker.createYouTubeIframe('jfKfPfyJRdk', null);
    
    // container.innerHTML = '<iframe id="youtubePlayer" src="https://www.youtube.com/embed/jfKfPfyJRdk" title="lofi hip hop radio 📚 beats to relax/study to" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    // const iframe1 = await AsyncHelpers.waitForElement('#youtubePlayer', container);
    // const iframe = document.getElementById('youtubePlayer');
    // const iframe = document.createElement('iframe')

    // const iframe = EmbedMaker.createYouTubeIframe(videoId, playlistId);
    container.appendChild(iframe);
    const iframe1 = await AsyncHelpers.waitForElement('#youtubePlayer', container);

    app.appendChild(container);
    // const pElement1 = document.createElement('p');
    const pElement = document.createElement('p');
    document.querySelector('main')?.appendChild(pElement);
    // document.querySelector('main')?.appendChild(pElement1);
    // await AsyncHelpers.waitForIframeLoad(iframe);
    // if (iframe1 && pElement1) new MusicDisplay(iframe1, pElement1);
    if (iframe1 && pElement) new MusicDisplay(iframe1, pElement);

    // const ytEl = document.getElementById('youtubePlayer');
    // if (ytEl && pElement) new MusicDisplay(ytEl, pElement);
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
