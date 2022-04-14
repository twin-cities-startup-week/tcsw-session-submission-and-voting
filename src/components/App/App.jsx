import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import FaqPage from '../FaqPage/FaqPage';
import AdminPage from '../AdminPage/AdminPage';
import SubmissionPage from '../SubmissionPage/SubmissionPage';
import SearchPage from '../SearchPage/SearchPage'
import VotePage from '../VotePage/VotePage'; 
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ResetPassword from '../ResetPassword/ResetPassword';
import Leaderboard from '../Leaderboard/Leaderboard';
import AdminContentPage from '../AdminContentPage/AdminContentPage';
import SubmissionListPage from '../SubmissionListPage/SubmissionListPage';
import GlobalAlertModal from '../GlobalAlertModal/GlobalAlertModal';
import TemporarySearchPage from '../TemporarySearchPage/TemporarySearchPage';
import AdminUserList from '../AdminUserList/AdminUserList';
import './App.css';

import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: { // Name of the component / style sheet
      styleOverrides: {
        root: { // All variants will get these styles
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 0, // square corners
          fontSize: 16,
          lineHeight: '1.6em',
          textTransform: 'uppercase',
          letterSpacing: '.5px',
        },
        contained: {
          padding: '15px 19px 12px 19px',
          backgroundColor: '#0C495A',
          color: '#FBBD19',

        }
      },
    },
  },
  palette: {
    primary: {
      main: '#0C495A',
    },
  },
  typography: {
    root: {
      fontFamily: 'Poppins',
      color: '#676a6c',
      fontSize: 18,
    },
    h1: {
      fontSize: 42,
      fontWeight: 400,
      fontFamily: 'Poppins',
    },
    h2: {
      fontSize: 34,
      fontWeight: 400,
      fontFamily: 'Poppins',
      letterSpacing: 0,
    },
    h3: {
      fontSize: 28,
      fontWeight: 700,
      fontFamily: 'Poppins',
    },
    h4: {
      fontSize: 22,
      fontWeight: 700,
      fontFamily: 'Poppins',
    },
    body1: {
      fontSize: 18,
      fontWeight: 400,
      fontFamily: 'Poppins',
    },
    body2: {
      fontSize: 18,
      fontWeight: 700,
      fontFamily: 'Poppins',
    },
    caption: {
      fontSize: 16,
      fontFamily: 'Poppins',
    }
  },
})

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalAlertModal
        closeActionType="SET_GLOBAL_MODAL"
      />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
          <Nav />
          <div style={{ flexGrow: 1 }}>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:3000/about will show the about page. */}
              <Route
                // shows AboutPage at all times (logged in or not)
                exact
                path="/about"
              >
                <AboutPage />
              </Route>

              <Route
                exact path="/forgotPassword">
                  <ForgotPassword/>
              </Route>
              <Route
                exact path="/password/reset/:token">
                  <ResetPassword />
              </Route>
              <Route
                exact path="/home">
                  <LandingPage/>
              </Route>
              <Route
                // shows FaqPage at all times (logged in or not)
                exact
                path="/faq"
              >
                <FaqPage />
              </Route>
              <Route
                // shows TemporarySearchPage at all times (logged in or not)
                exact
                path="/search"
              >
                <TemporarySearchPage />
              </Route>
              <Route
                // shows adminPage at all times (logged in or not)
                exact
                path="/admin"
              >
                <AdminPage />
              </Route>

              <Route
                // shows adminPage at all times (logged in or not)
                exact
                path="/admin/content"
              >
                <AdminContentPage />
              </Route>

              <Route
                exact path='/leaderboard'>
                  <Leaderboard/>
              </Route>  

              <Route
                exact path='/user/submission'>
                  <SubmissionListPage />
              </Route>        

              {/* For protected routes, the view could show one of several things on the same route.
                Visiting localhost:3000/user will show the UserPage if the user is logged in.
                If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
                Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              
              {/* <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/user"
              >
                <UserPage />
              </ProtectedRoute> */}
    {/* 
              <ProtectedRoute
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/info"
              >
                <InfoPage />
              </ProtectedRoute> */}
              <ProtectedRoute
                exact
                path="/admin/user/list"
              >
                <AdminUserList />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path="/submission"
              >
                <SubmissionPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/submission/:id/edit"
              >
                <SubmissionPage />
              </ProtectedRoute>

              <Route exact path = "/votepage/:id">
                <VotePage />
              </Route>

              <Route exact path="/votepage">
                <SearchPage />
              </Route>

              <Route
                exact
                path="/login"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect to the /user page
                  <Redirect to="/home" />
                  :
                  // Otherwise, show the login page
                  <LoginPage />
                }
              </Route>

              <Route
                exact
                path="/registration"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /home page
                  <Redirect to="/home" />
                  :
                  // Otherwise, show the registration page
                  <RegisterPage />
                }
              </Route>

              <Route
                exact
                path="/home"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /home page
                  <Redirect to="/home" />
                  :
                  // Otherwise, show the Landing page
                  <LandingPage />
                }
              </Route>

              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
