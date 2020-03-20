import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* getChildren(action) {
  console.log("saga coming from userSaga with:", action);
  try {
    const response = yield axios.get(`/child/${action.parentId}`);
    console.log('in saga with', response.data);
    yield put({ type: "SET_CHILD", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* addChild(action) {
  try {
    // passes the child_name and date_of_birth from the payload to the server
    yield axios.post("/child/addChild", action.payload);
    // yield put({type: "FETCH_CHILD", payload: action.payload});
  } catch (error) {
    console.log("Error with adding child to account:", error);
    yield put({ type: "ADDING_CHILD_FAILED" });
  }
}

// Handles Ajax request to get child info
// router.get('/:id', (req, res) => {
// console.log("in server/:id GET");
// const queryText = `select * from "children"
// where "parent_user_id" = ${req.params.id};`;
// pool.query(queryText)
// .then(result => {
//         res.send(result.rows);
// })
// .catch(error => {
//     console.log('Error getting query', error);
//     res.sendStatus(500);
//  });
  
// });

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeEvery('FETCH_CHILD', addChild);
  yield takeLatest('SET_CHILD_1', getChildren);
}



export default userSaga;
