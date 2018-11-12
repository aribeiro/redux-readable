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
        const { handleAddPostVote, post } = this.props
        handleAddPostVote(post.id)
    }

    downVote = () => {
        const { handleDeletePostVote, post } = this.props
        handleDeletePostVote(post.id)
    }

    deletePost = () => {
        const { handleDeletePost, post } = this.props
        handleDeletePost(post)
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
        }

        return (
            <main role="main" className="container" style={{ marginTop: "20px"}}>
                <Row>
                    <Col className="blog-main">
                        <div className="blog-post">
                            <h2>Post not found!</h2>
                        </div>
                    </Col>
                </Row>
            </main>
        )
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
function mapDispatchToProps(dispatch){
    return { 
        handleAddPostVote(id){ 
            dispatch(handleAddPostVote(id))
        },
        handleDeletePostVote(id){
            dispatch(handleDeletePostVote(id))
        },
        handleDeletePost(post){
            dispatch(handleDeletePost(post))
        },
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
