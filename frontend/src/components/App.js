import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Post from './Post'
import Posts from './Posts'
import PostForm from './PostForm'
import CommentForm from './CommentForm'
import Header from './Header'
import { handleInitialData } from '../actions/shared'

class App extends Component {
    componentDidMount(){
        const { dispatch } = this.props
        dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                {this.props.loading
                    ? null
                    : ( 
                        <div className="App">
                            <div className="content">
                                <Header />
                                <Route exact path="/" component={Posts} />
                                <Route exact path="/by/:sortCode" component={Posts} />
                                <Route exact path="/posts/new" component={PostForm} />
                                <Route 
                                    exact 
                                    path="/posts/:id" 
                                    component={Post} />
                                <Route 
                                    exact 
                                    path="/posts/:id/edit" 
                                    component={PostForm} />
                                <Route 
                                    exact 
                                    path="/posts/:id/comments/new" 
                                    component={CommentForm} />
                                <Route 
                                    exact 
                                    path="/comments/:id/edit" 
                                    component={CommentForm} />
                                <Route 
                                    exact 
                                    path="/:category/by/:sortCode" 
                                    component={Posts} />
                                <Route 
                                    exact 
                                    path="/:category" 
                                    component={Posts} />
                            </div>
                        </div>
                    )
                }
            </Router>
        )
    }
}

function mapStateToProps({ loading }){ 
    return { loading }
}

export default connect(mapStateToProps)(App)
