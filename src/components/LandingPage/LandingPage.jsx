import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LandingPage.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState('Welcome to Session Selector & Voting');
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
          Twin Cities Startup Week is back from September 16 - 23, 2022!
          <br/>
          The TCSW Session Selector provides a way for the community to be more 
          involved in the sessions, workshops, panels, and events at TCSW. Whether 
          you are hosting an event for TCSW 2022 or just want to have a say in 
          what’s presented, you’re in the right place.
          Interested in hosting a session? If you are an individual, business, or 
          community organization doing amazing things in the world of startups and 
          innovation, we'd love to work with you! 
          </p>
        </div>
          {!user.id &&
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" type="submit" value="Register"
            sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', 
            color: '#FBBD19', mt: 2, mb: 2 }}
            onClick={() => history.push('/about')}
            > Learn More</Button>
          </Box>
          }

          {user.id && 
            <Box sx={{ textAlign: 'center' }}>
              <Button variant="contained"
                sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', 
                color: '#FBBD19', mt: 2, mb: 2 }}
                onClick={() => history.push('/submission')}
              > Submission Form</Button>

              <Button variant="contained"
                sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', 
                color: '#FBBD19', mt: 2, mb: 2, ml: 2 }}
                onClick={() => history.push('/panelistView')}
              > Search Sessions</Button>
          </Box>
          }

          <Paper elevation={8} 
          sx={{ width: 1000, height: 600, pl: 0, pr: 0, m: 'auto' }}>

            <Box sx={{ p: '1px', bgcolor: '#A7A9AC', borderRadius: 1, m: 0, pl: 0 }}>
              <h2>How to Submit A Session</h2>
            </Box>
          {!user.id && 
          <div>
          <p className="submission">
            2022 Session Submission Dates
            Session Submission Deadline: April 4, 2022 to May 15, 2022
            <br/>
            Session Voting Deadline: May 23, 2021 to June 5, 2022</p>
            <br/>
            1. Once signed in, use the submit your session proposal by May 1st. 
            Once submitted, we will reach out with any questions that we have. 
            We will notify you by April 15th whether your sessions was accepted or not. 
            Every year we receive more sessions that we have time slots on the 
            schedule so if your session is not accepted, please think about applying 
            next year!
            </div>
            }
            {user.id && 
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
            </div>
            }
          </Paper>
      </div>
    </div>
  );
}

export default LandingPage;
