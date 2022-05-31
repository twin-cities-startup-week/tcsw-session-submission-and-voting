import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import GoogleButton from './GoogleLoginButton';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    /* If the username and password match, then log in that user */
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      /* If the username and password do not match, display the appropriate error
          from the redux store. These error are in the errors reducer */
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  const handleGoogleLogin = () => {
    // dispatch({ type: 'GOOGLE_LOGIN' })
    const time = new Date().getTime();
    if (process.env.NODE_ENV === 'production') {
      window.location.href = `${window.location.protocol}//${window.location.host}/auth/google?t=${time}`;
    } else {
      window.location.href = `http://localhost:5000/auth/google?t=${time}`;
    }
    
  }

  return (
    <Container style={{maxWidth: 500}}
      sx={{ mt: 4, bgcolor: '#fff' }}>

      <h2 className="registerHeader">Sign In</h2>

      {/* GoogleSignin, 
          code related to google Oauth is in server.js 
          This uses the user's gmail as the username, and displays their
          first name provided through gmail in the upper right hand corner */}
      <Box sx={{ textAlign: 'center', mb: 2, mt: 2 }}>
        <Button
          contained
          type="submit"
          sx={{ border: 1, pr: 3 }}
          onClick={handleGoogleLogin}
        >
          <GoogleButton/>
          Sign in with Google
        </Button>
      </Box>

      <form onSubmit={login}>

        {/* When an error occurs with login, the matching message will appear 
          on the login form */}
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}

        {/* Login form, username input */}
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ m: 0 }}>
            <label htmlFor="username">
              <TextField sx={{ maxWidth: '500px', width: '100%', bgcolor: '#FFFFFF', borderRadius: 1, mb: 2 }}
                type="text" name="username" label="Username" variant="filled"
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </Box>

          {/* Login form, password input */}
          <Box sx={{ mb: 2 }}>
            <label htmlFor="password">
              <TextField sx={{ maxWidth: '500px', width: '100%', bgcolor: '#FFFFFF', borderRadius: 1, mb: 1 }}
                type="password" name="password" label="Password" variant="filled"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </Box>
          <div style={{maxWidth: 500, width: '100%', height: 100, margin: '0 auto'}}>
            {/* Forgot your password link */}
            <button type="button" style={{ float: 'left', margin: 0}} className="btn btn_asLink"
              onClick={() => {
                history.push('/forgotPassword');
              }}>
              Forgot your password?
            </button>

            {/* Sign in button  */}
            <Button variant="contained" type="submit" name="submit" value="Log In"
              sx={{ float: 'right', mr: 0 }}
            > Sign In</Button>
          </div>

        </Box>
      </form>
      
      {/* Yellow container for "Need to sign up?" */}
      <Box component={Paper} elevation={6} 
        sx={{ bgcolor: '#FBBD19', borderRadius: 1, maxWidth: '500px', width: '100%', height: 65, m: 'auto' }}>
        
        {/* Need to sign up text inside yellow container */}
        <Typography 
          sx={{ display: 'inline-block', mt: 2.5, ml: 2.5 }}
          >Need to sign up?</Typography>

        {/* Create Account Button */}
        <Button component={Paper} elevation={8} 
          variant="contained" type="submit" name="submit" value="Log In"
          sx={{ mt: 1, p: 2, height: 50, bgcolor: '#0C495A', 
          color: '#FBBD19', m: 1, float: 'right' }}
          onClick={() => history.push('/registration')}
          >Register</Button>

      </Box>
    </Container>
  );
}

export default LoginForm;
