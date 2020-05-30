import axios from "axios";

export default async () => {
  console.log("fetching bttv data...");
  const [bttv1, bttv2, bttv3, bttv4, bttv5] = await axios.all([
    axios.get('https://api.betterttv.net/3/emotes/shared/top?offset=0&limit=100'),
    axios.get('https://api.betterttv.net/3/emotes/shared/top?offset=1&limit=100'),
    axios.get('https://api.betterttv.net/3/emotes/shared/top?offset=2&limit=100'),
    axios.get('https://api.betterttv.net/3/emotes/shared/top?offset=3&limit=100'),
    axios.get('https://api.betterttv.net/3/emotes/shared/top?offset=4&limit=100')
  ]);
  console.log("processing bttv data...");
  let bttvRaw = [
    ...bttv1.data,
    ...bttv2.data,
    ...bttv3.data,
    ...bttv4.data,
    ...bttv5.data
  ];
  return bttvRaw.map(res => {
    return {
      code: res.emote.code,
      count: res.total,
      url: "//cdn.betterttv.net/emote/"+res.emote.id+"/3x"
    }
  })
}