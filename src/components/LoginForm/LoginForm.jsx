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
import GoogleSignin from '../GoogleSignin/GoogleSignin';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  const handleGoogleLogin = () => {
    // dispatch({ type: 'GOOGLE_LOGIN' })
    const time = new Date().getTime();
    window.location.href=`http://localhost:5000/auth/google?t=${time}`;
  }

  return (
    <Container component={Paper} elevation={8} 
      sx={{ width: 1/2, m: 'auto', p: 1, pl: 4, pb: 3, bgcolor: '#A7A9AC' }}>

      <h2 className="registerHeader">Sign In</h2>

      {/* <GoogleSignin/> */}
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" type="submit" value=""
        sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', color: '#FBBD19', mb: 1 }}
        onClick={handleGoogleLogin}
            > Sign in with Google</Button>
      </Box>

      <form onSubmit={login}>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ m: 1 }}>
            <label htmlFor="username">
              <TextField sx={{ width: 500, bgcolor: '#FFFFFF', borderRadius: 1, mb: 2 }}
                type="text" name="username" label="Username" variant="filled"
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </Box>
          <Box sx={{ m: 1 }}>
            <label htmlFor="password">
              <TextField sx={{ width: 500, bgcolor: '#FFFFFF', borderRadius: 1, mb: 1 }}
                type="password" name="password" label="Password" variant="filled"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </Box>
          <center>
            <button type="button" className="btn btn_asLink"
              onClick={() => {
                history.push('/forgotPassword');
              }}>
                Forgot your password?
            </button>
          </center>
          <Button variant="contained" type="submit" name="submit" value="Log In"
          sx={{ mt: 2, mb: 2, p: 2, width: 350, height: 50, bgcolor: '#0C495A', color: '#FBBD19' }}
            > Sign In</Button>
        </Box>
      </form>

      <Box component={Paper} elevation={6} 
        sx={{ bgcolor: '#FBBD19', borderRadius: 1, width: 500, height: 55, m: 'auto' }}>

        <Typography 
          sx={{ display: 'inline-block', textAlign: 'center', mt: 2, ml: 10 }}
          >Need to Sign up?</Typography>

        <Button component={Paper} elevation={8} 
          variant="contained" type="submit" name="submit" value="Log In"
          sx={{ mt: 1, p: 2, width: 200, height: 40, bgcolor: '#0C495A', 
          color: '#FBBD19', m: 1, float: 'right' }}
          onClick={() => history.push('/registration')}
          > Create Account</Button>

      </Box>
    </Container>
  );
}

export default LoginForm;
