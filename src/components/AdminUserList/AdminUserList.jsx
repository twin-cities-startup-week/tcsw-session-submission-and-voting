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
    Dialog,
    DialogTitle,
    DialogContent,
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
    const userList = useSelector((store) => store.userList);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const history = useHistory();

    //Get all the session
    useEffect(() => {
        dispatch({ type: "FETCH_USER_LIST" });
    }, [dispatch]);

    const onComplete = () => {
        setOpen(false);
    }

    const addAdmin = (userId) => () => {
        setOpen(true);
        dispatch({ type: "PROMOTE_USER_TO_ADMIN", payload: userId, onComplete });
    }

    const removeAdmin = (userId) => () => {
        setOpen(true);
        dispatch({ type: "DEMOTE_ADMIN_USER", payload: userId, onComplete });
    }

    const downloadUserListCSV = () => {
        // dispatch({ type: 'GOOGLE_LOGIN' })
        const time = new Date().getTime();
        if (process.env.NODE_ENV === 'production') {
            window.open(`${window.location.protocol}//${window.location.host}/api/admin/users/csv?t=${time}`);
        } else {
            window.open(`http://localhost:5000/api/admin/users/csv?t=${time}`);
        }

    }

    return (
        <div className={classes.root}>
            <Dialog open={open}>
                <DialogTitle id="responsive-dialog-title">
                    Please wait...
                </DialogTitle>
                <DialogContent align="center">
                    <span role="img" aria-label="loading">???</span>
                    {/* TODO: Add animation */}
                </DialogContent>
                {/* This modal can't be closed. */}
            </Dialog>
            <Grid item lg={12} xl={12} style={{ padding: '5px 30px' }}>
                <Button onClick={downloadUserListCSV}>Download CSV</Button>
            </Grid>
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
                            <TableCell colSpan={2}>
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
                                    <Typography variant="body1">
                                        {person.admin ? 'Yes' : 'No'}
                                        
                                    </Typography>
                                    
                                </TableCell>
                                <TableCell style={{width: '250px'}}>
                                    {
                                        person.admin ? (
                                            <>
                                                {
                                                    // Users should not see a button for their user record
                                                    user.id !== person.id && (
                                                        <Button
                                                            style={{ float: 'right', marginLeft: '20px', marginTop: '-4px' }}
                                                            color="error"
                                                            onClick={removeAdmin(person.id)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <Button
                                                style={{ float: 'right', marginLeft: '20px' }}
                                                color="success"
                                                onClick={addAdmin(person.id)}
                                            >
                                                Make Admin
                                            </Button>
                                        )
                                    }
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
