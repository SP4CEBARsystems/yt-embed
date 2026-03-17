# YT Embed
[YT Embed](https://sp4cebar.com/yt-embed/) hosts a YouTube embed, supports (live) videos, playlists, and channels. Can parse most YouTube URLs. Can be used as an embed itself.

## Supported URI Parameters
| Parameter | Description | Example |
| --- | --- | --- |
| u | Provide a YouTube URL to be parsed | https://www.youtube.com/watch?v=dQw4w9WgXcQ |
| v | YouTube v (video ID) parameter | dQw4w9WgXcQ |
| list | YouTube list (playlist ID) parameter | PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab |
| minimal | Strip the page to just the iframe so this page can be embedded itself. | 1 |  
  
Note: Any value provided to the `U` parameter containing `&` signs will be treated as a separate parameter by this website but that is not a big issue as both YouTube's `v` and `list` parameters are supported here as well.

## Support for youtube channel links
providing a channel link like https://www.youtube.com/channel/UCNtSJKxSW7GsohL8g3aN_Zg to the `u` parameter, gets you an embed of the channel's public videos in a playlist. For example: https://sp4cebar.com/yt-embed/?minimal=1&u=https://www.youtube.com/channel/UCNtSJKxSW7GsohL8g3aN_Zg.

## LeechBlock Configuration
Using the [LeechBlock browser extention](https://www.proginosko.com/leechblock/install/), all youtube videos can be automatically redirected to this tool, below is the configuration to achieve that:
Find the field under `Enter the domain names of the sites to block (one item per line):` and paste the text below.
```
*youtube.com/shorts
*youtube.com/watch
youtu.be
```
Find the field under `Enter the fully specified URL of the page to show instead of these blocked sites:` and paste the text below.
```
https://sp4cebar.com/yt-embed?minimal=1&u=$U
```
