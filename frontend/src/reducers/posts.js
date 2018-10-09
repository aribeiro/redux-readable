import { ADD_POST, EDIT_POST, REMOVE_POST } from '../actions/posts'

export default function posts(state = [], action){
    switch(action.type){ 
        case ADD_POST :
            return state.concat([action.post])
        case EDIT_POST :
            return state
        case REMOVE_POST :
            return state
        default:
            return state
    }
}
