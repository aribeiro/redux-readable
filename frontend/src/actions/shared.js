import { receivePosts, updatePostCommentCount } from './posts'
import { receiveComments, addComment, deleteComment } from './comments'
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

export function handleAddComment(comment, oldComment){
    return (dispatch) => {
        if(oldComment){  
            dispatch(addComment(comment))
            API.updateComment(comment.id, comment)
                .then()
                .catch(err => { 
                    dispatch(addComment(oldComment)) 
                    console.log(err)
                    alert('Update comment fail! Try again!')
                })
        } else {
            dispatch(addComment(comment))
            dispatch(updatePostCommentCount(comment.parentId, 1)) 
            API.addComment(comment)
                .then()
                .catch(err => { 
                    dispatch(deleteComment(comment.id)) 
                    dispatch(updatePostCommentCount(comment.parentId, -1)) 
                    console.log(err)
                    alert('Add comment fail! Try again!')
                })
        }
    }
}
export function handleDeleteComment(comment){
    return (dispatch) => {
        dispatch(deleteComment(comment.id))
        dispatch(updatePostCommentCount(comment.parentId, -1)) 
        API.deleteComment(comment.id)
            .then()
            .catch(err => { 
                dispatch(addComment(comment)) 
                dispatch(updatePostCommentCount(comment.parentId, 1)) 
                console.log(err)
                alert('Delete comment fail! Try again!')
            })
    }

}
