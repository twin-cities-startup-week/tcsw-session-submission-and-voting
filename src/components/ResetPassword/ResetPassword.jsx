import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import {
    useParams
} from "react-router-dom";

function ForgotPassword() {
    const params = useParams();
    const [username, setUsername] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(store => store.errors);
    const dispatch = useDispatch();
    const history = useHistory();

    const reset = (event) => {
        event.preventDefault();
        const userToken = params.token;
        /* If both password input and confirm password input match
            reset password */
        if (retypePassword !== password) {
            alert('Passwords do not match.');
        } else if (password && password.length < 8) {
            alert('Passwords must be 8 characters.');
        } else if (username && username.length > 3 && password && password.length > 7) {
            dispatch({ type: 'SET_NEW_PASSWORD', payload: { email: username, password, token: userToken } });
        } else {
            alert('Please enter a username and password.');
        }
    }; // end login

    return (
        <Container
            sx={{ maxWidth: 600, m: 'auto', p: 1, bgcolor: '#fff' }}>

            <h2 className="forgot-password-header">Reset Password</h2>

            <form onSubmit={reset}>
                {errors.loginMessage && (
                    <h3 className="alert" role="alert">
                        {errors.loginMessage}
                    </h3>
                )}

                {/* Username input */}
                <Box sx={{ textAlign: 'center' }}>
                    {/* Email input */}
                    <Box sx={{ m: 1 }}>
                        <label htmlFor="username">
                            <TextField sx={{ maxWidth: 500, width: '100%', bgcolor: '#FFFFFF', borderRadius: 1, mb: 2 }}
                                type="text" name="email" label="Email Address" variant="filled"
                                value={username}
                                required
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </label>
                    </Box>
                    {/* Password input */}
                    <Box sx={{ m: 1 }}>
                        <label htmlFor="password">
                            <TextField sx={{ maxWidth: 500, width: '100%', bgcolor: '#FFFFFF', borderRadius: 1, mb: 2 }}
                                type="password" name="password" label="Password" variant="filled"
                                value={password}
                                required
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </label>
                    </Box>

                    {/* Confirm password input */}
                    <Box sx={{ m: 1 }}>
                        <label htmlFor="retypePassword">
                            <TextField sx={{ maxWidth: 500, width: '100%', bgcolor: '#FFFFFF', borderRadius: 1, mb: 1 }}
                                type="password" name="retypePassword" label="Confirm Password" variant="filled"
                                value={retypePassword}
                                required
                                onChange={(event) => setRetypePassword(event.target.value)}
                            />
                        </label>
                    </Box>

                    {/* Reset password button. When clicked, if all inputs match a user's info, 
                reset the user's password */}
                    <Button variant="contained" type="submit" name="submit" value="Log In"
                        sx={{ mb: 2, p: 2, width: 300, height: 50, bgcolor: '#0C495A', color: '#FBBD19' }}
                    >Reset Password
                    </Button>
                </Box>
            </form>
        </Container>
    )
}

export default ForgotPassword;