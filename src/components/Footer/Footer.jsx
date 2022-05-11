import React from 'react';
import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';




// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      <div style={{padding: '20px'}}>
        <Box display="flex"
          justifyContent="left"
          alignItems="center">
          <a href="https://www.twincitiesstartupweek.com/" className="icon" target="_blank"> #TCSW22</a>
        </Box>
        <Box display="flex"
          justifyContent="center"
          alignItems="center">
          <a href="https://www.instagram.com/tcstartupweek/?hl=en" className="icon" target="_blank"><InstagramIcon fontSize="large" /> </a>
          <a href="https://twitter.com/tcstartupweek?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" className="icon" target="_blank"><TwitterIcon fontSize="large" /></a>
          <a href="mailto:tcsw@beta.mnn" className="icon" target="_blank"> <EmailIcon fontSize="large" /></a>
        </Box>
      </div>

    </footer>
  );

}

export default Footer;
