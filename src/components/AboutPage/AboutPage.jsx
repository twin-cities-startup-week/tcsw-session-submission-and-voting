import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkdownView from 'react-showdown';
import { Paper,Button, makeStyles } from "@material-ui/core";
import ReactGA from 'react-ga';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

 // Styling
const useStyles = makeStyles({
  root: {
    maxWidth: '920px',
    margin: '0 auto',
    padding: '5px 20px 50px 20px', 
  }
});

function AboutPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { block } = useSelector((store) => store.content);
  //Get all the session
  useEffect(() => {
    dispatch({ type: "FETCH_CONTENT_BLOCKS"});
  }, [dispatch]);

  useEffect(() => {
    if (process.env.REACT_APP_GA_CODE) {
      ReactGA.pageview('/about');
    }
    if (user && !user.id) {
      // Used to redirect back to this page after login
      localStorage.setItem('PREVIOUS_PAGE', '/about');
    }
  }, []);

  return (
      <div className={classes.root}>
        <MarkdownView
          style={{width: '95%'}}
          markdown={block['about']}
        />
      </div>
  );
}

export default AboutPage;
