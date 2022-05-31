import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import ReCAPTCHA from 'react-google-recaptcha';
import { Dialog, DialogTitle, DialogContent, Container, Box, Typography, Button } from '@mui/material';
import GoogleButton from '../LoginForm/GoogleLoginButton';


function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [open, setOpen] = useState(false);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const recaptchaRef = React.createRef();
  const history = useHistory();

  const checkIfEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return true;
    }
    return false;
  }

  const validateForm = () => {
    let result = true;
    const isEmail = checkIfEmail(email);
    if (password.length < 8) {
      dispatch({
        type: 'SET_GLOBAL_MODAL',
        payload: {
          modalOpen: true,
          title: 'Password too short',
          body: 'Password must be 8 characters or more.',
        },
      });
      result = false;
    } else if (password !== confirmPassword) {
      dispatch({
        type: 'SET_GLOBAL_MODAL',
        payload: {
          modalOpen: true,
          title: 'Passwords do not match',
          body: 'Password must match.',
        },
      });
      result = false;
    } else if (!isEmail) {
      dispatch({
        type: 'SET_GLOBAL_MODAL',
        payload: {
          modalOpen: true,
          title: 'Missing email',
          body: 'Valid email is required.',
        },
      });
      result = false;
    }
    return result;
  }

  const registerUser = async (event) => {
    event.preventDefault();
    setOpen(true);
    /* if password and confirm password inputs match, the user will be registered */
    if (validateForm()) {
      let token;
      try {
        token = await recaptchaRef.current.executeAsync();
        dispatch({
          type: 'REGISTER',
          payload: {
            username: email,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            token: token,
          },
          onSuccess,
          onFailure,
        });
      } catch (e) {
        alert('Unable to validate recaptcha.');
        return;
      }

    }
  }; // end registerUser

  const onSuccess = () => {
    setOpen(false);
  }

  const onFailure = (message) => {
    setOpen(false);
    dispatch({
      type: 'SET_GLOBAL_MODAL',
      payload: {
        modalOpen: true,
        title: 'Oh no! Something went wrong.',
        body: message,
      },
    });
  }

  const handleGoogleLogin = () => {
    // dispatch({ type: 'GOOGLE_LOGIN' })
    const time = new Date().getTime();
    if (process.env.NODE_ENV === 'production') {
      window.location.href = `https://sessions.twincitiesstartupweek.com/auth/google?t=${time}`;
    } else {
      window.location.href = `http://localhost:5000/auth/google?t=${time}`;
    }

  }

  return (
    <>
      <Dialog open={open}>
        <DialogTitle id="responsive-dialog-title">
          Please wait...
        </DialogTitle>
        <DialogContent align="center">
          <span role="img" aria-label="loading">⌛</span>
          {/* TODO: Add animation */}
        </DialogContent>
        {/* This modal can't be closed. */}
      </Dialog>
      <Container style={{ maxWidth: 500 }}
        sx={{ mt: 4, bgcolor: '#fff' }}>
        <h2 className="registerHeader">Registration</h2>
        <Box sx={{ textAlign: 'center', mb: 2, mt: 2 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ border: 1, pr: 3 }}
            onClick={handleGoogleLogin}
          >
            <GoogleButton />
            Sign in with Google
          </Button>
        </Box>
        <form onSubmit={registerUser} style={{ margin: 0, padding: 0 }}>



          {/* If user does not fill out registrstion form completely, an error
        message will display. These messages are stored in the errors reducer */}
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}

          {/* Sign up with Google button. Functions the same at the Google Login button. */}
          <Box sx={{ textAlign: 'center' }}>
            {/* Email input */}
            <Box sx={{ mb: 2, mt: 4 }}>
              <label htmlFor="email">
                <TextField sx={{ maxWidth: '500px', width: '100%', height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
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

            {/* Password input */}
            <Box sx={{ mb: 2 }}>
              <label htmlFor="password">
                <TextField sx={{ maxWidth: '500px', width: '100%', height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
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
            <Box sx={{ mb: 2 }}>
              <label htmlFor="confirmPassword">
                <TextField sx={{ maxWidth: '500px', width: '100%', width: '100%', height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
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

            {/* First name input */}
            <Box sx={{ mb: 2 }}>
              <label htmlFor="firstName">
                <TextField sx={{ maxWidth: '500px', width: '100%', height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
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
            <Box sx={{ mb: 2 }}>
              <label htmlFor="lastName">
                <TextField sx={{ maxWidth: '500px', width: '100%', height: 50, bgcolor: '#FFFFFF', borderRadius: 1 }}
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
            {
              process.env.REACT_APP_RECAPTCHA_SITE_KEY && (
                <Box sx={{ mb: 2 }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    badge="bottomleft"
                  />
                </Box>
              )
            }
            {/* Register button. On click the user will be signed in and directed to the
          landing page. */}
            <Box>
              <Button
                variant="contained"
                type="submit"
                value="Register"
                sx={{ mt: 3, mb: 3, p: 2, width: 350, height: 50, bgcolor: '#0C495A', color: '#FBBD19' }}
              > Register
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default RegisterForm;
