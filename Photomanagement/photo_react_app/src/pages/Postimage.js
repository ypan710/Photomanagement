import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import apiClient from '../apiClient';
// import "../main.css";

const Postimage = ({appUser, setAppUser}) => {
    const [post_title, setPostTitle] = React.useState('');
    const [post_description, setPostDescription] = React.useState('');

    const [imageSrc, setImageSrc] = React.useState();
    const [fileInfo, setFileInfo] = React.useState();

    // Define function to run when the input receives a file
    function handleFileInput(e) {
        console.log("File Changed");

        // Saves the info about the file
        setFileInfo(e.target.files[0]);

        // create the url path for image to display in chrome
        const src = URL.createObjectURL(e.target.files[0]);
        setImageSrc(src);
    }

    // upload the image
    function uploadImage() {
        console.log("Upload started...");

        // Initialize the form data object that will be sent to the server
        const formData = new FormData();

        // Append the file info to the form, under the name "newImage" (what we are looking for on the backend)
        formData.append("newImage", fileInfo);
        formData.append("postTitle", post_title);
        formData.append("postDescription", post_description);

        // Post the image
        apiClient.postimage(formData);
    }
    if (!appUser) {
        return <Redirect to="/login"/>
    }


    return (
        <div>
            <div className="box">
                <h1>Postimage Form</h1>
                <p>Post Title:
                    <input className="username" type="text"
                        value={post_title}
                        onChange=
                        {e => setPostTitle(e.target.value)}/></p>
                <p>Post Description:
                    <input className="username" type="text"
                        value={post_description}
                        onChange=
                        {e => setPostDescription(e.target.value)}/>
                </p>
                <p>Attach an image:</p>
                <p><input onChange={handleFileInput}
                        type="file"
                        id="fileupload"
                        accept="image/jpeg, image/gif, image/png"/></p>
                <p><input type="checkbox" className="accept" value="agreement"/>I accept
                    <a href="url">Acceptable Use Policy</a>
                    for uploading images.
                </p>
                <img src={imageSrc}/>
                <button onClick={uploadImage}
                    type="submit"
                    disabled={
                        !post_title || !post_description
                }>Submit
                </button>
            </div>
        </div>
    );
};


export default Postimage;
