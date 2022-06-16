import React, {useState, useEffect} from 'react';
import FaqItemPage from '../FaqItemPage/FaqItemPage';
import Typography from '@mui/material/Typography';
import MarkdownView from 'react-showdown';
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
  });

function FaqPage (){
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const { faq } = useSelector((store) => store.content);
    const { block } = useSelector((store) => store.content);
    useEffect(() => {
        dispatch({ type: "FETCH_FAQ" });
        dispatch({ type: "FETCH_CONTENT_BLOCKS" });
    }, [dispatch]);
      
    useEffect(() => {
        if (process.env.REACT_APP_GA_CODE) {
            ReactGA.pageview('/faq');
        }
        if (user && !user.id) {
            // Used to redirect back to this page after login
            localStorage.setItem('PREVIOUS_PAGE', '/faq');
        }
    }, []);
  
    return (
        <div className={classes.root}> 
            <MarkdownView
                style={{ width: '95%' }}
                markdown={block['faq']}
            />
            <div className={classes.shadow}>
                {faq.map((faq, i) =>
                    <FaqItemPage faq={faq} index={i} />
                )}
            </div>      

        
        </div>
    )}


export default FaqPage;