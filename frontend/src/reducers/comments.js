import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/comments'

export default function comments(state = [], action){
    switch(action.type){ 
        case ADD_COMMENT :
            return state.contact([action.comment])
        case EDIT_COMMENT :
            return state
        case DELETE_COMMENT :
            return state
        default:
            return state
    }
}
