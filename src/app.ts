import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import RootController from './controllers';
import { MONGO_DB, MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASSWORD } from './constants/contants';

class App extends Server {

  constructor() {
    super();
    this.setConfig();
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended:true}));

    //Enables cors   
    this.app.use(cors());

    let connString = "mongodb://"+MONGO_USER+":"+MONGO_PASSWORD+"@"+MONGO_HOST+":"+MONGO_PORT+"/"+MONGO_DB;

    // connect to mongo
    this.mongoConnect(connString);

    // registering controllers
    super.addControllers(RootController);

    require('./schedule/schedule.ts');
  }

  //start the server & listen on given port
  public start(port: string) {
    this.app.listen(port, () => {
      console.log('Server listening on port: ' + port);
    })
  }

  //Connecting to our MongoDB database
  private mongoConnect(connString: string) { 
    mongoose.Promise = global.Promise;
    mongoose.connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }).then(() => (console.log("mongo connection ok")));
  }
}

export default new App();