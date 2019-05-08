import { createStore } from "redux";
import MainReducer from './reducers/MainReducer'

function configureStore(state = { }) {
  return createStore(MainReducer,state);
}

export default configureStore;