import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

// Styling
const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: '920px',
        margin: '0 auto',
        padding: '15px',
    },
    content: {
        paddingTop: '33px',
    },
    item: {
        paddingTop: '33px',
        display: 'flex',
    },
    title: {
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    previewImage: {
        height: '300px',
        width: '300px',
        objectFit: 'cover',
        padding: 0,
    }
});

function SubmissionListPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { userSubmissions } = useSelector((store) => store.submission);
    //Get all the session
    useEffect(() => {
        dispatch({ type: "GET_USER_SUBMISSIONS" });
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Typography variant="h2">
                    Your Submissions
                </Typography>
                {
                    userSubmissions
                    && userSubmissions.length === 0
                    && (
                        <Typography variant="body1">
                            You haven't submit any sessions yet.
                        </Typography>
                    )
                }
                {
                    userSubmissions
                    && userSubmissions.map(submission => (
                            <div className={classes.item}>
                                <div style={{paddingRight: '20px'}}>
                                    <img src={submission.image} className={classes.previewImage} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Button component={Paper} elevation={8}
                                        variant="contained"
                                        type="submit"
                                        name="submit"
                                        value="Log In"
                                        sx={{ float: 'right', marginTop: '8px' }}
                                        onClick={() => history.push(`/submission/${submission.id}/edit`)}
                                    >
                                        Edit Submission
                                    </Button>
                                    <Typography className={classes.title} variant="h3">
                                        {submission.title}
                                    </Typography>
                                    <Typography variant="body1">
                                        {submission.description}
                                    </Typography>
                                </div>
                            </div>  
                    ))
                }
            </div>
        </div>
    );
}

export default SubmissionListPage;
