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

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const pushToSubmission = () => {
    setOpen(!open);
    history.push('/submission');
  }
  const pushToVote = () => {
    setOpen(!open);
    history.push('/panelistView');
  }
  const pushToLogout = () => {
    setOpen(!open);
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <div className="nav">
      <a href="https://www.twincitiesstartupweek.com/" target="_blank"> 
        <img src="images/TCSW_Logo_Navy.png" alt="TCSW logo" width="110" height="50"></img>
      </a>
      <Link to="/home">
        <h2 className="nav-title">Session Selector and Voting</h2>
      </Link>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        <Link className="navLink" to="/about">
          About
        </Link>

        <Link className="navLink" to="/faq">
          Faq
        </Link>

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link> */}

            <Link className="navLink" to="/submission">
              Submission Form
            </Link>

            <Link className="navLink" to="/panelistView">
              Search
            </Link>

            <Link className="navLink" to="/leaderboard">
              Leaderboard
            </Link>

            {user.admin && 
            <Link className="navLink" to="/admin">
              Admin
            </Link>
            }

            {/* <LogOutButton className="navLink" /> */}
          </>
        )}

        {!user.id &&
          <Link className="navSignin" to="/login">
            Sign In
          </Link>
        }
        
        {user.id && 
        <div className="navSignin">
          <List sx={{ ml: 'auto' }}>

            <ListItemButton onClick={handleClick}>
              <Link className="navSignin" to="/login">
                Welcome, {user.username}!
              </Link>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <ListItemButton sx={{ textAlign: 'right' }} 
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
