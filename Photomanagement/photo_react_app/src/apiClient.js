// make resusable piece of code for API calls
import axios from 'axios';

// set up base urls and headers for api calls
const apiClient = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-type": "application/json"
    }
});

export default {
    setToken(token) {
        // want to send a auth token with api calls
        // and token is stored in auth header
        return(apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`);
    },
    logOut() {
        return apiClient.post('/logout');
    },
    postimage(formData) {
        return apiClient.post("/post", formData);
    },
    getImageById(id) {
        return apiClient.get(`/post/${id}`);
    }
};
