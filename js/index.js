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
function extractYouTubeIds(url) {
    const regex = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})|(?:youtube\.com\/(?:playlist|embed\/videoseries)\?(?:.*&)?list=([a-zA-Z0-9_-]+))/;
    const match = url.match(regex);
    if (!match) return {
        videoId: null, 
        playlistId: null
    };
    return {
        videoId: match[1] || null,
        playlistId: match[2] || null
    };
}

function getParams() {
    const videoUrl = getQueryParam("u");
    if (!videoUrl) {
        return {
            videoId: getQueryParam("v") ?? null, 
            playlistId: null
        };
    }
    const extractedIds = extractYouTubeIds(videoUrl);
    extractedIds.videoId = extractedIds.videoId ?? getQueryParam("v") ?? null;
    extractedIds.playlistId = extractedIds.playlistId ?? getQueryParam("list") ?? null;
    return extractedIds;
}

function loadVideo() {
    const app = document.getElementById("app");
    const {videoId, playlistId} = getParams();

    if (!app) {
        return;
    } else if (!videoId) {
        showError(app, 'Missing "v" parameter in the URL.');
        return;
    }
    
    const container = document.createElement("div");
    container.className = "container";
    const iframe = createYouTubeIframe(videoId, playlistId);
    container.appendChild(iframe);
    app.appendChild(container);
}

/**
 * Creates a YouTube iframe element for a video and/or playlist.
 * @param {string|null} videoId
 * @param {string|null} playlistId
 * @returns {HTMLIFrameElement}
 */
function createYouTubeIframe(videoId, playlistId) {
    const iframe = document.createElement("iframe");

    let src;

    if (playlistId && videoId) {
        // Video that is part of a playlist
        src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?list=${encodeURIComponent(playlistId)}`;
    } else if (playlistId) {
        // Playlist only
        src = `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlistId)}`;
    } else if (videoId) {
        // Single video
        src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
    } else {
        throw new Error("No videoId or playlistId provided");
    }

    iframe.src = src;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    return iframe;
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

