import React, { Component } from 'react'
import * as API from '../ReadableAPI'

function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

class CommentForm extends Component {
    state = { comment: null, parentId: null, isNew: false, author: '', body: '', }

    componentDidMount(){
        const { id } = this.props.match.params
        if(id){
            API.getComment(id)
                .then(comment => {
                    const isNew = comment.hasOwnProperty("error")
                    const parentId = isNew ? id : comment.parentId
                    this.setState({ comment,
                                    parentId,
                                    isNew,
                                    author: comment.author,
                                    body: comment.body })
                })
        }
    }

    updateFields = (value, target) => {
        if(target === "author"){
            this.setState({ author: value })
        } else if(target === "body"){
            this.setState({ body: value })
        }
    }

    saveComment = () => {
        const { comment, parentId, isNew , body, author } = this.state

        const newComment = {
            id: isNew ? generateId() : comment.id,
            parentId,
            timestamp: Date.now(),
            body,
            author
        }

        isNew
            ? API.addComment(newComment)
            : API.updateComment(comment.id, newComment)

        this.props.history.push('/')
    }

    render(){
        const { comment, isNew, author, body } = this.state
        return (
            <div>
                <div>
                    <input
                        type="text"
                        ref={(input) => this.author = input }
                        placeholder="Author"
                        value={ comment ? author : '' }
                        onChange={(event) => this.updateFields(event.target.value, "author")}
                    />
                </div>
                <div>
                    <textarea
                        ref={(input) => this.body = input }
                        value={ comment ? body : "" }
                        onChange={(event) => this.updateFields(event.target.value, "body")}
                    />
                </div>
                <div>
                    <button onClick={this.saveComment}>{isNew ? "Add" : "Edit"} Comment</button>
                </div>
            </div>
        )
    }
}

export default CommentForm
