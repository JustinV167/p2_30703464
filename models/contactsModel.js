const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");
class ContactsModel {
  constructor() {

    this.db = new sqlite3.Database(process.env.DB_CONTACTS, (err) => {
      if (err) {
        console.error(err.message);
        return
      }
      console.log("Conectado a la base de datos SQLite.");
    });

    
  }

  async insertContact({email, name, comment, direction, date}) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${process.env.CONTACT_TABLE} (email, name, comment, direction, date) VALUES (?, ?, ?, ?, ?)`;
      this.db.run(sql, [email, name, comment, direction, date], function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        }

        console.log(`Se ha insertado una fila con el ID ${this.lastID}`);
        resolve(this.lastID);
      });
    });
  }

  async getContact({email,id}) {
    let queryData={
      type:'id',
      data:id
    }
    if(email){
      queryData={
        type:'email',
        data:email
      }
    }
    const sql = `SELECT * FROM ${process.env.CONTACT_TABLE} WHERE ${queryData.type} = ?`;
    const get = promisify(this.db.get).bind(this.db);
    return await get(sql, [queryData.data]);
  }

  async AllContacts() {
    const sql = `SELECT * FROM ${process.env.CONTACT_TABLE}`;
    const all = promisify(this.db.all).bind(this.db);
    return await all(sql);
  }
}
module.exports = ContactsModel;