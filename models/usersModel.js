const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");
const path = require('path');

class UsersModel {
  constructor() {
    const dbPath = path.join(__dirname,'../', process.env.DB_CONTACTS);
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message);
        return
      }
      console.log("Conectado a la base de datos SQLite.");
    });

    this.db.run(
      `CREATE TABLE IF NOT EXISTS ${process.env.USER_TABLE} (email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, googleId TEXT UNIQUE,secrect TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT)`,
      (err) => {
        if (err) {
          console.error(err.message);
        }
      }
    );
  }
  async getUsers({campo,value}) {
    let queryData={
      type:campo??'',
      data:value??''
    }
    
    const sql = `SELECT * FROM ${process.env.USER_TABLE} WHERE ${queryData.type} = ?`;
    const get = promisify(this.db.get).bind(this.db);
    return await get(sql, [queryData.data]);
  }
  async updateUser({filter,campos}) {
    let queryData={
      campos:campos??{},
      filter:filter??{}
    }
    try{
      console.log(filter,campos);
      let concatCampos=Object.keys(queryData.campos).join(' = ?, ')+' = ? '
      let concatFilter=Object.keys(queryData.filter).join(' = ?, ')+' = ? '
      let query=`UPDATE ${process.env.USER_TABLE} SET ${(concatCampos)} WHERE ${(concatFilter)}`
      let run = promisify(this.db.run).bind(this.db);
      let update= await run(query,[...Object.values(queryData.campos),...Object.values(queryData.filter)])
      return {data:update??{}, message:'datos actualizados con exito'}

    }catch(error){
      console.log(error)
      return{data:{},message:"error:"+error}
    }
  }
  
}
module.exports = UsersModel;