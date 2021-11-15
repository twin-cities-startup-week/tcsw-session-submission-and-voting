import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Session Selector and Voting</h2>
        <img src="images/TCSW_Logo_Navy.png" alt="TCSW logo" width="100" height="100"></img>
      </Link>
      <div>
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
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/submission">
              Submission Form
            </Link>

            <Link className="navLink" to="/info">
              Info Page
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

        <Link className="navLink" to="/login">
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default Nav;
