const express = require("express");
require("dotenv").config();
const { mysqlConnect } = require("./database/Connection");

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {

    const sql = "SELECT * FROM students";

    const results = await mysqlConnect.promise().query(sql)
    .then(([ rows,fields ]) => {
        
        return rows[0] ;
    }).catch(console.log);

    res.send(results);

});


  

app.listen(PORT, () => {
    
    console.log(`\x1b[36m%s\x1b[0m`, `Server is up on ${PORT}`);
    console.log(`\x1b[36m%s\x1b[0m`, `---------------------------------------`);
  });
