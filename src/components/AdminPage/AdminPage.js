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


  // Styling
  const useStyle = makeStyles({
    roots: {
        marginLeft: '700px',
        marginRight: '300px',
        marginBottom:   '6000px',
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
    const classy = useStyle();

//set selector
const reduxStore = useSelector((store) => store);
const {setSessionList} = reduxStore;
const dispatch = useDispatch();



//set selector
const reduxStore1 = useSelector((store) => store);
const {setAwaitingApproval} = reduxStore1;
const dispatch1 = useDispatch();


//Get count the total number of title in session
useEffect(() => {
    dispatch({type: "FETCH_SESSION", payload: session.title});
    dispatch1({type: "FETCH_AWAITING_APPROVAL", payload: session.title});
}, [dispatch]);


//Get count the total number of title in session
// useEffect(() => {
//     dispatch1({type: "FETCH_AWAITING_APPROVAL", payload: session.title});
// }, [dispatch1]);




    return (
        <>
        
        <Card className={classes.root} variant="outlined">
            {/* {JSON.stringify(setSessionList)} */}
                {setSessionList.map((session, index) => (
                    <div  key={index}> <p>Total Number of Sessions Approved:</p>{session.count}</div>
                ))}
            </Card>
            


<Card className={classy.roots} variant="outlined">
    {JSON.stringify(setAwaitingApproval)}
        {setAwaitingApproval.map((session, index) => (
            <div  key={index}> <p>Number of Sessions Awaiting Approval:</p>
            {session.count}</div>
        ))}
    </Card>
    
    </>

    )
}


export default adminPage;