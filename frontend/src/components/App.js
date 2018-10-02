import React, { Component } from 'react'
import { Jumbotron, Row } from 'reactstrap'

import Post from './Post'

class App extends Component {
    state = {
        posts: [
            {title: 'First Post'},
            {title: 'Second Post'},
            {title: 'Third Post'},
        ]
    }

    render() {
        return (
            <div className="App">
                <Jumbotron>
                    <h1>Readable APP</h1> 
                </Jumbotron>
                <Row>
                    {this.state.posts.map((post) => {
                        return <Post title={post.title} />
                    })}
                </Row>
            </div>
        );
    }
}

export default App;
