import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useTheme, useMediaQuery } from '@mui/material';

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = () => {
    setOpen(!open);
  };

  /* These two functions close the menu when */
  const pushToAdmin = () => {
    setOpen(!open);
    history.push('/admin');
  }
  const pushToAdminContent = () => {
    setOpen(!open);
    history.push('/admin/content');
  }
  const pushToMySubmissions = () => {
    setOpen(!open);
    history.push('/user/submission');
  }
  const pushToSubmission = () => {
    setOpen(!open);
    history.push('/submission');
  }
  const pushToAbout = () => {
    setOpen(!open);
    history.push('/about');
  }
  const pushToFAQ = () => {
    setOpen(!open);
    history.push('/faq');
  }
  const pushToLogout = () => {
    setOpen(!open);543547
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
  }

  return (
    <div className="nav">

      {/* Twin Cities Startup Week logo, on click will redirect the user to
        the Twin Cities Startup Week website */}
      <a href="https://www.twincitiesstartupweek.com/" target="_blank"> 
        <img src="images/TCSW_Logo_Navy.png" alt="TCSW logo" width="110" height="50"></img>
      </a>
      
      {/* Title, on click will navigate to the landing page page */}
      <Link to="/home">
        <h2 className="nav-title">Session Selector and Voting</h2>
      </Link>

        {/* If no user is logged in, show these links */}
        {!mobileScreen && 
      (<>
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* About and FAQ pages are visable at all times. */}
        <Link className="navLink" to="/about">
          About
        </Link>

        <Link className="navLink" to="/faq">
          FAQ
        </Link>

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/submission">
              Submission Form
            </Link>

            {/* <Link className="navLink" to="/panelistView">
              Search
            </Link>

            <Link className="navLink" to="/leaderboard">
              Leaderboard
            </Link> */}
          </>
        )}

        {!user.id &&
          <Button className="navSignin" onClick={() => history.push('/login')}
          sx={{ ml: 'auto', mr: '20px', bgcolor: "#0c495a",
             color: "#FBBD19", '&:hover': { background: "#0c495a"}, p: 2, mb: -1,
            borderRadius: '5%' }}>
            Sign In
          </Button>
        }
        </>)}
        {/* If a user is logged in, show the username div dropdown */}
        {user.id && 
        <div className="navSignin">
          <List sx={{ ml: 'auto' }}>

            {/* This is the button in the upper right hand corner
            that displays the user's first name */}
            <ListItemButton sx={{ textAlign: 'right', bgcolor: "#0c495a",
                color: "#FBBD19", '&:hover': { background: "#0c495a"}, p: 2 }} onClick={handleClick}>
                  {!mobileScreen && (
                  <>
                  <div className="navSignin">
                  Welcome, {user.first_name}!
                </div>
                {/* If Open state is true, expand the div with the user's first name */}
              {open ? <ExpandLess /> : <ExpandMore />}
                </>)
                  }
                  {mobileScreen && (
                    <>
                    {open ? <CloseIcon sx={{ ml: 'auto' }} /> : <MenuIcon />}
                    </>
                  )}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{height: '0px'}}>

              {/* If the logged in user is an admin, display the admin dropdown option */}
              {user.admin && 
              <ListItemButton 
                sx={{ textAlign: 'right', color: "#FBBD19", bgcolor: "#0c495a", 
                    '&:hover': { background: "#0c495a"} }} 
                onClick={pushToAdmin}>

                  <ListItemText primary="Admin" />

              </ListItemButton>
              }
                {user.admin &&
                  <ListItemButton
                    sx={{
                      textAlign: 'right', color: "#FBBD19", bgcolor: "#0c495a",
                      '&:hover': { background: "#0c495a" }
                    }}
                    onClick={pushToAdminContent}>

                    <ListItemText primary="Edit Content" />

                  </ListItemButton>
                }

                <ListItemButton
                  sx={{
                    textAlign: 'right', color: "#FBBD19", bgcolor: "#0c495a",
                    '&:hover': { background: "#0c495a" }
                  }}
                  onClick={pushToMySubmissions}>

                  <ListItemText primary="My Submissions" />

                </ListItemButton>

                {mobileScreen &&
                <>
                <ListItemButton
                sx={{
                  textAlign: 'right', color: "#FBBD19", bgcolor: "#0c495a",
                  '&:hover': { background: "#0c495a" }
                }}
                onClick={pushToSubmission}>

                <ListItemText primary="Submission Form" />

              </ListItemButton>
                <ListItemButton
                sx={{
                  textAlign: 'right', color: "#FBBD19", bgcolor: "#0c495a",
                  '&:hover': { background: "#0c495a" }
                }}
                onClick={pushToAbout}>

                <ListItemText primary="About" />

              </ListItemButton>
              <ListItemButton
              sx={{
                textAlign: 'right', color: "#FBBD19", bgcolor: "#0c495a",
                '&:hover': { background: "#0c495a" }
              }}
              onClick={pushToFAQ}>

              <ListItemText primary="FAQ" />

            </ListItemButton>
            </>}

                {/* On click of logout button, the user will be moved to the Landing Page
                  and logged out of their account. */}
                <ListItemButton 
                  sx={{ textAlign: 'right', mb: -20, mt: -1, bgcolor: "#0c495a", 
                      color: "#FBBD19", '&:hover': { background: "#0c495a"},
                      borderBottomLeftRadius: '5%', borderBottomRightRadius: '5%' }} 
                  onClick={pushToLogout}>

                  <ListItemText primary="Logout" />

                </ListItemButton>

              </List>
            </Collapse>
          </List>
        </div>
        }
    </div>
  )
}

export default Nav;
