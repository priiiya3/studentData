import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'
import axios from 'axios';
import googleImg from '../assests/googleimg.png'
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

// SAMPLE CREDENTIALS
//email - abc@email.com
//password - 12345678



export default function Login() {
    const salt = 'n238ofnfw39x';
    const navigate = useNavigate();


    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email -> ', email);
        console.log('Password -> ', password);
        if (email === 'abc@email.com' && password === '12345678') {
            const jwtToken = email + password + salt + password;
            localStorage.setItem('authToken', jwtToken);
            sessionStorage.setItem('authToken', jwtToken)
            navigate('/home');
        }
        else {
            setPassword('')
            setEmail('');
            alert('Enter right email and password');
        }


    }
    return (
        <div>
            <div className="main">
                <form className='form'>
                    <div className="form-container">
                        <input className='input' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='input' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="form-text">Don't have an account ? Signup instead</div>
                        <button className='button-submit' type='submit' onClick={handleSubmit}>Submit</button>
                        <div className="text-or">OR</div>
                        <button className='button-google'>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                                }}
                            
                                onError={() => {
                                console.log('Login Failed');
                                }}
                            />
                        </button>
                    
                    </div>
                </form>
            </div>
        </div>
    )
}
