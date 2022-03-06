import '../styles/styles.css'
import UserName from "./Username";
import { Post } from '../models/models';
import { Link } from 'react-router-dom';

interface props {
    post: Post
}

const SinglePostWrapper = (props:props) => (
    <div className="post-container" key={props.post.id}>
        <div><UserName userId={props.post.userId}/> </div>
        <div className="post-title">{props.post.title}</div>
        <div className="post-content">{props.post.body}</div>
            <div className="post-details">
                <Link 
                    to={`/post/${props.post.id}`}
                    key={props.post.id}
                >
                View comment thread
                </Link>
                </div> 
    </div>
)
export default SinglePostWrapper;