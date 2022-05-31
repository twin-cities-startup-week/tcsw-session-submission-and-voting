import React, {useState, useEffect} from 'react';
import FaqItemPage from '../FaqItemPage/FaqItemPage';
import Typography from '@mui/material/Typography';
import './Faq.css';
import { useDispatch, useSelector } from "react-redux";
import ReactGA from 'react-ga';

//Material-ui
import { Paper, makeStyles } from "@material-ui/core";  
    //Styling
  const useStyles = makeStyles({
    root: {
        maxWidth: '920px',
        margin: '0 auto',
        padding: '5px 20px 50px 20px', 
    },
    shadow: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        paddingTop: '10px',
        paddingBottom: '10px',
        width: '100%',
    },
    content: {
        paddingTop: '33px',
    }
  });

function FaqPage (){
    const classes = useStyles();
    const dispatch = useDispatch();
    const { faq } = useSelector((store) => store.content);
    useEffect(() => {
        dispatch({ type: "FETCH_FAQ" });
    }, [dispatch]);
      
    useEffect(() => {
        if (process.env.REACT_APP_GA_CODE) {
            ReactGA.pageview('/faq');
        }
    }, []);
  
    return (
        <div className={classes.root}> 
            <div className={classes.content}>
                <Typography variant="h2">
                    TCSW Session Submission & Voting
                </Typography>
                <h4> 2022 Session Submission Dates</h4>
                <p> Session Submission Deadline: April 6, 2022 to June 12, 2022</p>
                <p> Session Voting Deadline: June 16, 2021 to June 29, 2022</p>
                <br />
            </div>  
            <div className={classes.shadow}>
                {faq.map((faq, i) =>
                    <FaqItemPage faq={faq} index={i} />
                )}
            </div>      

        
        </div>
    )}


export default FaqPage;