import EmbedMaker from "./EmbedMaker.js";

export default class URIExtractor {
    /**
     * Gets a query parameter value by name.
     * @param {string} name
     * @returns {string|null}
     */
    static getQueryParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    /**
     * 
     * @returns {{videoId: string|null;playlistId: string|null;timestamp: number|null}}
     */
    static parseVideoParam() {
        const videoUrl = this.getQueryParam("u");
        if (!videoUrl) return {
            videoId: null,
            playlistId: null,
            timestamp: null
        };
        return EmbedMaker.decomposeUrl(videoUrl);
    }

    static getVideoParams() {
        const extractedIds = this.parseVideoParam();
        extractedIds.videoId = extractedIds.videoId ?? this.getQueryParam("v") ?? null;
        extractedIds.playlistId = extractedIds.playlistId ?? this.getQueryParam("list") ?? null;
        const timestamp = extractedIds.playlistId ?? this.getQueryParam("t") ?? null;
        extractedIds.timestamp = timestamp ? parseInt(timestamp) : null;
        return extractedIds;
    }
}