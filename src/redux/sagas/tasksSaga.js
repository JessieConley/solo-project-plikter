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

// { type: "FETCH_TASK_1", childId: 5 }
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
//DELETE: Delete task from active task table
function* deleteTasks(remove) {
  console.log("deleteTasks Tasks SAGA", remove.payload);
  try {
    yield axios.delete(`/tasks/delete/${remove.payload}`, remove.payload);
    yield put({ type: "FETCH_TASK_1", childId: remove.childId });
  } catch (error) {
    console.log("Error deleting", error);
  }
}

//PUT: Update task status on active chart
// { type: "CHANGE_TASK_STATUS", userTaskId: 4, childId: 8, complete: true }
// { type: "CHANGE_TASK_STATUS", payload: {userTaskId: 4, childId: 8, complete: true}}
function* updateTaskStatus(update){
  console.log('in updateTask of tasks saga', update.payload);
  try{
    yield axios.put(`tasks/update/${update.payload}`, {complete: update.complete});
    yield put({type:"FETCH_TASK_1", childId: update.childId });
  }catch(error){
    console.log('Error updating task status', error);
  }
}



// Create the rootSaga generator function
function* tasksSaga() {
    //Get tasks to display from DB in dropdown
    yield takeLatest('SET_TASK_1', getTasks);
    //Post selected tasks DB
    yield takeLatest('SET_SELECTED_TASK', postTasks);
    //Get tasks to post to active child table
    yield takeLatest('FETCH_TASK_1', getSelectedTasks);
    //Get tasks to delete from active child table
    yield takeLatest('REMOVE_TASK', deleteTasks);
    //Get tasks to delete from child table
    yield takeLatest('CHANGE_TASK_STATUS', updateTaskStatus);
 }




export default tasksSaga;