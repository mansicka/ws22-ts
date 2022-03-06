import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../models/models";
import { Link } from "react-router-dom";
import '../styles/styles.css'

const url:string = "https://jsonplaceholder.typicode.com/users/";

interface props {
    userId: number
}

const UserName = (props:props) => {
    const [userName, setUserName] = useState<string>('');
    const [errorMessage, setErrorMessage]: [string, (error: string) => void] = useState<string>("");

    const getUserNameForId = async () => {
        axios.get<User>(url + props.userId, {
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            setUserName(response.data.username);
        })
        .catch(e => {
        let error =
        e.response.status === 404
        ? "404: resource not found"
        : "Unexpected error";
        setErrorMessage(error);
         setUserName('')   
        });
    }
    useEffect(() => {
        getUserNameForId();    
    });

    if (errorMessage) return(<p>{errorMessage}</p>)
    else return (
      <div className="post-details">Posted by{'\u00A0'}
       <Link to={`/user/${props.userId}`}
                key={props.userId}>
           <i>{userName}</i>
       </Link>
       </div>  
    );
}
export default UserName;