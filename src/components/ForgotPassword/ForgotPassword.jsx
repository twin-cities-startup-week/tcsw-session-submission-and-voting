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
          dispatch({
            type: 'SET_GLOBAL_MODAL',
            payload: {
              modalOpen: true,
              title: 'Missing Fields',
              body: 'Please enter an email address.',
            },
          });
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
        
      </Container>
    )
}

export default ForgotPassword;