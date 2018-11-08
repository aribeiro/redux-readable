import { combineReducers } from 'redux'

import posts from './posts'
import categories from './categories'
import comments from './comments'
import votes from './votes'
import loading from './shared'

export default combineReducers({
    categories,
    posts,
    comments,
    votes,
    loading
})
