import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

function Votes({ votes, upVote, downVote }){
        return (
            <div className="votes">
                <div 
                    className="text-center" 
                    style={{ 
                        marginTop: "-8px", 
                        marginBottom: "-14px" 
                    }}>
                    <FontAwesomeIcon 
                        icon={faCaretUp} 
                        size="2x" 
                        onClick={upVote} />
                </div>
                <div className="text-center">
                    {votes}
                </div>
                <div 
                    className="text-center" 
                    style={{ 
                        marginTop: "-14px" 
                    }}>
                    <FontAwesomeIcon 
                        icon={faCaretDown} 
                        size="2x" 
                        onClick={downVote} />
                </div>
            </div>
        )
}
export default Votes
