import React from 'react';
import {Link} from "react-router-dom";

export default function ImageCard({postTitle, postDescription, imageUrl, _id}) {
    return (
        <div>
            <h3>{postTitle}</h3>
            <h3>{postDescription}</h3>
            <Link to={
                `/imagePage/${_id}`
            }>
                Click me!
            </Link>
            <img src={
                `http://localhost:5500/images/${imageUrl}`
            }/>
        </div>
    )
}
