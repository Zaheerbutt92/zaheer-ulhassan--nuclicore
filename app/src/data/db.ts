import * as sqlite from "sqlite3";

const sqlite3 = sqlite.verbose();
const dbName = "formbuilder.db";

const db = new sqlite3.Database(dbName, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  } else {
    const createFormsTable = `CREATE TABLE IF NOT EXISTS Forms (
      id text,
      formName text,
      formData text,
      date date
   );`;

    db.run(createFormsTable, (error) => {
      if (error) {
        console.error(error.message);
        throw error;
      }
    });
  }
});

export default db;
