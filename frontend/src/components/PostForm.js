import React, { Component } from 'react'
import * as API from '../ReadableAPI'

function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

class PostForm extends Component {
    state = { categories: null }

    componentDidMount(){
        API.getCategories().then((categories) => {
            console.log(categories)
            this.setState({ categories })
        })
    }
    
    addPost = () => { 
        const post = {
            id: generateId(), 
            timestamp: Date.now(),
            title: this.title.value,
            body: this.body.value,
            author: this.author.value,
            category: this.category.value,
            voteScore: 0,
            deleted: false
        }
        API.addPost(post).then(data => console.log(data))
    }

    render(){
        const { categories } = this.state
        if (categories){
            return (
                <div>
                    <div>
                        <input
                            type="text"
                            ref={(input) => this.title = input }
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            ref={(input) => this.author = input }
                            placeholder="Author"
                        />
                    </div>
                    <div>
                        <textarea 
                            ref={(input) => this.body = input } />
                    </div>
                    <div>
                        <select ref={(input) => this.category = input }>
                            {categories.map((category) => {
                                return <option value={category.name} >{category.name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <button onClick={this.addPost}>Add Post</button>
                    </div>
                </div>
        )
        }else{ return <div>Loading ...</div>}
    }
}

export default PostForm
