import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
// import { Router } from "express";


//Get all default tasks to display in select dropdown 
function* getTasks() {
  console.log('in tasksSaga');
  try {
    const response = yield axios.get(`/tasks`);
    console.log("in  getTasks saga with", response);
    yield put({ type: "SET_TASK", payload: response.data });
  } catch (error) {
    console.log(error);
  }
} 

function* getSelectedTasks(action) {
  console.log("getSelectedTasks from task saga", action);
  try {
    const response = yield axios.get(`/tasks/${action.childId}`);
    console.log("in saga with", response.data);
    yield put({ type: "FETCH_TASK", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}
// Post selected tasks from dropdown to child's task table in DB
function* postTasks(action){
  console.log('postTasks SAGA', action.payload);
  try{
    yield axios.post('/tasks/table', action.payload)
    yield put({type:"FETCH_TASK_1", childId: action.payload.childId})
  }catch (error) {
    console.log('Table post request failed', error)
  }
}

function* deleteTasks(remove) {
  console.log("deleteTasks Tasks SAGA", remove.payload);
  try {
    yield axios.delete(`/tasks/${remove.payload}`);
    yield put({ type: "FETCH_TASK_1"});
  } catch (error) {
    console.log("Error deleting", error);
  }
}
// // Update task status on chart and user-tasks table
// function* updateTaskStatus(update){
//   console.log('in updateTaskStatus', update.payload);
//   try{
//     yield axios.put(`/tasks/'${}`)
//     ({type:"SET_TASK_1" })
//   }
// }


//Allow deletion of task from child's task table



// Create the rootSaga generator function
function* tasksSaga() {
    //Get tasks to display in dropdown
    yield takeLatest('SET_TASK_1', getTasks);
     //Post selected tasks to user_table
    yield takeLatest('SET_SELECTED_TASK', postTasks);
    //Get tasks to post to child table
    yield takeLatest('FETCH_TASK_1', getSelectedTasks);
    //Get tasks to delete from child table
    yield takeLatest('REMOVE_TASK', deleteTasks);
 }




export default tasksSaga;