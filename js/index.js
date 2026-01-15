document.addEventListener('DOMContentLoaded', () => {
    console.log("Hello, DOM content loaded");
    loadVideo();
});

/**
 * Gets a query parameter value by name.
 * @param {string} name
 * @returns {string|null}
 */
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

/**
 * 
 * @param {string} url 
 * @returns 
 */
function extractVideoId(url) {
    const matchVideoId = /(?:youtube\.com\/(?:watch\?.*v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(matchVideoId);
    return match ? match[1] : null;
}

function loadVideo() {
    const videoUrl = getQueryParam("u");
    const app = document.getElementById("app");
    let videoId;
    if (videoUrl) {
        videoId = extractVideoId(videoUrl) ?? getQueryParam("v");
    }

    if (!app) {
        return;
    } else if (!videoId) {
        showError(app, 'Missing "v" parameter in the URL.');
        return;
    }
    
    const container = document.createElement("div");
    container.className = "container";
    
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    
    container.appendChild(iframe);
    app.appendChild(container);
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

