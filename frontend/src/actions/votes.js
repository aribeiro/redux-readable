export const ADD_VOTE = "ADD_VOTE";
export const REMOVE_VOTE = "REMOVE_VOTE";

export function addVote(vote, parentType, parentId) {
  return {
    type: ADD_VOTE,
    vote,
    parentType,
    parentId
  };
}
export function removeVote(id) {
  return {
    type: REMOVE_VOTE,
    id
  };
}
