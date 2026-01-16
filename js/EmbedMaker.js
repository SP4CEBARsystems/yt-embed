import AsyncHelpers from "./AsyncHelpers.js";

export default class EmbedMaker {
    /**
     * 
     * @param {string} url 
     * @returns 
     */
    static extractYouTubeIds(url) {
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

    /**
     * 
     * @param {string} url 
     */
    static createYouTubeIframeFromUrl(url) {
        const {videoId, playlistId} = EmbedMaker.extractYouTubeIds(url);
        this.createYouTubeIframe(videoId, playlistId);
    }

    /**
     * Creates a YouTube iframe element for a video and/or playlist.
     * @param {string|null} videoId
     * @param {string|null} playlistId
     * @returns {HTMLIFrameElement}
     */
    static createYouTubeIframe(videoId, playlistId, isJsApiEnabled = false) {
        const iframe = document.createElement("iframe");
        let src;
        const queries = isJsApiEnabled ? 'enablejsapi=1' : '';
        // const queries = '';

        if (playlistId && videoId) {
            // Video that is part of a playlist
            src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?list=${encodeURIComponent(playlistId)}${queries? '&' : ''}${queries}`;
        } else if (playlistId) {
            // Playlist only
            src = `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlistId)}${queries? '&' : ''}${queries}`;
        } else if (videoId) {
            // Single video
            src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}${queries? '?' : ''}${queries}`;
        } else {
            throw new Error("No videoId or playlistId provided");
        }

        iframe.id = 'youtubePlayer';
        iframe.src = src;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;

        return iframe;
    }

    /**
     * Adds an iframe to a container element and waits for at least one iframe to be detected on that container element.
     * @param {HTMLElement} container 
     * @param {HTMLIFrameElement} iframe 
     */
    static async appendToElement(container, iframe) {
        container.appendChild(iframe);
        return AsyncHelpers.waitForElement('iframe', container);
    }
}