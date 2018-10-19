import React, { Component } from 'react'
import * as API from '../ReadableAPI'

function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

class CommentForm extends Component {
    addComment = () => {
        const comment = {
            id: generateId(),
            parentId: this.props.match.params.id,
            timestamp: Date.now(),
            body: this.body.value,
            author: this.author.value
        }
        API.addComment(comment)
    }

    render(){
        return (
            <div>
                <div>
                    <input
                        type="text"
                        ref={(input) => this.author = input }
                        placeholder="Author"
                    />
                </div>
                <div>
                    <textarea 
                        ref={(input) => this.body = input } />
                </div>
                <div>
                    <button onClick={this.addComment}>Add Comment</button>
                </div>
            </div>
        )
    }
}

export default CommentForm
