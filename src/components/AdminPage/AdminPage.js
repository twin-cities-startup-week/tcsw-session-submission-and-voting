import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

//Material-ui
import { Button, Paper, Card, makeStyles} from "@material-ui/core";

   // Styling
   const useStyles = makeStyles({
    root: {
        marginRight: '800px',
        marginLeft: '10px',
        paddingTop: '200px',

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
    dispatch({type: "FETCH_SESSION"});
}, [dispatch]);



    return (
        <Card className={classes.root} variant="outlined">
            {/* {JSON.stringify(setSessionList)} */}
                {setSessionList.map((session, index) => (
                    <div  key={index}> {session.title}</div>
                ))}
            </Card>

    )
}


export default adminPage;