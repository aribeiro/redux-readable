import React, { Component } from 'react'
import * as API from '../ReadableAPI'

class Comment extends Component {
    state = { comment: null, comments: [] }

    componentDidMount(){ 
        const { comment } = this.props
        this.setState({comment})
    }

    upVote = () => {
        API.voteComment(this.state.comment.id, 'upVote')
            .then(comment => {
                this.setState({comment})
            })
    }

    downVote = () => {
        API.voteComment(this.state.comment.id, 'downVote')
            .then(comment => {
                this.setState({comment})
            })
    }

    render(){
        const { comment } = this.state
        if(comment){
            return (
                <div>
                    <h5>{comment.author} at {comment.timestamp}</h5>
                    <span>{comment.voteScore}</span>
                    <button onClick={this.upVote}>+</button>
                    <button onClick={this.downVote}>-</button>
                    <p>{comment.body}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                    
                </div>
            )
        }else{
            return <li>Loading ...</li>
        }
    }
}

export default Comment
