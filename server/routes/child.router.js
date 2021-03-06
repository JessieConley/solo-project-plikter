const express = require("express");
// const {rejectUnauthenticated} = require("../modules/authentication-middleware");
// const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax GET request to get child info
router.get('/:id', (req, res) => {
console.log("in server/:id GET");
const queryText = `select * from "children"
where "parent_user_id" = ${req.params.id};`;
pool.query(queryText)
.then(result => {
        res.send(result.rows);
})
.catch(error => {
    console.log('Error getting query', error);
    res.sendStatus(500);
 });
  
});

// Handles Ajax POST request to add child info to database
router.post('/addChild', (req, res, next) => {
  console.log('in router POST with', req.body);
  const childName = req.body.childName;
  const dateOfBirth = req.body.dateOfBirth;
  const parentUserId = req.body.parentUserId;
  const queryText =
    `INSERT INTO "children" ("child_name", "date_of_birth", "parent_user_id" ) VALUES ($1, $2, $3) RETURNING "child_name";`;
  pool
    .query(queryText, [childName, dateOfBirth, parentUserId])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});



module.exports = router;
