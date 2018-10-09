import React, { Component } from 'react'

class Post extends Component {
    render(){
        return (
            <li>
                <h2>{this.props.title}</h2>
            </li>
        )
    }
}

export default Post
