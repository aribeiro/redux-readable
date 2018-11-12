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
        const { handleAddPostVote, post } = this.props
        handleAddPostVote(post.id)
    }

    downVote = () => {
        const { handleDeletePostVote, post } = this.props
        handleDeletePostVote(post.id)
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
                            to={`/${post.category}/${post.id}`}>
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
function mapDispatchToProps(dispatch){
    return { 
        handleAddPostVote(id){ 
            dispatch(handleAddPostVote(id))
        },
        handleDeletePostVote(id){
            dispatch(handleDeletePostVote(id))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)
