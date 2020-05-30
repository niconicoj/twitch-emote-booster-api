# Twitch Emote Booster API

This is an API made to be used with the Twitch emote booster app. It expose a single endpoint that can be access to fetch bulk emotes informations.

| Parameter     | default       | Values                    | Description                                                                                            |
| ------------- |:-------------| -------------------------| ------------------------------------------------------------------------------------------------------|
| offset        | 0             | unsigned integer          | offsets the results returns based on the limit. ex: limit 60, offset 2 will returns results 121 to 180 |
| limit         | 100           | integer between 1 and 500 | the numbers of results to return. |
| sort          | count-desc    | count-asc, count-desc     | optionnally sort the results by usage count ascending or descending. (default to descending) |

The returned data is an array of object structured as follows :

```javascript
{
  code: string // the string code for the emotes. example : PogChamp
  count: int // the usage count of the emotes
  urls: string // the image url
}
```

The API uses a mongoDB instance to hold data and updates itself automatically by fetching data from the [FrankerFaceZ](https://www.frankerfacez.com/) API, the [BTTV](ttps://betterttv.com/) API and the [TwitchEmotes](https://twitchemotes.com/) API. The making of this app would not have been possible without the work of those teams.

