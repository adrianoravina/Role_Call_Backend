const { loginUser } = require("../requests/Users.Requests");
const bcrypt = require("bcrypt");

const UsersEndpoint = (app) => {
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const userData = await loginUser(email);
      
      const sqlPassword = userData.userRow.u_password;
      const typeUser = userData.userRow.type_user;

      if (password == sqlPassword) {
        console.log("YESS");

        

        switch (typeUser) {
          case "student":
            req.session.userTypeId = userData.userTypeRow.student_id;
            req.session.userType = typeUser;
            res.redirect("/studentPage");        
            break;
          case "teacher":
            req.session.userTypeId = userData.userTypeRow.teacher_id;
            req.session.userType = typeUser;
            res.redirect("/teacherPage");
            break;
          case "admin":
            req.session.userTypeId = userData.userTypeRow.admin_id;
            req.session.userType = typeUser;
            res.redirect("/");
            break;
          default:
            break;
        }
      } else {
        console.log("NOO");
        res.redirect("/loginForm");
      }
      
    } catch (error) {
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not log in :(" });
    }
  });

  app.post("/createUser", async (req, res) =>{
    try{

      const data = req.body;

      console.log(data);

    }catch(error){
      console.log("Endpoint error: " + error);
      res.status(200).json({ msg: "Could not create user :(" });
    }
  });
};

module.exports = UsersEndpoint;
