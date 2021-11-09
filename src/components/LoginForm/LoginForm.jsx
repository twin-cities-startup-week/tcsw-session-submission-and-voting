import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
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

  return (
    // <form className="formPanel" onSubmit={login}>
    //   <h2>Login</h2>
    //   {errors.loginMessage && (
    //     <h3 className="alert" role="alert">
    //       {errors.loginMessage}
    //     </h3>
    //   )}
    //   <div>
    //     <label htmlFor="username">
    //       Username:
    //       <input
    //         type="text"
    //         name="username"
    //         required
    //         value={username}
    //         onChange={(event) => setUsername(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label htmlFor="password">
    //       Password:
    //       <input
    //         type="password"
    //         name="password"
    //         required
    //         value={password}
    //         onChange={(event) => setPassword(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <input className="btn" type="submit" name="submit" value="Log In" />
    //   </div>
      <Container component={Paper} elevation={8} 
    sx={{ width: 1/2, m: 'auto', p: 1, pl: 4, pb: 3, bgcolor: '#A7A9AC' }}>
    <form onSubmit={login}>
      <h2 className="registerHeader">Login</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Box sx={{ textAlign: 'center' }}>
      <Button variant="contained" type="submit" value="Register"
        sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', color: '#FBBD19', mb: 1 }}
          > Sign in with Google</Button>
      <Box sx={{ m: 1 }}>
        <label htmlFor="username">
          <TextField sx={{ width: 500, height: 50, bgcolor: '#FFFFFF', borderRadius: 1, height: 50 }}
            type="text"
            name="username"
            label="Username"
            variant="filled"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </Box>
      <Box sx={{ m: 1 }}>
        <label htmlFor="password">
          <TextField sx={{ width: 500, height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
            type="password"
            name="password"
            label="Password"
            variant="filled"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </Box>
      <Box>
        <Button variant="contained" type="submit" name="submit" value="Log In"
        sx={{ mt: 1, p: 2, width: 350, height: 50, bgcolor: '#0C495A', color: '#FBBD19' }}
          > Login</Button>
        {/* <input className="btn" type="submit" name="submit" value="Register" /> */}
      </Box>
      </Box>
    </form>
    </Container>
    // </form>
  );
}

export default LoginForm;
