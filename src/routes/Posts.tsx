import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../models/models";
import SinglePostWrapper from "../components/SinglePostWrapper";

const url:string = "https://jsonplaceholder.typicode.com/posts";

const Posts = () => {
    const postsArray: Post[] = [];
    const [posts, setPosts]: [Post[], (posts: Post[]) => void] = useState(postsArray);
    const [errorMessage, setErrorMessage]: [string, (error: string) => void] = useState<string>("");
    
    //get all posts from api
    const getAllPosts = async () => {
        axios.get<Post[]>(url, {
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            setPosts(response.data);
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
        getAllPosts();    
    }, []);

    if (errorMessage) return(<p>{errorMessage}</p>)
    else return(
        <div>
            <div className="page-title">Posts</div>
            {posts.map((singlePost) => (
                <SinglePostWrapper post={singlePost} key={singlePost.id}/>
            ))}
        </div>
    )
};
export default Posts;