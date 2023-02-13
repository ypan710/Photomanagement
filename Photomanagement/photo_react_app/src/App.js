import React, {useEffect} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Postimage from './pages/Postimage';
import apiClient from './apiClient';
import ImagePage from './pages/ImagePage';

const App = () => { // write react hook
    const [appUser, setAppUser] = React.useState(null); // sticks until refresh or setAppUser(null)
    const [token, setToken] = React.useState(null);

    // remove user and token when logged out
    const logOut = () => {
        console.log("Logged out!")
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setAppUser(null); // reset state to null value
        setToken(null); // reset state to null value
        apiClient.logOut(); // logout from backend
    }

    // make sure user is logged in until they are logged out
    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setAppUser(user);
            setToken(token);
            apiClient.setToken(token);
        }
    })

    return (
        <div>
            <nav>
                <Link to="/">
                    Home
                </Link>
                {
                appUser && <Link to="/"
                    onClick={logOut}>
                    Log Out
                </Link>
            }
                {
                !appUser && <Link to="/login">
                    Log In
                </Link>
            }
                {
                !appUser && <Link to="/signup">
                    Sign Up
                </Link>
            }
                {
                appUser && <Link to="/postimage">
                    Post Image
                </Link>
            } </nav>

            <Switch>
                <Route path="/login">
                    <Login appUser={appUser}
                        setAppUser={setAppUser}
                        setToken={setToken}/>
                </Route>
                <Route path="/signup">
                    <Signup appUser={appUser}
                        setAppUser={setAppUser}
                        setToken={setToken}/>
                </Route>
                <Route path="/postimage">
                    <Postimage appUser={appUser}
                        setAppUser={setAppUser}/>
                </Route>
                <Route path="/imagePage/:id">
                    <ImagePage/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    );
};

export default App;
