import { receivePosts } from './posts'
import { receiveComments } from './comments'
import { receiveCategories } from './categories'
import * as API from '../ReadableAPI'

export const UPDATE_LOADING = "UPDATE_LOADING"

export function updateLoading(loading){
    return { 
        type: UPDATE_LOADING,
        loading
    }
}

export function handleInitialData(){
    return (dispatch) => {
        API.getCategories().then(data => {
            dispatch(receiveCategories(data))
        })
        
        API.getPosts().then(data => {
            const posts = data.reduce((posts, post) => ({...posts, [post.id]: post}), {})
            dispatch(receivePosts(posts))
            Object.keys(posts).forEach(post => {
                API.getPostComments(post)
                    .then(data => {
                        const comments = data.reduce((comments, comment) => ({...comments, [comment.id]: comment}), {})
                        dispatch(receiveComments(comments))
                }).then(() => dispatch(updateLoading(false)))
            })
        })
        
    }
}
