import { combineReducers } from 'redux'
import urls from './URLReducer'
import visibilityFilter from './FilterReducer'

export default combineReducers({
  urls,
  visibilityFilter
})