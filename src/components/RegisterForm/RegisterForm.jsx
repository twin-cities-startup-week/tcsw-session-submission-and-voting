import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    /* if password and confirm password inputs match, the user will be registered */
    if ( password === confirmPassword ) {
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName
      },
    });
  } else {
    /* If password and confirm password inputs do NOT match, an error message will appear */
    alert('Passwords must match. Please try again.')
  }
  }; // end registerUser

  return (
    <Container component={Paper} elevation={8} 
          sx={{ width: 1/2, m: 'auto', p: 1, pl: 4, pb: 3, bgcolor: '#A7A9AC' }}>
    <form onSubmit={registerUser}>

      <h2 className="registerHeader">Registration</h2>

      {/* If user does not fill out registrstion form completely, an error
        message will display. These messages are stored in the errors reducer */}
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      {/* Sign up with Google button. Functions the same at the Google Login button. */}
      <Box sx={{ textAlign: 'center' }}>
        <Button 
          variant="contained" 
          type="submit" 
          value="Register"
          sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', color: '#FBBD19', mb: 1 }}
            > Sign up with Google</Button>
      <Box sx={{ m: 1 }}>

        {/* Username input */}
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

      {/* Password input */}
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

      {/* Confirm password input */}
      <Box sx={{ m: 1 }}>
        <label htmlFor="confirmPassword">
          <TextField sx={{ width: 500, height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            variant="filled"
            value={confirmPassword}
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
      </Box>

      {/* Email input */}
      <Box sx={{ m: 1 }}>
        <label htmlFor="email">
          <TextField sx={{ width: 500, height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
            type="email"
            name="email"
            label="Email Address"
            variant="filled"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </Box>

      {/* First name input */}
      <Box sx={{ m: 1 }}>
        <label htmlFor="firstName">
          <TextField sx={{ width: 500, height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
            type="firstName"
            name="firstName"
            label="First Name"
            variant="filled"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </Box>

      {/* Last name input */}
      <Box sx={{ m: 1 }}>
        <label htmlFor="lastName">
          <TextField sx={{ width: 500, height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
            type="lastName"
            name="lastName"
            label="Last Name"
            variant="filled"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </Box>

      {/* Register button. On click the user will be signed in and directed to the
        landing page. */}
      <Box>
        <Button 
          variant="contained" 
          type="submit" 
          value="Register"
          sx={{ mt: 1, p: 2, width: 350, height: 50, bgcolor: '#0C495A', color: '#FBBD19' }}
            > Register
        </Button>
      </Box>
    </Box>
    </form>
  </Container>
  );
}

export default RegisterForm;
