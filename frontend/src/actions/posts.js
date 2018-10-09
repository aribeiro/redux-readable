export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

export function addPost(post){
    return {
        type: ADD_POST,
        post
    }
}
function editPost(post){
    return {
        type: EDIT_POST,
        post
    }
}
function removePost(id){
    return {
        type: REMOVE_POST,
        id
    }
}
