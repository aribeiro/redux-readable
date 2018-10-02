import { ADD_VOTE, REMOVE_VOTE } from '../actions/votes'

export default function votes(state = [], action){
    switch(action.type){ 
        case ADD_VOTE :
            return state
        case REMOVE_VOTE :
            return state
        default:
            return state
    }
}
