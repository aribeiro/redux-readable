import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as API from '../ReadableAPI'

class Post extends Component {
    state = {post: null}
    componentDidMount(){
        const { post } = this.props 
        this.setState({post})
    }

    upVote = () => {
        API.votePost(this.state.post.id, 'upVote')
            .then(post => {
                this.setState({post})
            })
    }
    downVote = () => {
        API.votePost(this.state.post.id, 'downVote')
            .then(post => {
                this.setState({post})
            })
    }

    addComment = () => {
        console.log('Add Comment Here')
    }

    render(){
        const { post } = this.state
        if(post){
            return (
                <li>
                    <h2>{post.title}</h2>
                    <h3>{post.voteScore} {post.voteScore > 1 || post.voteScore < -1 ? "Points" : "Vote"} </h3>
                    <button onClick={this.upVote}>+</button>
                    <button onClick={this.downVote}>-</button>
                    <div>{post.body}</div>
                    <h4>Author: {post.author}</h4>
                    <p>{post.commentCount} {post.commentCount > 1 ? "Comments" : "Comment"}</p>
                    <button onClick={this.addComment}>ADD COMMENT</button>
                </li>
            )
        }else{
            return <li>Loading ...</li>
        }
    }
}

export default Post
