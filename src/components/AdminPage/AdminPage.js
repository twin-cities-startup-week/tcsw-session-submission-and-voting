import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AdminPageItem from "./AdminPageItem/AdminPageItem";
//Material-ui
import {
  Grid,
  Card,
  Container,
  Paper,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import "./AdminPage.css";

// Styling
const useStyles = makeStyles({
  root: {
    margin: "0px 10px",
    textAlign: "center",
    fontSize: "20px",
    border: "2px solid",
  },
});

// Styling
const useStylish = makeStyles({
  rooty: {
    margin: "0px 10px",
    fontSize: "20px",

    // marginLeft: "400px",
    // marginRight: "600px",
    // //marginTop: "-190px",
    // paddingTop: "30px",
    // paddingRight: '80px',
    border: "2px solid",
    textAlign: "center",
  },
});

// Styling
const useStyle = makeStyles({
  roots: {
    margin: "0px 10px",
    fontSize: "20px",

    // marginLeft: "700px",
    // marginRight: "300px",
    //marginTop: "-100px",
    //paddingTop: "40px",
    // paddingRight: '30px',
    border: "2px solid",
    textAlign: "center",

    // justifyContent: "center",
  },
});

// Styling
const useSty = makeStyles({
  center: {
    // marginLeft: 'auto'
  },
});

// Styling
const useStyli = makeStyles({
  right: {
    //marginLeft: '-100px',
  },
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

  const gotoDetails = (session) => {
    dispatch({ type: "FETCH_PANEL_DETAILS", payload: session });

    history.push("/votepage");
  };

  return (
    <>
      <div>
        {/* {JSON.stringify(setAllSession)} */}
        {setAllSession.map((sessionInfo, index) => (
          <AdminPageItem key={sessionInfo.id} sessionInfo={sessionInfo} />
        ))}
      </div>

      <div className="threeBlockGrid">
        <div>
          <Card
            className={classes.root}
            //card 1
            variant="outlined"
          >
            {/* {JSON.stringify(setSessionList)} */}
            {setSessionList.map((session, index) => (
              <div key={index}>
                {" "}
                <p>Total Number of Sessions Approved:</p>
                <h3>{session.count}</h3>
              </div>
            ))}
          </Card>
        </div>

        <div>
          <Card
            className={classic.rooty}
            //card 2
            variant="outlined"
          >
            {/* {JSON.stringify(setHighestVoting)} */}
            {setHighestVoting.map((session, index) => (
              <div key={index}>
                {" "}
                <p>Highest Ranked Session:</p>
                <h3>{session.title}</h3>
              </div>
            ))}
          </Card>
        </div>

        <div>
          <Card
            className={classy.roots}
            //card 3
            variant="outlined"
          >
            {/* {JSON.stringify(setAwaitingApproval)} */}
            {setAwaitingApproval.map((session, index) => (
              <div key={index}>
                {" "}
                <p>Number of Sessions Awaiting Approval:</p>
                <h3>{session.count}</h3>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div className="masterTableContainer">
        <div className="leftTable">
          <div
            style={{
              border: "2px solid black",
              borderRadius: "4px",
              backgroundColor: "#0c495a",
              margin: "10px 14px 13px",
              color: 'yellow'
            }}
          >
            <h3 style={{ textAlign: "center" }}>Awaiting Approval</h3>
          </div>
          <Container>
            <Grid container spacing={3}>
              <TableContainer component={Paper}>
                <Table sx={{ width: "20%" }} aria-label="simple table">
                  <TableHead className={classics.center}>
                    <TableRow className="tableRow">
                      <TableCell>
                        <h4>Title</h4>
                      </TableCell>
                      <TableCell>
                        <h4>Email</h4>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {setApprovalAwaitingInfo.map((session, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <p onClick={() => gotoDetails(session)}>
                            {session.title}
                          </p>
                        </TableCell>
                        <TableCell>{session.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Container>
        </div>

        <div className="rightTable">
          <div
            style={{
              border: "2px solid black",
              borderRadius: "4px",
              backgroundColor: "#0c495a",
              margin: "10px 14px 13px",
              color: 'yellow'
            }}
          >
            <h3 style={{ textAlign: "center" }}>Approved</h3>
          </div>
          <Container>
            <Grid container spacing={3}>
              <TableContainer component={Paper}>
                <Table sx={{ width: "20%" }} aria-label="simple table">
                  <TableHead className={clay.right}>
                    <TableRow>
                      <TableCell>
                        <h4>Title</h4>
                      </TableCell>
                      <TableCell>
                        <h4>Email</h4>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {setApprovedInfo.map((session, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <p onClick={() => gotoDetails(session)}>
                            {session.title}
                          </p>
                        </TableCell>
                        <TableCell>{session.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
