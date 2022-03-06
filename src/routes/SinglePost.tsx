import React from "react";
import axios from "axios";
import { Comment, Post } from "../models/models";
import SinglePostWrapperAlt from "../components/SinglePostWrapperAlt";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleCommentWrapper from "../components/SingleCommentWrapper";

const url:string = "https://jsonplaceholder.typicode.com";
const SinglePost = () => {
    
    const commentsArray: Comment[] = [];
    const postId = useParams();
    const [comments, setComments]: [Comment[], (comments: Comment[]) => void] = useState(commentsArray);
    const [errorMessage, setErrorMessage]: [string, (error: string) => void] = useState<string>("");
    const initPost: Post = {id: 1, userId: 1, title: '', body: ''}
    const [singlePost, setSinglePost] = useState<Post>(initPost);

    const getAllComments = () => {
        axios.get<Comment[]>(url + `/comments?postId=${postId.postId}`, {
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            setComments(response.data);
        })
        .catch(e => {
            let error =
            e.response.status === 404
            ? "404: resource not found"
            : "Unexpected error";
            setErrorMessage(error);
        });
    }

    const getSinglePost = () => {
        axios.get<Post>(url + `/posts/${postId.postId}`, {
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            setSinglePost(response.data);
        })
        .catch(e => {
            let error =
            e.response.status === 404
            ? "404: resource not found"
            : "Unexpected error";
            setErrorMessage(error);
        });
    }

    useEffect(() => {
        getSinglePost();
        getAllComments();    
    });

    if (errorMessage) return(<p>{errorMessage}</p>)
    else return(
    <div>
        <div className="page-title">Comments</div>
        <SinglePostWrapperAlt post={singlePost} />
        <div className="comment-container">
            {comments.map((singleComment) => (
                <SingleCommentWrapper comment={singleComment} key={singleComment.id}/>
            ))}
            </div>
    </div>

    )
}
export default SinglePost;