const express = require("express");
// const {rejectUnauthenticated} = require("../modules/authentication-middleware");
// const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax GET request to get tasks for select dropdown
router.get('/', (req, res) => {
  console.log("in tasks router GET", req.body);
  const queryText = 'SELECT * from "tasks";';
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log("Error getting query", error);
      res.sendStatus(500);
    });
});

// Handles Ajax GET request to get tasks selected by user
router.get('/:id', (req, res) => {
  console.log("in  tasks :id router GET", req.params.id);
  const queryText = `SELECT * FROM "tasks"
JOIN "user_tasks" on "tasks"."id" = "user_tasks"."task_id"
WHERE "user_tasks"."child_id" = ${req.params.id};`;
  pool.query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log("Error getting query", error);
      res.sendStatus(500);
    });
});



//Handles Ajax POST to update task status on "user_tasks" table
router.post('/table', (req, res, next) => {
  console.log("in router POST with", req.body);
  const userId = req.body.userId;
  const childId = req.body.childId;
  const taskId = req.body.taskId;
  const taskStatus = req.body.taskStatus;
  const queryText = `INSERT INTO "user_tasks" ("user_id", "child_id", "task_id", "complete" ) VALUES ($1, $2, $3, $4);`;
  pool
    .query(queryText, [userId, childId, taskId, taskStatus])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
})


//Handles Ajax PUT to update task status on chart and user-tasks table
router.put('/update/:id', (req,res) => {
  console.log('in task PUT router with', req.body.taskStatus);
  const taskId = req.params.id;
  const taskStatus = req.body.complete;
  const queryText = `Update "user_tasks" SET "complete" = $2 WHERE id=$1;`;
  pool.query(queryText,[taskId, taskStatus])
  .then(() => {
    res.sendStatus(200);
  }).catch(error => {
    console.log('error updating task status', error);
    res.sendStatus(500);
  })
})

// Handles Ajax Delete to delete task from chart and user-tasks table
router.delete('/delete/:id', (req, res) => {
  console.log("in router.delete /:id", req.params.id);
  queryText = `DELETE FROM "user_tasks" WHERE "id" = ${req.params.id};`;
  pool.query(queryText)
  .then(() =>{
    res.sendStatus(200);
  }).catch(error => {
    console.log('error deleting task', error);
    res.sendStatus(500);
  })
});


//Use below for checking route paths for issue
// console.log(router.stack);
router.stack.forEach(function(r) {
  if (r.route && r.route.path) {
    console.log('checking paths',r.route.path);
  }
});

module.exports = router;
