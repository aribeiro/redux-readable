import {
    RECEIVE_POSTS,
    ADD_POST,
    DELETE_POST,
    ADD_POST_VOTE,
    DELETE_POST_VOTE,
    UPDATE_POST_COMMENT_COUNT
} from '../actions/posts'

export default function posts(state = {}, action){
    switch(action.type){
        case RECEIVE_POSTS :
            return {...state, ...action.posts }
        case ADD_POST :
            return {
                ...state,
                [action.post.id]: action.post
            }
        case DELETE_POST :
            return {
                    ...state,
                    [action.id]: {
                    ...state[action.id],
                    deleted: true }
                }
        
        case ADD_POST_VOTE :
            return {
                    ...state,
                    [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore + 1 }
                }

        case DELETE_POST_VOTE :
            return {
                    ...state,
                    [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore - 1 }
                }
        case UPDATE_POST_COMMENT_COUNT :
            return {
                    ...state,
                    [action.id]: {
                    ...state[action.id],
                    commentCount: state[action.id].commentCount + action.value }
                }

        default:
            return state
    }
}
