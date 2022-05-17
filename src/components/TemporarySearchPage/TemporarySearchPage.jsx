import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarkdownView from 'react-showdown';
import { makeStyles } from "@material-ui/core";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

// Styling
const useStyles = makeStyles({
    root: {
        maxWidth: '920px',
        margin: '0 auto',
        padding: '15px',
    }
});

function TemporarySearchPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { block } = useSelector((store) => store.content);
    //Get all the session
    useEffect(() => {
        dispatch({ type: "FETCH_CONTENT_BLOCKS" });
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <MarkdownView
                style={{ width: '95%' }}
                markdown={block['search']}
            />
        </div>
    );
}

export default TemporarySearchPage;
