import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';

import * as Showdown from "showdown";
import 'react-mde/lib/styles/css/react-mde-all.css';
import AdminFAQItem from './AdminFAQItem';

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

function AdminFAQPage() {
    const dispatch = useDispatch();
    const classes = useStylish();
    //Get all the session
    useEffect(() => {
        dispatch({ type: "FETCH_FAQ" });
    }, [dispatch]);
    const { faq } = useSelector((store) => store.content);

    return (
        <div className={classes.rooty}>
            <Typography variant="h2">
                FAQ
            </Typography>
            <br />
            {
                    faq
                    && faq.length > 0
                    && (
                        faq.map((faqItem, i) =>
                        <AdminFAQItem faqItem={faqItem} index={i} />
                    )
                    )
                }
            
        </div>
    );
}

export default AdminFAQPage;
