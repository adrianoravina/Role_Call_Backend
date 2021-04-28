const { loginUser } = require("../requests/Users.Requests");
const bcrypt = require("bcrypt");

const UsersEndpoint = (app) => {
  app.get("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const sqlPassword = await loginUser(email);

      const saltRounds = 12;
      const salt = bcrypt.genSaltSync(saltRounds);

      const hashedPassword = bcrypt.hashSync(password, salt);

        
    if(hashedPassword == sqlPassword){
        console.log("YESS");
    }
    else{
        console.log(hashedPassword);
        console.log("NOO");
    }

    

      res.status(200).json({ msg: "session created" });
    } catch (error) {
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not log in :(" });
    }
  });
};

module.exports = UsersEndpoint;
