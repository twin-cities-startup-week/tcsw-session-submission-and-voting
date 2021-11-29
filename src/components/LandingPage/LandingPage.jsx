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
      
      {/* Landing Page description, static */}
      <div className="">
        <div id="landing-description">
            Twin Cities Startup Week is back from September 16 - 23, 2022!
          <br/>
            Welcome to the Twin Cities Startup Week Session Selector! 
            Here, you can submit a session application, vote on what you want 
            to see at TCSW 2022, and add comments for the community to consider. 
          <br/>

          {/* If the user is NOT signed in, a call to action is underlined in the
          landing page description. This disappears when the user logs in */}
          {!user.id &&
            <b><u>Click Sign In to get started!</u></b>
          }
        </div>

        {/* If the user is NOT logged in, show the Learn More Button */}
          {!user.id &&
          <Box sx={{ textAlign: 'center' }}>
            <Button 
              variant="contained" 
              type="submit" 
              value="Register"
              sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', 
                color: '#FBBD19', mt: 2, mb: 2 }}
            onClick={() => history.push('/about')}
            > Learn More</Button>
          </Box>
          }

          {/* If the user IS logged in, 
          show the Submission Form and Search Sessions buttons */}
          {user.id && 
            <Box sx={{ textAlign: 'center' }}>
              <Button 
                variant="contained"
                sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', 
                    color: '#FBBD19', mt: 2, mb: 2 }}
                onClick={() => history.push('/submission')}
              > Submission Form</Button>

              <Button 
                variant="contained"
                sx={{ p: 2, width: 350, height: 50, bgcolor: '#0C495A', 
                    color: '#FBBD19', mt: 2, mb: 2, ml: 2 }}
                onClick={() => history.push('/panelistView')}
              > Search Sessions</Button>
          </Box>
          }

          <Paper className="submitASessionBox" component={Paper} elevation={8}>

            <div className="submitSessionDiv">
              <h2 className="submitSessionHeader">Submit A Session</h2>
            </div>

          {/* If the user is NOT logged in, show submission deadlines
              and a overview of how to submit a session */}
          {!user.id && 
          <div>
            <div>
          <p className="submission">
            <b>2022 Session Submission Dates</b>
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

            {/* If a user IS logged in, 
            Show steps in an ordered list of session submission process */}
            </div>
            }
            {user.id && 
            <div className="submissionDetailsText">
              <ol>
              <li>Use the session submission form to submit your session proposal by May 1st. 
              Once submitted, we will reach out with any questions that we have. 
              We will notify you whether your sessions was accepted or not. 
              Every year we receive more sessions that we have time slots on the 
              schedule so if your session is not accepted, please think about applying 
              next year!</li>
              <br/>
              <li>If your session is accepted, final details are due. This will 
              include speaker information, content summary, location, and timing/length. 
              We know that things may change, but ask that you submit as much as possible 
              so we can upload information into our master calendar prior to our schedule 
              being announced on May 1st.</li>
              <br/>
              <li>Spread the word! We will work with you to help promote your session and
              make sure you - and your attendees - have an incredible experience. On May 5th 
              we will host an Event Host Webinar focused on how to prepare for and promote 
              your TCSW session.</li>
              <br/>
              <li>Attend the TCSW Event Host Happy Hour on May 10th. This will be a time you 
              can learn more about other events happening throughout the week and connect 
              with other event hosts.</li>
              <br/>
              <li>6: Host your event! We're planning on having about 200 events this year.</li>
              <br/>
              <li>Provide feedback. It is important to us that event hosts, partners and 
              attendees are given an opportunity to provide feedback. As an event host, 
              we will send you a survey to gather feedback and capture any stories that 
              came out of your events. We will also provide you a few questions to ask 
              your attendees.</li>
              </ol>
            </div>
            }
          </Paper>
      </div>
    </div>
  );
}

export default LandingPage;
