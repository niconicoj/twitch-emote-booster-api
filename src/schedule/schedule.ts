import { scheduleJob } from "node-schedule";
import axios from "axios";

interface IEmote {
  code: string,
  count: number,
  url: string
}

import fetchTwitchEmotes from "./jobs/fetchTwitchEmotes";
import fetchFrankerfaceZ from "./jobs/fetchFrankerfaceZ";
import fetchBTTV from "./jobs/fetchBTTV";
import { Emote } from "../models/Emote";

scheduleJob('0 15 * * *', () => {
  Promise.all(
    [
      fetchFrankerfaceZ(), 
      fetchTwitchEmotes(),
      fetchBTTV()
    ]
  ).then((values: IEmote[][]) => {
    console.log("done !");
    console.log("arranging data...");
    let flatValues = values.flat();
    let normalizedData:IEmote[] = [];
    flatValues.forEach((el) => {
      let index = normalizedData.findIndex( (value) => value.code === el.code )
      if( index !== -1) {
        //an obj with the same code already exists in the norm arr, incrementing count keeping the rest
        normalizedData[index] = {
          ...normalizedData[index],
          count: normalizedData[index].count + el.count
        };
      } else {
        // doesn't exists, we can just push obj into the array
        normalizedData.push(el);
      }
    });
    console.log("saving data...");
    normalizedData.forEach((el) => {
      let query = {
        code: el.code
      }
      let update = {
        url: el.url,
        count: el.count
      }
      let options = {
        new: true,
        upsert: true 
      }
      Emote.findOneAndUpdate(query, update, options, (err: any) => {
        if(err) console.log(err);
      });
    })
    console.log("done !");
  });
})