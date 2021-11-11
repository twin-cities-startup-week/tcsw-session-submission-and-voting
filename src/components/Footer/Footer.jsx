import React from 'react';
import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useHistory} from 'react-router-dom';



// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  
    


  return <footer> 
    #TCSW22
  {/* icons need links */}
  <Box display="flex"
  justifyContent="center"
  alignItems="center">
  <InstagramIcon fontSize="large"/> 
  <TwitterIcon fontSize="large" />
  <EmailIcon fontSize="large" />
  </Box>
  </footer>

}

export default Footer;
