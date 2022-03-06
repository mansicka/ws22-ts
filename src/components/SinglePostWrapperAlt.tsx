import '../styles/styles.css'
import UserName from "./Username";
import { Post } from '../models/models';

interface props {
    post: Post;
}

const SinglePostWrapperAlt = (props:props) => (
    <div className="post-container" key={props.post.id}>
        <UserName userId={props.post.userId}/> 
        <div className="post-title">{props.post.title}</div>
        <div className="post-content">{props.post.body}</div>
            <div className="post-details">
                </div> 
    </div>
)
export default SinglePostWrapperAlt;