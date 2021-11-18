import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to Session Submission & Voting');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2 id="landing-welcome">{heading}</h2>

      <div className="">
        <div id="landing-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </p>
        </div>

          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" type="submit" value="Register"
            sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', 
            color: '#FBBD19', mt: 2, mb: 2 }}
            onClick={() => history.push('/about')}
            > Learn More</Button>
          </Box>

          <Container component={Paper} elevation={8} 
          sx={{ width: 1000, height: 300, pl: 0, pr: 0 }}>

            <Box sx={{ p: 1, bgcolor: '#A7A9AC', borderRadius: 1, m: 0, pl: 0 }}>
              <h2>How to Submit A Session</h2>
            </Box>

          <p>Interested in submiting a session to Twin Cities Start up Week 2022?<br/>
          Click the Sign in button to get started!</p>
          <p className="submission">Submission period starts on April ?? 2022 and ends on April ?? 2022<br/>
          Voting Period starts on May ?? 2022 and ends on May ?? 2022 </p>

          </Container>
      </div>
    </div>
  );
}

export default LandingPage;
