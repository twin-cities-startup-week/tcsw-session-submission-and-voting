import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import "./AdminPage.css";

function AdminPage() {
  const dispatch = useDispatch();

  //set selector
  const { adminAwaitingApproval, adminApprovedSessions } = useSelector((store) => store.session);

  const history = useHistory();

  //Get all the session
  useEffect(() => {
    dispatch({ type: "FETCH_SESSIONS_AWAITING_APPROVAL" });
    dispatch({ type: "FETCH_ADMIN_APPROVED_SESSIONS" });
  }, [dispatch]);

  const gotoDetails = (session) => {
    history.push(`/votepage/${session.id}`);
  };

  const downloadSessionsCSV = () => {
    // dispatch({ type: 'GOOGLE_LOGIN' })
    const time = new Date().getTime();
    if (process.env.NODE_ENV === 'production') {
      window.open(`https://sessions.twincitiesstartupweek.com/api/admin/sessions/csv?t=${time}`);
    } else {
      window.open(`http://localhost:5000/api/admin/sessions/csv?t=${time}`);
    }

  }

  return (
    <>
      
      <Grid container spacing={1} style={{width: '100%', marginTop: '15px'}}>
        <Grid item lg={12} xl={12} style={{padding: '5px 30px'}}>
          <Button onClick={downloadSessionsCSV}>Download CSV</Button>
        </Grid>
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
              <h3 style={{ textAlign: "center" }}>Awaiting Approval ({adminAwaitingApproval.length})</h3>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
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
                  {adminAwaitingApproval.map((session, index) => (
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
              <h3 style={{ textAlign: "center" }}>Approved ({adminApprovedSessions.length})</h3>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
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
                  {adminApprovedSessions.map((session, index) => (
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
