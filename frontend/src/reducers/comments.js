import {
    RECEIVE_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_COMMENT_VOTE,
    DELETE_COMMENT_VOTE,
} from '../actions/comments'
import { DELETE_POST } from '../actions/posts'

export default function comments(state = {}, action){
    switch(action.type){ 
        case RECEIVE_COMMENTS :
            return {...state, ...action.comments }
        case ADD_COMMENT :
            return { 
                    ...state,
                    [action.comment.id]: action.comment 
                }
        
        case DELETE_COMMENT :
            return { 
                    ...state,
                    [action.id]: {
                    ...state[action.id], 
                    deleted: true } 
                }
        
        case DELETE_POST :
            return { 
                    ...state,
                    [action.id]: {
                    ...state[action.id], 
                    parentDeleted: true } 
                }
        
        case ADD_COMMENT_VOTE :
            return { 
                    ...state,
                    [action.id]: {
                    ...state[action.id], 
                    voteScore: state[action.id].voteScore + 1 } 
                }
        
        case DELETE_COMMENT_VOTE :
            return { 
                    ...state,
                    [action.id]: {
                    ...state[action.id], 
                    voteScore: state[action.id].voteScore - 1 } 
                }
        
        default:
            return state
    }
}
