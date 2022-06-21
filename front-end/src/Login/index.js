import React from 'react';
import { useLocalState } from '../util/useLocalStorage';

function Login(props) {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return (
        <div>
            <label htmlFor='username'>Username:</label>
            <input id='username'/>
            <label htmlFor='password'>Password:</label>
            <input id='password'/>

        </div>
    );
}

export default Login;