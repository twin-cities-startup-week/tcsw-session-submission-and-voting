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
          Twin Cities Startup Week is back from September 16 - 23, 2022!
          <br/>
          Welcome to the Twin Cities Startup Week Session Selector! 
          Here, you can submit a session application, vote on what you want 
          to see at TCSW 2022, and add comments for the community to consider. 
          <br/>
          <b><u>Click Sign In to get started!</u></b>
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

            <div className="submitSessionDiv">
              <h2 className="submitSessionHeader">Submit A Session!</h2>
            </div>
          {!user.id && 
          <div>
            <div>
          <p className="submission">
            2022 Session Submission Dates
            <br/>
            Submission period starts April 4, 2022 and ends May 15, 2022
            <br/>
              Community voting starts May 23, 2022 and ends June 6, 2022</p>
            <p className="extraText">
              Once signed in, use the submit your session proposal by May 1st. 
              Once submitted, we will reach out with any questions that we have. 
              We will notify you by April 15th whether your sessions was accepted or not. 
              Every year we receive more sessions that we have time slots on the 
              schedule so if your session is not accepted, please think about applying 
              next year!
            </p>
            </div>
            <div className="landingList">
            <ul>
            <h3>As a user you will have the ability to do the following:</h3>
            <li>Submit up to 5 Sessions to Twin Cities Sartup Week.</li>
            <li>Vote once for each session that has been approved.</li>
            </ul>
            </div>
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
