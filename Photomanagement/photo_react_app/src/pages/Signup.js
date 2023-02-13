import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

const Signup = ({appUser, setAppUser, setToken}) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');

    const handleAuth = () => {
        const body = {
            username,
            password,
            email
        };
        console.log(body);
        axios.post('http://localhost:5500/signup', body).then((res) => {
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
        }).catch(() => {
            setError("Failed to register");
        });
    };

    if (appUser) {
        return <Redirect to="/postimage"/>
    }

    return (
        <div> {/* <h1>Sign Up</h1>
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
        <button disabled={!username || !password} onClick ={handleAuth}>Sign Up</button>
      </div>
      {error && <strong>{error}</strong>} */}

            <div className="box">
                <h1>Registration Form</h1>
                <p>Username:
                    <input className="username" type="text" placeholder="User name"
                        value={username}
                        onChange=
                        {e => setUsername(e.target.value)}/>
                </p>
                <p>Password:
                    <input className="username" type="text" placeholder="Password"
                        value={password}
                        onChange=
                        {e => setPassword(e.target.value)}/>
                </p>
                <p>Confirm Password:
                    <input className="username" type="password" placeholder="Confirm Password"/>
                </p>
                <p>Email:
                    <input className="username" type="text" placeholder="Email"
                        value={email}
                        onChange=
                        {e => setEmail(e.target.value)}/>
                </p>
                <p>
                    <input type="checkbox" name="accept" value="agreement"/>I am 13 years of age or older.
                </p>
                <p>
                    <input type="checkbox" name="accept" value="agreement"/>I accept
                    <a href="url">Terms of Service</a>
                    and
                    <a href="url">Privacy Rules.</a>
                </p>
                <button type="submit"
                    disabled={
                        !username || !password
                    }
                    onClick
                    ={handleAuth}>Submit</button>
            </div>
        </div>
    );
};
export default Signup;
