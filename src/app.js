const express = require("express");
require("dotenv").config();
const { mysqlConnect } = require("./database/Connection");
const cors = require("cors");

const {
  SessionsEndpoint,
  UsersEndpoint
} = require("./endpoints");

//const iwlist = require('wireless-tools/iwlist');



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
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

app.get('/', async (req, res) => {

    const sql = "SELECT * FROM students";

    const results = await mysqlConnect.promise().query(sql)
    .then(([ rows,fields ]) => {
        
        return rows[0] ;
    }).catch(console.log);

    console.log(results);

    res.send(`<h1>Activo! con ${results.s_firstName}</h1>`);

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