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
import { makeStyles } from '@mui/styles';

// Styling
const useStyles = makeStyles({
    root: {
        maxWidth: '920px',
        margin: '0 auto',
        padding: '15px',
    }
});

function AdminUserList() {
    const classes = useStyles();
    //set selector
    const reduxStore = useSelector((store) => store);
    const dispatch = useDispatch();

    //set selector
    const { userList } = reduxStore;

    const history = useHistory();

    //Get all the session
    useEffect(() => {
        dispatch({ type: "FETCH_USER_LIST" });
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow className="tableRow">
                            <TableCell>
                                <h4>Name</h4>
                            </TableCell>
                            <TableCell >
                                <h4>Email</h4>
                            </TableCell>
                            <TableCell >
                                <h4>Admin</h4>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((person, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Typography variant="body1">{person.first_name} {person.last_name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">{person.email}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">{person.admin ? 'Yes' : 'No'}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AdminUserList;
