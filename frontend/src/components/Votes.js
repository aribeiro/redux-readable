import React, { Component } from 'react'

class Votes extends Component {
    state = { votes: this.props.votes}
    
    addVote = () => {
       this.setState(votes: votes + 1) 
    }

    render(){
        const { votes } = this.props
        return (
            <div onClick={(event) => this.addVote()}>
                {`${votes} {votes < 1 ? "vote" : "votes"}`}
            </div>
        )
    }
}

export default connect({store.votes})(Votes)
