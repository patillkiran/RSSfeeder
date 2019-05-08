// if you want to show initial data :)
// const INITIAL_DATA =  [
//     {
//         id: 0,
//         text: 'Walk the Dog',
//     },
//     {
//         id:1,
//         text: 'learn Redux',
//
//     },
// ]

import { ADD_URL, REMOVE_URL, TOGGLE_URL} from '../actions/actionsTypes'

const INITIAL_DATA = []


const URLReducer = (state = INITIAL_DATA, action) => {
    switch (action.type){
        case ADD_URL:
        return [{
                id: action.id,
                text: action.text
            },...state
        ]
		case REMOVE_URL:
        const numIndex = parseInt(action.id)
		return state.filter(urls => urls.id !== numIndex);
        default:
        return state
    }
}

export default URLReducer