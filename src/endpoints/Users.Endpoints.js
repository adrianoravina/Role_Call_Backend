const { loginUser } = require("../requests/Users.Requests");
const bcrypt = require("bcrypt");

const UsersEndpoint = (app) => {
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      const userRow = await loginUser(email);
      const sqlPassword = userRow.u_password;
      const typeUser = userRow.type_user;

      if (password == sqlPassword) {
        console.log("YESS");

        switch (typeUser) {
          case "student":
            res.redirect("/studentPage");        
            break;
          case "teacher":
            res.redirect("/teacherPage");
            break;
          case "admin":
            res.redirect("/");
            break;
          default:
            break;
        }
      } else {
        console.log("NOO");
        res.redirect("/loginForm");
      }
      /*
      const saltRounds = 12;
      const salt = bcrypt.genSaltSync(saltRounds);

      const hashedPassword = bcrypt.hashSync(password, salt);
      */

      //res.status(200).json({ msg: "session created" });
    } catch (error) {
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not log in :(" });
    }
  });
};

module.exports = UsersEndpoint;
