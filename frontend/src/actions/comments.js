import * as API from '../ReadableAPI'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_COMMENT_VOTE = 'ADD_COMMENT_VOTE'
export const DELETE_COMMENT_VOTE = 'DELTE_COMMENT_VOTE'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function receiveComments(comments){
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export function addComment(comment){
    return {
        type: ADD_COMMENT,
        comment
    }
}
export function deleteComment(id){
    return {
        type: DELETE_COMMENT,
        id
    }
}

export function addCommentVote(id){
    return {
        type: ADD_COMMENT_VOTE,
        id
    }
}
export function deleteCommentVote(id){
    return {
        type: DELETE_COMMENT_VOTE,
        id
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
            API.addComment(comment)
                .then()
                .catch(err => { 
                    dispatch(deleteComment(comment.id)) 
                    console.log(err)
                    alert('Add comment fail! Try again!')
                })
        }
    }
}
export function handleDeleteComment(comment){
    return (dispatch) => {
        dispatch(deleteComment(comment.id))
        API.deleteComment(comment.id)
            .then()
            .catch(err => { 
                dispatch(addComment(comment)) 
                console.log(err)
                alert('Delete comment fail! Try again!')
            })
    }

}
export function handleAddCommentVote(id){
    return (dispatch) => {
        dispatch(addCommentVote(id))
        API.voteComment(id, 'upVote')
            .then()
            .catch(err => { 
                dispatch(deleteCommentVote(id))
                console.log(err)
                alert('Delete comment vote fail! Try again!')
            })
    }

}
export function handleDeleteCommentVote(id){
    return (dispatch) => {
        dispatch(deleteCommentVote(id))
        API.voteComment(id, 'downVote')
            .then()
            .catch(err => { 
                dispatch(addCommentVote(id))
                console.log(err)
                alert('Delete comment vote fail! Try again!')
            })
    }
}
