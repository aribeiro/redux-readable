import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
    handleAddPostVote,
    handleDeletePostVote
} from '../actions/posts'

import Votes from './Votes'
import PostDetails from './PostDetails'

class Post extends Component {
    upVote = () => {
        const { dispatch, post } = this.props
        dispatch(handleAddPostVote(post.id))
    }

    downVote = () => {
        const { dispatch, post } = this.props
        dispatch(handleDeletePostVote(post.id))
    }

    render(){
        const { post } = this.props
        return post && (
            <div className="blog-post">
                <Votes 
                    votes={post.voteScore} 
                    upVote={this.upVote} 
                    downVote={this.downVote} />
                <div className="blog-post-content">
                    <h2 className="blog-post-title">
                        <Link
                            to={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                    </h2>
                    <PostDetails
                        author={post.author}
                        date={post.timestamp}
                        commentCount={post.commentCount}
                    />
                    <hr/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, { postId }){
    return {
        post: state.posts[postId],
    }
}
export default connect(mapStateToProps)(Post)
