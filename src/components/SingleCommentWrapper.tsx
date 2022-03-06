import '../styles/styles.css'
import { Comment } from '../models/models';

interface props {
    comment: Comment;
}

const SingleCommentWrapper = (props:props) => (
    <div className="comment-box" key={props.comment.id}>
        <div className='comment-id'>#{props.comment.id} | posted by {props.comment.email}</div>
        <div className="comment-title">{props.comment.name}</div>
        <div className="comment-body">{props.comment.body}</div>
            <div className="post-details">
                </div> 
    </div>
)
export default SingleCommentWrapper;