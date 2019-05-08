import { ADD_URL, REMOVE_URL, TOGGLE_URL, SET_VISIBILITY_FILTER } from './actionsTypes'

let URLId = 2

export const addURL = text => ({
    type: ADD_URL,
    id: URLId++,
    text
})

export const deleteURL = (id) => ({
    type: REMOVE_URL,
    id: id
})


export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})