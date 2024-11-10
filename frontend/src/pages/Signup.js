


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'user'
    });
    const [secretKey, setSecretKey] = useState(''); // Separate state for secret key

    const navigate = useNavigate();
    const ADMIN_SECRET_KEY = 'VIPzone';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, userType } = signupInfo;

        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }

        // Check if admin is selected and secret key is required
        if (userType === 'admin' && secretKey !== ADMIN_SECRET_KEY) {
            return handleError('Invalid admin secret key');
        }

        // Only send relevant fields to backend
        const signupPayload = { name, email, password, userType };

        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupPayload)
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                handleError(error?.details[0]?.message || message);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='userType'>User Type</label>
                    <div>
                        <label>
                            <input
                                type='radio'
                                name='userType'
                                value='user'
                                checked={signupInfo.userType === 'user'}
                                onChange={handleChange}
                            />
                            User
                        </label>
                        <label>
                            <input
                                type='radio'
                                name='userType'
                                value='admin'
                                checked={signupInfo.userType === 'admin'}
                                onChange={handleChange}
                            />
                            Admin
                        </label>
                    </div>
                </div>
                {signupInfo.userType === 'admin' && (
                    <div>
                        <label htmlFor='secretKey'>Secret Key</label>
                        <input
                            type='password'
                            placeholder='Enter admin secret key...'
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                        />
                    </div>
                )}
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
