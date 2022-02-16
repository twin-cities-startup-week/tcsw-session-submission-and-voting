import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import * as Showdown from "showdown";
import 'react-mde/lib/styles/css/react-mde-all.css';
import AdminContentBlock from './AdminContentBlock';

//Material-ui
import {
    Card,
    makeStyles,
    Button,
} from "@material-ui/core";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
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
    feedback: {
        backgroundColor: '#fff',
    },
});

function AdminContentPage() {
    const dispatch = useDispatch();
    //Get all the session
    useEffect(() => {
        dispatch({ type: "FETCH_CONTENT_BLOCKS" });
    }, [dispatch]);

    return (
        <div>
            <h2>About Us</h2>
            <AdminContentBlock content="about" />
            <br />
            <h2>Home</h2>
            <AdminContentBlock content="home1" />
            <h2>Home List</h2>
            <AdminContentBlock content="home2" />
        </div>
    );
}

export default AdminContentPage;
