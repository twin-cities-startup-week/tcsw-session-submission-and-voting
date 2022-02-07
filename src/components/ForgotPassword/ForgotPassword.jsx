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

function ForgotPassword () {
    const [email, setEmail] = useState('');
    const errors = useSelector(store => store.errors);
    const dispatch = useDispatch();
    const history = useHistory();

    const reset = (event) => {
        event.preventDefault();
        
        /* If both password input and confirm password input match
            reset password */
        if (email !== '') {
          dispatch({
            type: 'REQUEST_PASSWORD_RESET',
            payload: {
              email: email,
            }, 
          });
          history.push('/login');
        } else {
          /* If password input and confirm password input do not match
              display the error message, passwords do not match. */
          alert('Please enter an email address.');
        }
      }; // end login

    return (
        <Container component={Paper} elevation={8} 
        sx={{ width: 1/2, m: 'auto', p: 1, pl: 4, pb: 3, bgcolor: '#A7A9AC' }}>
  
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
                    <TextField sx={{ width: 500, bgcolor: '#FFFFFF', borderRadius: 1, mb: 2 }}
                    type="text" name="email" label="Email Address" variant="filled"
                    value={email} 
                    required
                    onChange={(event) => setEmail(event.target.value)}
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
        
        {/* Yellow container for "Need to sign up?" */}
        <Box component={Paper} elevation={6} 
          sx={{ bgcolor: '#FBBD19', borderRadius: 1, width: 500, height: 55, m: 'auto' }}>
          
          {/* Need to sign up text */}
          <Typography 
            sx={{ display: 'inline-block', textAlign: 'center', mt: 2, ml: 10 }}
                >Need to Sign up?
          </Typography>
          
          {/* Create Account button */}
          <Button component={Paper} elevation={8} 
            variant="contained" 
            type="submit" 
            name="submit" 
            value="Log In"
            sx={{ mt: 1, p: 2, width: 200, height: 40, bgcolor: '#0C495A', 
                color: '#FBBD19', m: 1, float: 'right' }}
            onClick={() => history.push('/registration')}
                >Create Account
          </Button>
  
        </Box>
      </Container>
    )
}

export default ForgotPassword;