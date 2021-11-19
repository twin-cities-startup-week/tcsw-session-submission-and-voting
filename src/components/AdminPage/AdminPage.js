import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AdminPageItem from "./AdminPageItem/AdminPageItem";
//Material-ui
import { Grid, Card, Container, Paper, makeStyles, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow } from "@material-ui/core";

// Styling
const useStyles = makeStyles({
  root: {
    marginRight: "1000px",
    marginLeft: "10px",
    marginBottom: "100px",
    // paddingTop: '300px',
    //paddingLeft: '3000px',
    border: "2px solid",
  },
});

// Styling
const useStylish = makeStyles({
  rooty: {
    marginLeft: "400px",
    marginRight: "600px",
    marginTop: "-200px",
    paddingTop: "40px",
    border: "2px solid",
    justifyContent: "center",
  },
});

// Styling
const useStyle = makeStyles({
  roots: {
    marginLeft: "800px",
    marginRight: "300px",
    marginTop: "-130px",
    paddingTop: "40px",
    paddingRight: '20px',
    border: "2px solid",
    justifyContent: "center",
  },
});


// Styling
const useSty = makeStyles({
    center: {
        marginLeft: 'auto'
    }
  });


// Styling
const useStyli = makeStyles({
    right: {
        marginLeft: '-100px',
       
    }
  });

function AdminPage() {
  const classes = useStyles();
  const classic = useStylish();
  const classy = useStyle();
  const classics = useStyli();
  const clay = useSty();


  //set selector
  const reduxStore = useSelector((store) => store);
  const { setAllSession } = reduxStore;
  const dispatch = useDispatch();

  //set selector
  const { setSessionList } = reduxStore;
  const { setHighestVoting } = reduxStore;
  const { setAwaitingApproval } = reduxStore;
  const { setApprovalAwaitingInfo } = reduxStore;
  const { setApprovedInfo } = reduxStore;

  const history = useHistory();

  //Get all the session
  useEffect(() => {
    dispatch({ type: "FETCH_SESSION" });
    dispatch({ type: "FETCH_TOTAL_SESSION" });
    dispatch({ type: "FETCH_HIGHEST_VOTING" });
    dispatch({ type: "FETCH_AWAITING_APPROVAL" });
    dispatch({ type: "FETCH_APPROVAL_AWAITING_INFO" });
    dispatch({ type: "FETCH_APPROVED_INFO" });
  }, [dispatch]);

  const gotoDetails = (session) =>{
    dispatch({ type: 'FETCH_PANEL_DETAILS', payload: session})

    history.push('/votepage')
  }

  return (
    <>
      <div>
        {/* {JSON.stringify(setAllSession)} */}
        {setAllSession.map((sessionInfo, index) => (
          <AdminPageItem key={sessionInfo.id} sessionInfo={sessionInfo} />
        ))}
      </div>

      <div>
        <Card className={classes.root} variant="outlined">
          {/* {JSON.stringify(setSessionList)} */}
          {setSessionList.map((session, index) => (
            <div key={index}>
              {" "}
              <p>Total Number of Sessions Approved:</p>
              {session.count}
            </div>
          ))}
        </Card>
      </div>

      <div>
        <Card className={classic.rooty} variant="outlined">
          {/* {JSON.stringify(setHighestVoting)} */}
          {setHighestVoting.map((session, index) => (
            <div key={index}>
              {" "}
              <p>Highest Ranked Session:</p>
              {session.title}
            </div>
          ))}
        </Card>
      </div>

      <div>
        <Card className={classy.roots} variant="outlined">
          {/* {JSON.stringify(setAwaitingApproval)} */}
          {setAwaitingApproval.map((session, index) => (
            <div key={index}>
              {" "}
              <p>Number of Sessions Awaiting Approval:</p>
              {session.count}
            </div>
          ))}
        </Card>
      </div>
      <h3> Awaiting Approval</h3>
      <Container >
      <Grid container spacing={3}>
      <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={4}>
        <TableContainer component={Paper}>
          <Table sx={{ width: "20%" }} aria-label="simple table">
            <TableHead className={classics.center}>
              <TableRow>
                <TableCell>
                  <h4>Title</h4>
                </TableCell>
                <TableCell>
                  <h4>Votes</h4>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {setApprovalAwaitingInfo.map((session, index) => (
                <TableRow key={index}>
                  <TableCell><p onClick={() => gotoDetails (session)}>{session.title}</p></TableCell>
                  <TableCell>{session.votes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>
      </Grid>
      </Container>

      <h3>Approved</h3>
      <Container>
      <Grid container spacing={3}>
      <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={4}>
        <TableContainer component={Paper}>
          <Table sx={{ width: "20%" }} aria-label="simple table">
            <TableHead className={clay.right}>
              <TableRow>
                <TableCell>
                  <h4>Title</h4>
                </TableCell>
                <TableCell>
                  <h4>Votes</h4>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {setApprovedInfo.map((session, index) => (
                <TableRow key={index}>
                  <TableCell > <p onClick={() => gotoDetails (session)}>{session.title}</p></TableCell>
                  <TableCell>{session.votes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
        </Grid>
        </Grid>
        </Container>
       
    </>
  );
}

export default AdminPage;
