import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { generateId } from '../lib/utils'

import { handleAddPost } from '../actions/posts'

class PostForm extends Component {
    state = {
        post: null,
        categories: null,
        title: '',
        author: '',
        body: '',
        category: ''
    }

    componentDidMount(){
        const { categories, post } = this.props
        this.setState({
            categories,
            post,
            title: post ? post.title : "",
            author: post ? post.author : "",
            body: post ? post.body : "",
            category: post ? post.category : "",
        })
    }

    updateFields = (target) => {
        this.setState({ [target.name]: target.value })
    }

    savePost = () => {
        const { dispatch } = this.props
        const { post, title, author, body, category } = this.state
        const newPost = {
            id: post ? post.id : generateId(),
            voteScore: post ? post.voteScore : 1,
            timestamp: Date.now(),
            title,
            body,
            author,
            category,
        }

        dispatch(handleAddPost(newPost, post))
        this.props.history.push('/')
    }

    render(){
        const {
            categories,
            post,
            title,
            author,
            body,
            category
        } = this.state
        
        return categories && (
                <main role="main" className="container" style={{ marginTop: "20px"}}>
                    <div className="row">
                        <div className="col-md-8 blog-main">
                            <Form style={{padding: "0 20px 20px 20px"}}>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input
                                        name="title"
                                        type="text"
                                        ref={(input) => this.title = input }
                                        placeholder="Title"
                                        value={title}
                                        onChange={(event) => this.updateFields(event.target)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="author">Author</Label>
                                    <Input
                                        name="author"
                                        type="text"
                                        ref={(input) => this.author = input }
                                        placeholder="Author"
                                        value={author}
                                        onChange={(event) => this.updateFields(event.target)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="body">Body</Label>
                                    <Input
                                        type="textarea"
                                        name="body"
                                        ref={(input) => this.body = input }
                                        value={body}
                                        onChange={(event) => this.updateFields(event.target)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="category">Category</Label>
                                    <Input
                                        name="category"
                                        type="select"
                                        ref={(input) => this.category = input }
                                        value={category}
                                        onChange={(event) => this.updateFields(event.target)} >
                                        {categories.map((category) => {
                                            return <option 
                                                key={category.path} 
                                                value={category.name}>
                                                {category.name}
                                            </option>
                                        })}
                                    </Input>
                                </FormGroup>
                                <div>
                                    <Button 
                                        onClick={this.savePost}>
                                        {post ? "Edit" : "Add"} Post
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </main>
            )
    }
}

function mapStateToProps(state, { match }){
    const { id } = match.params
    return {
        post: state.posts[id],
        categories: Object.values(state.categories)
    }
}
export default withRouter(connect(mapStateToProps)(PostForm))
