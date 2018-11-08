import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import sortBy from 'sort-by'

import {
    handleAddPostVote,
    handleDeletePostVote,
    handleDeletePost
} from '../actions/posts'

import Comment from './Comment'
import Votes from './Votes'
import PostDetails from './PostDetails'
import Edit from './Edit'

class Post extends Component {
    upVote = () => {
        const { dispatch, post } = this.props
        dispatch(handleAddPostVote(post.id))
    }

    downVote = () => {
        const { dispatch, post } = this.props
        dispatch(handleDeletePostVote(post.id))
    }

    deletePost = () => {
        const { dispatch, post } = this.props
        dispatch(handleDeletePost(post))
        this.props.history.push('/')
    }

    render(){
        const { post, comments } = this.props
        if(post){
            return (
                <main role="main" className="container" style={{ marginTop: "20px"}}>
                    <Row>
                        <Col className="blog-main">
                            <div className="blog-post">
                                <Votes 
                                    votes={post.voteScore} 
                                    upVote={this.upVote} 
                                    downVote={this.downVote} />
                                <div className="blog-post-content">
                                    <h2 className="blog-post-title">{post.title}</h2>
                                    <PostDetails
                                        author={post.author}
                                        date={post.timestamp}
                                        commentCount={post.commentCount} 
                                        edit={
                                            <Edit
                                                editLink={`/posts/${post.id}/edit`}
                                                onDelete={this.deletePost} />
                                        }
                                    />

                                    {post.body}

                                    <hr/>

                                    <Link 
                                        style={{marginLeft: '20px'}} 
                                        to={`/posts/${post.id}/comments/new`}>
                                        ADD COMMENT
                                    </Link>
                                    {comments.map(comment => 
                                        <Comment key={comment} id={comment} />
                                    )}
                                </div>

                            </div>
                        </Col>
                    </Row>
                </main>
            )
        }else {
            return ""
        }
    }
}

function mapStateToProps(state, { match }){
    const { id } = match.params
    return {
        post: state.posts[id],
        comments: Object
                    .values(state.comments)
                    .filter(comment =>
                        comment.parentId === id && !comment.deleted)
                    .sort(sortBy('-voteScore'))
                    .map(comment => comment.id)
    }
}
export default withRouter(connect(mapStateToProps)(Post))
