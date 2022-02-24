import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

//base url for posts
const url:string = "https://jsonplaceholder.typicode.com/posts";

//interface for a single post
interface Post {
    id: number;
    userId?: number;
    title: string;
    body: string;
}

const postsArray: Post[] = [];

const Posts = () => {
    const [posts, setPosts]: [Post[], (posts: Post[]) => void] = useState(postsArray);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
    const [errorMessage, setErrorMessage]: [string, (error: string) => void] = useState<string>("");

    //get all posts from api
    const getAllPosts = () => {
        axios.get<Post[]>(url, {
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            setPosts(response.data);
            setLoading(false);
        })
        .catch(e => {
            let error =
            e.response.status === 404
            ? "404: resource not found"
            : "Unexpected error";
            setErrorMessage(error);
            setLoading(false);
        });
    }

    useEffect(() => {
        getAllPosts();    
    }, []);

    return(
        <div>
            <div>
                <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                    </li>
                ))}
                </ul>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    )
};
export default Posts;