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

  const createAccount = () => {
    history.push('/registration');
  }

  return (
    <Container component={Paper} elevation={8} 
      sx={{ width: 1/2, m: 'auto', p: 1, pl: 4, pb: 3, bgcolor: '#A7A9AC' }}>

      <h2 className="registerHeader">Login</h2>

      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" type="submit" value=""
        sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', color: '#FBBD19', mb: 1 }}
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
              <TextField sx={{ width: 500, bgcolor: '#FFFFFF', borderRadius: 1 }}
                type="text" name="username" label="Username" variant="filled"
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </Box>
          <Box sx={{ m: 1 }}>
            <label htmlFor="password">
              <TextField sx={{ width: 500, bgcolor: '#FFFFFF', borderRadius: 1 }}
                type="password" name="password" label="Password" variant="filled"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </Box>
          <Button variant="contained" type="submit" name="submit" value="Log In"
          sx={{ mt: 1, mb: 3, p: 2, width: 300, height: 50, bgcolor: '#0C495A', color: '#FBBD19' }}
            > Login</Button>
        </Box>
      </form>
      <Box component={Paper} elevation={8} 
        sx={{ bgcolor: '#FBBD19', borderRadius: 1, width: 500, height: 55, m: 'auto' }}>
        <Typography sx={{ display: 'inline-block', textAlign: 'center', mt: 2, ml: 10 }}
          >Need to Sign up?</Typography>
        <Button component={Paper} elevation={8} 
        variant="contained" type="submit" name="submit" value="Log In"
          sx={{ mt: 1, p: 2, width: 200, height: 40, bgcolor: '#0C495A', 
          color: '#FBBD19', m: 1, float: 'right' }}
          onClick={createAccount}
          > Create Account</Button>
      </Box>
    </Container>
    // </form>
  );
}

export default LoginForm;
