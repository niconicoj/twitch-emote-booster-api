import axios from "axios";
import { robotEmotes, robotIds } from "../../constants/robotEmotes";
import { turboIds, turboEmotes } from "../../constants/turboEmotes";

interface twitchEmotes {
  date: string,
  id: number,
  count: number,
  code?: string
}

export default async () => {
  console.log("fetching twitchEmotes data...");
  const twitchEmotesRaw = await axios.get('https://internal-api.twitchemotes.com/api/stats/top/by-date?limit=100');
  console.log("processing twitchEmotes data...");
  return twitchEmotesRaw.data.map((res: twitchEmotes) => {
    if( robotEmotes[<robotIds>res.id] !== undefined ) {
      return {
        code: robotEmotes[<robotIds>res.id].code,
        count: res.count,
        url: robotEmotes[<robotIds>res.id].url
      }
    }
    if( turboEmotes[<turboIds>res.id] !== undefined ) {
      return {
        code: turboEmotes[<turboIds>res.id].code,
        count: res.count,
        url: turboEmotes[<turboIds>res.id].url
      }
    }
    return {
      code: res.code,
      count: res.count,
      url: "//static-cdn.jtvnw.net/emoticons/v1/"+res.id+"/2.0"
    }
  })
}

