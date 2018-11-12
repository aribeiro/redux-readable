import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Badge, Row, Col } from 'reactstrap'
import { formatDate } from '../lib/utils'

import {
    handleAddCommentVote,
    handleDeleteCommentVote
} from '../actions/comments'
import {
    handleDeleteComment
} from '../actions/shared'

import Votes from './Votes'
import Edit from './Edit'

class Comment extends Component {
    upVote = () => {
        const { comment, handleAddCommentVote } = this.props
        handleAddCommentVote(comment.id)
    }

    downVote = () => {
        const { comment, handleDeleteCommentVote } = this.props
        handleDeleteCommentVote(comment.id)
    }

    deleteComment = () => {
        const { comment, handleDeleteComment } = this.props
        handleDeleteComment(comment)
    }

    render(){
        const { comment } = this.props
        return comment && (
                <div>
                    <Votes
                        votes={comment.voteScore}
                        upVote={this.upVote}
                        downVote={this.downVote} />
                    <div style={{
                        background: "#e9ecef",
                        padding: "10px",
                        margin: "10px 0",
                        borderRadius: "5px" }}>
                        <p className="blog-post-meta">
                            {formatDate(comment.timestamp)} by <a>{comment.author}</a>
                            <Edit
                                editLink={`/comments/${comment.id}/edit`}
                                onDelete={this.deleteComment} />
                        </p>
                        <p>{comment.body}</p>

                    </div>
                </div>
            )
    }
}

function mapStateToProps({ comments }, { id }){
    return {
        comment: comments[id]
    }
}
function mapDispatchToProps(dispatch){
    return { 
        handleAddCommentVote(id){ 
            dispatch(handleAddCommentVote(id))
        },
        handleDeleteCommentVote(id){
            dispatch(handleDeleteCommentVote(id))
        },
        handleDeleteComment(comment){
            dispatch(handleDeleteComment(comment))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
