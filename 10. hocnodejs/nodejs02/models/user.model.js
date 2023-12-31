//Tư duy model
/*
Mỗi model tương ứng 1 table
Trong 1 controller có thể có nhiều model
*/
const sql = require("../utils/db");
module.exports = {
  all: (status, keyword) => {
    let filter = sql`WHERE name IS NOT NULL`;

    if (status !== undefined) {
      filter = sql`${filter} AND status = ${status}`;
    }
    if (keyword?.length) {
      filter = sql`${filter} AND (LOWER(name) LIKE ${
        "%" + keyword + "%"
      } OR LOWER(email) LIKE ${"%" + keyword + "%"})`;
    }

    return sql`SELECT * FROM users ${filter} ORDER BY created_at DESC`;
  },
  emailUnique: async (email) => {
    const result = await sql`SELECT id FROM users WHERE email=${email}`;
    return result.length ? false : true;
    //Nếu email tồn tại -> false - Ngược lại true
  },
};
