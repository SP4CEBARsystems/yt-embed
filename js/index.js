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

function loadVideo() {
    const videoId = getQueryParam("v");
    const app = document.getElementById("app");
    
    if (videoId) {
        const container = document.createElement("div");
        container.className = "container";
        
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        
        container.appendChild(iframe);
        app.appendChild(container);
    } else {
        const error = document.createElement("div");
        error.className = "error";
        error.textContent = 'Missing "v" parameter in the URL.';
        app.appendChild(error);
    }
}
