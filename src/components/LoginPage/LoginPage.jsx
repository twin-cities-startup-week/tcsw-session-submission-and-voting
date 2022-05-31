import React, { useEffect, useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

function LoginPage() {
  const history = useHistory();
  useEffect(() => {
    if (process.env.REACT_APP_GA_CODE) {
      ReactGA.pageview('/login');
    }
  }, []);
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
