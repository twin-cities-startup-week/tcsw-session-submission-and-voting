import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AdminPageItem from "./AdminPageItem/AdminPageItem";
//Material-ui
import {
  Typography,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import { makeStyles } from '@mui/styles';

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
    dispatch({ type: "FETCH_AWAITING_APPROVAL" });
    dispatch({ type: "FETCH_APPROVAL_AWAITING_INFO" });
    dispatch({ type: "FETCH_APPROVED_INFO" });
  }, [dispatch]);

  const gotoDetails = (session) => {
    history.push(`/votepage/${session.id}`);
  };

  return (
    <>
      <div>
        {/* {JSON.stringify(setAllSession)} */}
        {setAllSession.map((sessionInfo, index) => (
          <AdminPageItem key={sessionInfo.id} sessionInfo={sessionInfo} />
        ))}
      </div>
      <Grid container spacing={1} style={{width: '100%', marginTop: '15px'}}>
        <Grid item lg={12} xl={6}>
          <Container>
            <div
              style={{
                border: "1px solid black",
                borderRadius: "0px",
                backgroundColor: "#0c495a",
                margin: "0px",
                color: "#fbbd19"
              }}
            >
              <h3 style={{ textAlign: "center" }}>Awaiting Approval ({setApprovalAwaitingInfo.length})</h3>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead className={classics.center}>
                  <TableRow className="tableRow">
                    <TableCell>
                      <h4>Title</h4>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <h4>Email</h4>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {setApprovalAwaitingInfo.map((session, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body1">{session.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{session.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={() => gotoDetails(session)}>Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>

        <Grid item lg={12} xl={6}>
          <Container>
            <div
              style={{
                border: "1px solid black",
                borderRadius: "0px",
                backgroundColor: "#0c495a",
                margin: "0px",
                width: '100%',
                color: "#fbbd19"
              }}
            >
              <h3 style={{ textAlign: "center" }}>Approved ({setApprovedInfo.length})</h3>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead className={clay.right}>
                  <TableRow>
                    <TableCell>
                      <h4>Title</h4>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <h4>Email</h4>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {setApprovedInfo.map((session, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body1">{session.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{session.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={() => gotoDetails(session)}>Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminPage;
