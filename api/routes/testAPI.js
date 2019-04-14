var express = require("express");
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

var num = 1  

router.get("/", function (req, res, next) {
    let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });
    //res.send("Here you go, here is some database info");
    const sql = `SELECT fen FROM puzzle WHERE id=${num}`;
    num++;
    db.get(sql, [], (err, row) => {
        if (err) {
          throw err;
        }
        console.log(row)
        console.log(num)
        res.send(row)
      });

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
});

module.exports = router;
