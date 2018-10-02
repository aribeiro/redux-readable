export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

function addComment(comment){
    return {
        type: ADD_COMMENT,
        comment
    }
}
function editComment(comment){
    return {
        type: EDIT_COMMENT,
        comment
    }
}
function deleteComment(id){
    return {
        type: DELETE_COMMENT,
        id
    }
}
