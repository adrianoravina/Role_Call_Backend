const { mysqlConnect } = require("../database/Connection");

const loginUser = async (email) => {
  const sql = "SELECT u_password FROM users where u_email = '" + email + "'";

  const results = await mysqlConnect
    .promise()
    .query(sql)
    .then(([rows, fields]) => {
      return rows[0].u_password;
    })
    .catch(console.log);

  return results;
};

module.exports = { loginUser };
