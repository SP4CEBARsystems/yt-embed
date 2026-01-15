## New Application
Hosts a YouTube embed, supports both (live) videos and playlists. Can parse most YouTube URLs. Can be used as an embed itself.

## Supported URI Parameters
| Parameter | Example | Description |
| --- | --- | --- |
| u | Provide a YouTube URL to be parsed | https://www.youtube.com/watch?v=dQw4w9WgXcQ |
| v | YouTube v (video ID) parameter | dQw4w9WgXcQ |
| list | YouTube list (playlist ID) parameter | PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab |
| minimal | Strip the page to just the iframe so this page can be embedded itself. | 1 |
Note: Any parameter provided to U containing "&" signs will be treated as a separate parameter by this website but that is not a big issue as both "v" and "list" are supported here as well.