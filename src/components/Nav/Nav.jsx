import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

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

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link> */}

            <Link className="navLink" to="/submission">
              Submission Form
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navSignin" to="/login">
              Sign In
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>

        <Link className="navLink" to="/faq">
          Faq
        </Link>

        <Link className="navSignin" to="/login">
          Sign In
        </Link>
    </div>
  )
}

export default Nav;
