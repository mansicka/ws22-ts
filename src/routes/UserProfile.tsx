import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post, User } from "../models/models";
import { useParams } from "react-router-dom";
import SinglePostWrapper from "../components/SinglePostWrapper";
const url:string = "https://jsonplaceholder.typicode.com/";



const UserProfile = () => {
    const initUserData:User = {
        "id": 1,
        "name": "",
        "username": "",
        "email": "",
        "address": {
          "street": "",
          "suite": "",
          "city": "",
          "zipcode": "",
          "geo": {
            "lat": "",
            "lng": ""
          }
        },
        "phone": "",
        "website": "",
        "company": {
          "name": "",
          "catchPhrase": "",
          "bs": ""
        }
      }
    const userId = useParams();
    const [userData, setUserData] = useState<User>(initUserData);
    const [errorMessage, setErrorMessage]: [string, (error: string) => void] = useState<string>("");
    const postsArray: Post[] = [];
    const [posts, setPosts]: [Post[], (posts: Post[]) => void] = useState(postsArray);
    
    const getAllPosts = async () => {
        axios.get<Post[]>(url + `users/${userId.userId}/posts`, {
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
    
    const getUserInfo = () => {
        axios.get<User>(url +`users/${userId.userId}`,   {
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            setUserData(response.data);
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
        getUserInfo();    
        getAllPosts();
    },);

    if (errorMessage) return (<p>{errorMessage}</p>)
    else return (
    <div>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="page-title">user profile</div>
        <div className="post-container">
            <div className="userprofile-title">USER INFORMATION</div>
            <div className="userprofile-subtitle">User id: <span className="userprofile-body">{userData.id}</span></div>
            <div className="userprofile-subtitle">Username: <span className="userprofile-body">{userData.username}</span></div>
            <div className="userprofile-subtitle">Name: <span className="userprofile-body">{userData.name}</span></div>
            <div className="userprofile-subtitle">Email: <span className="userprofile-body">{userData.email}</span></div>
            <div className="userprofile-subtitle">Phone: <span className="userprofile-body">{userData.phone}</span></div>
            <div className="userprofile-subtitle">WWW: <span className="userprofile-body">{userData.website}</span></div>
        </div>
        <div className="post-container">
        <div className="userprofile-title">All posts by user {userData.username}</div>
        {posts.map((singlePost) => (
                <SinglePostWrapper post={singlePost} key={singlePost.id}/>
            ))}
            
        </div>
    </div>
    )
}
export default UserProfile;