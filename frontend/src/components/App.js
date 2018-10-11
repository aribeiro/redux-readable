import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Row } from 'reactstrap'
import * as API from '../ReadableAPI'

import { addPost } from '../actions/posts'
import Post from './Post'

class App extends Component {
    componentDidMount(){
        const { dispatch } = this.props
        API.getPosts().then(data => {
            data.map(post => dispatch(addPost(post)))
        })
    }

    render() {
        return (
            <div className="App">
                <Jumbotron>
                    <h1>Readable APP</h1> 
                </Jumbotron>
                <ul>
                    {this.props.posts.map((post) => {
                        return <Post key={post.id} post={post}/>
                    })}
                </ul>
            </div>
        );
    }
}

export default connect((state) => ({
    posts: state.posts
}))(App)
