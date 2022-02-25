import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';

import * as Showdown from "showdown";
import 'react-mde/lib/styles/css/react-mde-all.css';
import AdminContentBlock from './AdminContentBlock';

//Material-ui
import {
    makeStyles,
} from "@mui/styles";

// Styling
const useStylish = makeStyles({
    rooty: {
        margin: "0px 10px",
        textAlign: "center",
    },
    feedback: {
        backgroundColor: '#fff',
    },
});

function AdminContentPage() {
    const dispatch = useDispatch();
    const classes = useStylish();
    //Get all the session
    useEffect(() => {
        dispatch({ type: "FETCH_CONTENT_BLOCKS" });
    }, [dispatch]);

    return (
        <div className={classes.rooty}>
            <Typography variant="h2">
                About Us
            </Typography>
            <br />
            <AdminContentBlock content="about" />
            <br />
            <br />
            <Typography variant="h2">
                Home
            </Typography>
            <br />
            <AdminContentBlock content="home1" />
            <br />
            <br />
            <Typography variant="h2">
                Home List
            </Typography>
            <br />
            <AdminContentBlock content="home2" />
        </div>
    );
}

export default AdminContentPage;
