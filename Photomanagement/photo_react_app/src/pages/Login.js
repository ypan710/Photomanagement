import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
// import "../main.css";

const Login = ({appUser, setAppUser, setToken}) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleAuth = () => {
        const body = {
            username: username,
            password: password
        };
        axios.post('http://localhost:5500/login', body).then((res) => {
            console.log(res.data);
            const {token, user} = res.data;
            if (user) {
                console.log("User created!");
                setAppUser(user.username);
                setToken(token);
                localStorage.setItem("user", user.username);
                localStorage.setItem("token", token);
            } else {
                setError(res.data.error);
            }
        }).catch(() => { // setError("Failed to register");
        });
    };

    if (appUser) {
        return <Redirect to="/postimage"/>
    }

    return (
        <div> {/* <h1>Log In</h1>
        <div>
          <input 
            value = {username}
            onChange = {e => setUsername(e.target.value)}
          />
        </div>
  
        <div>
          <input
            value = {password}
            onChange = {e => setPassword(e.target.value)}
            type="password"
          />
        </div>
  
        <div>
          <button disabled={!username || !password} onClick ={handleAuth}>Log In</button>
        </div>
        {error && <strong>{error}</strong>} */}

            <div className="box">
                <h1>Login Form</h1>
                <p>Username:
                    <input className="username" type="text" placeholder="User name"
                        value={username}
                        onChange=
                        {e => setUsername(e.target.value)}/>
                </p>
                <p>Password:
                    <input className="username" type="password" placeholder="Password"
                        value={password}
                        onChange=
                        {e => setPassword(e.target.value)}/>
                </p>
                <button type="submit"
                    disabled={
                        !username || !password
                    }
                    onClick
                    ={handleAuth}>Submit
                </button>
                {/* <div>
                  <button disabled={!username || !password} onClick ={handleAuth}>Log In</button>
               </div> */}
                {/* {error && <strong>{error}</strong>} */} </div>
        </div>
    );
};


export default Login;
