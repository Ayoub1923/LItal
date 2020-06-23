import { combineReducers } from 'redux'
import { getUsers } from './reducers'
const allReducers = combineReducers({
  getUsers: getUsers
})
export default allReducers;
