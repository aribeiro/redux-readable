import * as API from '../ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

export const ADD_POST_VOTE = 'ADD_POST_VOTE'
export const DELETE_POST_VOTE = 'DELETE_POST_VOTE'

export function receivePosts(posts){
    return {
        type: RECEIVE_POSTS,
        posts
    }
}
export function addPost(post){
    return {
        type: ADD_POST,
        post
    }
}

export function deletePost(id){
    return {
        type: DELETE_POST,
        id
    }
}

export function addPostVote(id){
    return {
        type: ADD_POST_VOTE,
        id
    }
}
export function deletePostVote(id){
    return {
        type: DELETE_POST_VOTE,
        id
    }
}

export function handleAddPost(post, oldPost){
    return (dispatch) => {
        dispatch(addPost(post))
        if(oldPost){
            API.updatePost(post.id, post)
                .then()
                .catch(err => {
                    dispatch(addPost(oldPost))
                    console.log(err)
                    alert('Add Post has failure! Try again!')
                })
        } else {
            API.addPost(post)
                .then()
                .catch(err => {
                    dispatch(deletePost(post.id))
                    console.log(err)
                    alert('Add Post has failure! Try again!')
                })
        }
    }
}

export function handleAddPostVote(id){
    return (dispatch) => {
        dispatch(addPostVote(id))
        API.votePost(id, 'upVote')
            .then()
            .catch(err => {
                dispatch(deletePostVote(id))
                console.log(err)
                alert('Up Vote Posts has failure! Try again!')
             })
    }
}

export function handleDeletePostVote(id){
    return (dispatch) => {
        dispatch(deletePostVote(id))
        API.votePost(id, 'downVote')
            .then()
            .catch(err => {
                dispatch(addPostVote(id))
                console.log(err)
                alert('Down Vote Posts has failure! Try again!')
             })
    }
}

export function handleDeletePost(post){
    return (dispatch) => {
        dispatch(deletePost(post.id))
        API.deletePost(post.id)
            .then()
            .catch(err => {
                dispatch(addPost(post))
                console.log(err)
                alert('Delete Post has failure! Try again!')
             })
    }
}
