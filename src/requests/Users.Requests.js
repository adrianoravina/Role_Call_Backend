const { mysqlConnect } = require("../database/Connection");

const loginUser = async (email) => {
  const sql = "SELECT u_password, type_user FROM users where u_email = '" + email + "'";

  const results = await mysqlConnect
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      console.log(rows[0])
      return rows[0];
    })
    .catch(console.log);

  return results;
};

module.exports = { loginUser };
