import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import * as API from '../ReadableAPI'

import { addPost } from '../actions/posts'
import Post from './Post'

import Comment from './Comment'

class Posts extends Component {
    componentDidMount(){
        const { dispatch } = this.props
        API.getPosts().then(data => {
            data.map(post => dispatch(addPost(post)))
        })
    }

    render () {
        return (
            <div>
                <Jumbotron>
                    <h1>Readable APP</h1> 
                </Jumbotron>
                <Link to="/posts/new">Add Post</Link>
                <ul>
                    {this.props.posts.map((post) => {
                        return <Post key={post.id} post={post}/>
                    })}
                </ul>
            </div>
        )
    }
}

export default connect((state) => ({
    posts: state.posts
}))(Posts)
