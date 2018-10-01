import React, { Component } from 'react'

class Post extends Component {
    render(){
        return (
            <div>
                Ola {this.props.title}
            </div>
        )
    }
}

export default Post
