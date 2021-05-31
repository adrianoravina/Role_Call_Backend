const express = require("express");
const session = require("express-session");
const path = require("path");


require("dotenv").config();
const { mysqlConnect } = require("./database/Connection");
const cors = require("cors");

const { SessionsEndpoint, UsersEndpoint } = require("./endpoints");

const { authUser, loggedInUser } = require("./authentication/basicAuth.js");

//const iwlist = require('wireless-tools/iwlist');
const app = express();

//view engine
app.set('view engine', 'ejs');
app.use(express.static("public"));
//app.use(express.static(__dirname + '../public'));
// Require static assets from public folder
//app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, '../views'));
//app.set('views', __dirname + '.././views');
//app.set('views', { root: path.join(__dirname, "../views") });


app.use(
  session({
    name: "role",
    resave: false,
    saveUninitialized: false,
    secret: "its,a,secret",
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
      secure: false,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();
const PORT = process.env.PORT || 5000;



// Set view engine as EJS
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

app.use("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.options("*", cors());
/*
router.get('/', homeController.checkLogin);
router.post('/login', homeController.Login);
router.post('/signup', homeController.SignUp);
*/
app.get("/", authUser, async (req, res) => {
  //res.sendFile(`<h1>Activo! con ${results.s_firstName}</h1>`);
  res.sendFile("loginForm.html", { root: path.join(__dirname, "./../views") });
});

app.get("/loginForm", loggedInUser, async (req, res) => {
  res.sendFile("loginForm.html", { root: path.join(__dirname, "./../views") });
});

app.get("/teacherPage", authUser, async (req, res) => {
  switch (req.session.userType) {
    case "student":
      res.render("/studentPage");
      break;
    case "admin":
      res.redirect("/userForm");
      break;
  }

  res.sendFile("teacherPage.html", { root: path.join(__dirname, "../views") });
});

app.get("/studentPage", authUser, async (req, res) => {
  switch (req.session.userType) {
    case "teacher": 
      res.redirect("/teacherPage");  
      break;
    case "admin":
      res.redirect("/userForm");
      break;
  }

  
  res.render('studentPage', {correctCode : "null"}) 
  //res.sendFile("studentPage.html", { root: path.join(__dirname, "../views") });
});

app.get("/userForm", async (req, res) => {
  res.sendFile("userForm.html", { root: path.join(__dirname, "../views") });
});



/**
 app.get('/wifi', async (req, res) => {

      iwlist.scan('wlan0', () => {

      }).then((networks, fields) =>{
        console.log(networks);
          return networks;
      }).catch(console.log);
       
      iwlist.scan({ iface : 'wlan0', show_hidden : true }, function(err, networks) {
        console.log(networks);
      });

    res.send(`<h1>You're in the WiFi page!</h1>`);

});
 */

app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `Server is up on ${PORT}`);
  console.log(`\x1b[36m%s\x1b[0m`, `---------------------------------------`);
});

SessionsEndpoint(app);
UsersEndpoint(app);
