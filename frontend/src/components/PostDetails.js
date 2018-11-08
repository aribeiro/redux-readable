import React, { Fragment } from 'react'
import { Badge } from 'reactstrap'
import { formatDate } from '../lib/utils'

export default function PostDetails({ author, date, commentCount, edit }){
    return (
        <Fragment>
            <p className="blog-post-meta">
                {formatDate(date)} by <a>{author}</a>
                &nbsp;&nbsp;
                <Badge color="success" pill >
                    {commentCount} 
                    {commentCount > 1 
                            ? " Comments" 
                            : " Comment"}
                </Badge>
                {edit}
            </p>
        </Fragment>
    )
}
