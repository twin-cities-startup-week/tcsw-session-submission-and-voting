import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

//Material-ui
import { Button, Paper, Card, makeStyles} from "@material-ui/core";
import { session } from 'passport';

   // Styling
   const useStyles = makeStyles({
    root: {
        marginRight: '1000px',
        marginLeft: '10px',
        paddingTop: '100px',
        border: '2px solid',
        justifyContent: 'center',
        // textAlign: 'justify',
        // position: 'relative',
        // bottom: '20px'
       

    }
  });


function adminPage(){
    const classes = useStyles();

//set selector
const reduxStore = useSelector((store) => store);
const {setSessionList} = reduxStore;
const dispatch = useDispatch();

//Get all the session
useEffect(() => {
    dispatch({type: "FETCH_SESSION", payload: session.title});
}, [dispatch]);



    return (
        <Card className={classes.root} variant="outlined">
            {/* {JSON.stringify(setSessionList)} */}
                {setSessionList.map((session, index) => (
                    <div  key={index}> <p>Total Number of Sessions Submitted:</p>{session.count}</div>
                ))}
            </Card>

    )
}


export default adminPage;