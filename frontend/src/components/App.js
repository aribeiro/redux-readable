import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Posts from './Posts'
import PostForm from './PostForm'

class App extends Component {

    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    <Posts />
                )} />
                <Route exact path="/posts/new" render={() => (
                    <PostForm /> 
                )} />
            </div>
        )
    }
}
export default App
