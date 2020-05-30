import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';

import { Emote } from '../models/Emote';
import { isString } from 'util';
 
@Controller('api/emotes')
export class EmoteController {
  @Get('')
  private getAll(req: Request, res: Response) {
    // checking if query is limited
    let limit = 100;
    let count = req.query.count;
    if(isString(count)){
      limit = parseInt(count);
    }

    // checking if query is sorted
    let sort = req.query.sort;
    let sortQuery = {};
    if(sort === "count-desc") {
      sortQuery = {count: -1}
    }
    let options = {
      limit: limit,
      sort: sortQuery
    }
    Emote.find({}, {}, options, (error: Error, emotes: MongooseDocument[]) => {
      if (error) {
        res.send(error);
      }
      res.json(emotes);
    })
}
}