import axios from "axios";


interface frankerZEmotes {
  name: string,
  usage_count: number,
  urls: string[]
}

export default async () => {
  console.log("fetching frankerfaceZ data...");
  const [franker1, franker2, franker3, franker4, franker5] = await axios.all([
    axios.get('https://api.frankerfacez.com/v1/emoticons?per_page=100&page=1&sort=count-desc'),
    axios.get('https://api.frankerfacez.com/v1/emoticons?per_page=100&page=2&sort=count-desc'),
    axios.get('https://api.frankerfacez.com/v1/emoticons?per_page=100&page=3&sort=count-desc'),
    axios.get('https://api.frankerfacez.com/v1/emoticons?per_page=100&page=4&sort=count-desc'),
    axios.get('https://api.frankerfacez.com/v1/emoticons?per_page=100&page=5&sort=count-desc')
  ]);
  console.log("processing frankerfaceZ data...");
  let frankerRaw = [
    ...franker1.data.emoticons,
    ...franker2.data.emoticons,
    ...franker3.data.emoticons,
    ...franker4.data.emoticons,
    ...franker5.data.emoticons
  ];
  return frankerRaw.map((res: frankerZEmotes) => {
    return {
      code: res.name,
      count: res.usage_count,
      url: res.urls[4] ?? ( res.urls[2] ?? res.urls[1] )
    }
  })
}