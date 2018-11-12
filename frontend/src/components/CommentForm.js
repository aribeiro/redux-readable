import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { generateId } from '../lib/utils'

import { handleAddComment } from '../actions/shared'

class CommentForm extends Component {
    state = {
        comment: null,
        parentId: null,
        author: '',
        body: ''
    }

    componentDidMount(){
        const { comment, match } = this.props
        this.setState({
            comment,
            author: comment? comment.author : "",
            parentId: comment ? comment.parentId : match.params.id,
            body: comment ? comment.body : "",
        })
    }

    updateFields = (target) => {
        this.setState({ [target.name]: target.value })
    }

    saveComment = () => {
        const { dispatch } = this.props
        const { comment, parentId, body, author } = this.state

        const newComment = {
            id: comment ? comment.id : generateId(),
            voteScore: comment ? comment.voteScore : 1,
            parentId,
            timestamp: Date.now(),
            body,
            author
        }

        dispatch(handleAddComment(newComment, comment))
        this.props.history.goBack()
    }

    render(){
        const { comment, author, body } = this.state
        return (
            <main role="main" className="container" style={{ marginTop: "20px"}}>
                <div className="row">
                    <div className="col-md-8 blog-main">
                        <Form style={{padding: "0 20px 20px 20px"}}>
                            <FormGroup>
                                <Label for="author">Author</Label>
                                <Input
                                    type="text"
                                    name="author"
                                    ref={(input) => this.author = input }
                                    placeholder="Author"
                                    value={author}
                                    onChange={(event) => this.updateFields(event.target)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="body">Body</Label>
                                <Input
                                    type="textarea"
                                    name="body"
                                    ref={(input) => this.body = input }
                                    value={body}
                                    onChange={(event) => this.updateFields(event.target)}
                                />
                            </FormGroup>
                            <div>
                                <Button
                                    onClick={this.saveComment} >
                                    {comment ? "Edit" : "Add"} Comment
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
        comment: state.comments[id]
    }
}
export default connect(mapStateToProps)(CommentForm)
