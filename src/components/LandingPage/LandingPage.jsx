import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import MarkdownView from 'react-showdown';
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
  const dispatch = useDispatch();
  const { block } = useSelector((store) => store.content);
  //Get all the session
  useEffect(() => {
    dispatch({ type: "FETCH_CONTENT_BLOCKS" });
  }, [dispatch]);

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <br />
      <h2 id="landing-welcome">{heading}</h2>
      
      {/* Landing Page description, static */}
      <div className="">
        <div id="landing-description">
          <MarkdownView
            markdown={block['home']}
          />
        </div>

        {/* If the user is NOT logged in, show the Learn More Button */}
          {!user.id &&
          <Box sx={{ textAlign: 'center' }}>
            <Button 
              variant="contained" 
              type="submit" 
              value="Register"
              sx={{mt: 2, mb: 2}}
              onClick={() => history.push('/about')}
            >Learn More</Button>
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 2, ml: 2 }}
              onClick={() => history.push('/registration')}
            >Register</Button>
          </Box>
          }

          {/* If the user IS logged in, 
          show the Submission Form and Search Sessions buttons */}
          {user.id && 
            <Box sx={{ textAlign: 'center' }}>
              <Button 
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                onClick={() => history.push('/submission')}
              > Submission Form</Button>

              {/* <Button 
                variant="contained"
                sx={{ mt: 2, mb: 2, ml: 2 }}
                onClick={() => history.push('/panelistView')}
              > Search Sessions</Button> */}
          </Box>
          }

          <Paper className="submitASessionBox" component={Paper} elevation={8}>

            <div className="submitSessionDiv">
              <h2 className="submitSessionHeader">Submit a Session</h2>
            </div>

          {/* If the user is NOT logged in, show submission deadlines
              and a overview of how to submit a session */}
          {!user.id && 
            <div>
              <MarkdownView
                markdown={block['home1']}
              />
            </div>
            }
            {user.id && 
            <div className="submissionDetailsText">
              <MarkdownView
                markdown={block['home2']}
              />
            </div>
            }
          </Paper>
      </div>
    </div>
  );
}

export default LandingPage;
