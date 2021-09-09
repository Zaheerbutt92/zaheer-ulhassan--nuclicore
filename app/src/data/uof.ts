import db from "./db";

export default class {
    static all(stmt:string, params:any) {
      return new Promise((res, rej) => {
        db.all(stmt, params, (error, result) => {
          if (error) {
            return rej(error.message);
          }
          return res(result);
        });
      });
    }
    static get(stmt:string, params:any) {
      return new Promise((res, rej) => {
        db.get(stmt, params, (error, result) => {
          if (error) {
            return rej(error.message);
          }
          return res(result);
        });
      });
    }
  
    static run(stmt:string, params:any) {
      return new Promise((res, rej) => {
        db.run(stmt, params, (error:any, result:any) => {
          if (error) {
            return rej(error.message);
          }
          return res(result);
        });
      });
    }
  }