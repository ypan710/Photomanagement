import React from 'react';
import {useParams} from "react-router-dom";
import apiClient from "../apiClient";

export default() => {
    const [post, setPost] = React.useState();
    // run when page loads
    React.useEffect(() => {
        apiClient.getImageById(id).then((res) => {
            setPost(res.data);
            console.log(res.data);
        })

    }, []);
    const {id} = useParams();
    return (
        <div>
            <h1>
                imagePage {id} </h1>
            {
            post ? <img src={
                `http://localhost:5500/images/${
                    post.imageUrl
                }`
            }/> : null
        } </div>
    )
}
