const { mysqlConnect } = require("../database/Connection");

const loginUser = async (email) => {
  const sql = "SELECT * FROM users where u_email = '" + email + "'";

  //return user password and user role
  const userRow = await mysqlConnect
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch(console.log);

    let sql2 = "";

    switch (userRow.type_user) {
      case "student":
         sql2 = "SELECT * FROM students where user_fk = " + userRow.user_id;      
        break;
      case "teacher":
         sql2 = "SELECT * FROM teachers where user_fk = " + userRow.user_id;
        break;
      case "admin":
         sql2 = "SELECT * FROM admins where user_fk = " + userRow.user_id;
        break;
      default:
        break;
    }

    const userTypeRow = await mysqlConnect
    .promise()
    .query(sql2)
    .then(([rows, fields]) => {
      
      return rows[0];
    })
    .catch(console.log);

  return {userRow, userTypeRow};
};


module.exports = { loginUser };
