import { combineReducers } from 'redux'

import posts from './posts'
import comments from './comments'
import votes from './votes'

export default combineReducers({
    posts,
    comments,
    votes,
})
