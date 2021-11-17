import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import AdminPageItem from './AdminPageItem/AdminPageItem';
//Material-ui
import { Button, Card, Paper, makeStyles, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
  


  // Styling
  const useStyles = makeStyles({
    root: {
        marginRight: '1000px',
        marginLeft: '10px',
        marginBottom: '100px',
        // paddingTop: '300px',
        //paddingLeft: '3000px',
        border: '2px solid',
        
    }
  });


  // Styling
  const useStylish = makeStyles({
    rooty: {
        marginLeft: '400px',
        marginRight: '600px',
        marginTop:   '-180px',
        paddingTop: '40px',
        border: '2px solid',
        justifyContent: 'center',
    }
  });




  // Styling
  const useStyle = makeStyles({
    roots: {
        marginLeft: '800px',
        marginRight: '300px',
        marginTop:   '-150px',
        paddingTop: '40px',
        border: '2px solid',
        justifyContent: 'center',
    }
  });


function AdminPage() {
    const classes = useStyles();
    const classic = useStylish();
    const classy = useStyle();

//set selector
const reduxStore = useSelector((store) => store);
const {setAllSession} = reduxStore;
const dispatch = useDispatch();


//set selector
const {setSessionList} = reduxStore;
const {setHighestVoting} = reduxStore;
const {setAwaitingApproval} = reduxStore;
const {setApprovalAwaitingInfo} = reduxStore;
const {setApprovedInfo} = reduxStore;





//Get all the session
useEffect(() => {
    dispatch({type: "FETCH_SESSION"});
    dispatch({type: "FETCH_TOTAL_SESSION"});
    dispatch({type: "FETCH_HIGHEST_VOTING"});
    dispatch({type: "FETCH_AWAITING_APPROVAL"});
    dispatch({type: "FETCH_APPROVAL_AWAITING_INFO"});
    dispatch({type: "FETCH_APPROVED_INFO"});
}, [dispatch]);



    return (
        <>
        <div> 

            {/* {JSON.stringify(setAllSession)} */}
                {setAllSession.map((sessionInfo, index) => (
                    <AdminPageItem key={sessionInfo.id} 
                    sessionInfo={sessionInfo}
                    />
                ))}
        </div>

        <div> 
        <Card className={classes.root}  variant="outlined"> 
            {/* {JSON.stringify(setSessionList)} */}
                {setSessionList.map((session, index) => (
                    <div  key={index}> <p>Total Number of Sessions Approved:</p>
                    {session.count}</div>
                ))}
             </Card>
        </div>

        <div>     
<Card className={classic.rooty} variant="outlined">  
    {/* {JSON.stringify(setHighestVoting)} */}
        {setHighestVoting.map((session, index) => (
            <div  key={index}> <p>Highest Ranked Session:</p>
            {session.title}</div>
        ))}  
     </Card>   
        </div>

        <div>
                     
<Card className={classy.roots} variant="outlined">
    {/* {JSON.stringify(setAwaitingApproval)} */}
        {setAwaitingApproval.map((session, index) => (
            <div  key={index}> <p>Number of Sessions Awaiting Approval:</p>
            {session.count}</div>
        ))}
    </Card>  
        </div>
        <h3> Awaiting Approval</h3>
        <div> 
        <TableContainer component={Paper}>
          <Table sx={{ width: '20%' }} aria-label="simple table">
            <TableHead className={classes.tableStyles}>
              <TableRow>
                <TableCell><h4>Title</h4></TableCell>
                <TableCell><h4>Votes</h4></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {setApprovalAwaitingInfo.map((session, index) => (
                <TableRow key={index}>
                  <TableCell>{session.title}</TableCell>
                  <TableCell>{session.votes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>


        <div>
        <h3>Approved</h3>
        <TableContainer component={Paper}>
          <Table sx={{ width: '20%' }} aria-label="simple table">
            <TableHead className={classes.tableStyles}>
              <TableRow>
                <TableCell><h4>Title</h4></TableCell>
                <TableCell><h4>Votes</h4></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {setApprovedInfo.map((session, index) => (
                <TableRow key={index}>
                  <TableCell>{session.title}</TableCell>
                  <TableCell>{session.votes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>

        </>
    )
}

export default AdminPage;





















