import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import MarkdownView from 'react-showdown';

// Styling
const useStyles = makeStyles({
    root: {
        maxWidth: '920px',
        margin: '0 auto',
        padding: '5px 20px 50px 20px',
    },
    content: {
        paddingTop: '33px',
    },
    item: {
        paddingTop: '33px',
        ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
            display: 'flex',
        },
    },
    title: {
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    previewImage: {
        height: '200px',
        width: '200px',
        objectFit: 'cover',
        padding: 0,
    }
});
const getArray = (value) => {
    let result = [];
    if (typeof value === 'string') {
        result = JSON.parse(value);
    } else if (Array.isArray(value)) {
        result = value;
    }
    return result;
}
function Leaderboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const leaderboard = useSelector(store => store.session.leaderboard);
    const classes = useStyles();
    /* Grabs approved submissions ordered from highest to lowest votes on page load */
    useEffect(() => {
        dispatch({ type: 'FETCH_LEADERBOARD' })
    }, [])

    return (
        <>
        {/* Leaderboard ribbon CSS is located in App.css */}
        <div className="bar">
            Leaderboard
            {/* Used for banner */}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <Container sx={{ mt: 5, mb: 5 }}>
            {
                leaderboard
                && leaderboard.map(session => (
                    <>
                        <div className={classes.item}>
                            <div style={{ paddingRight: '20px' }}>
                                <img src={session.image || 'images/TCSW_session_selector_lightblue.png'} className={classes.previewImage} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Button component={Paper} elevation={8}
                                    variant="contained"
                                    type="submit"
                                    name="submit"
                                    value="Log In"
                                    sx={{ float: 'right', marginTop: '8px' }}
                                    onClick={() => history.push(`/votepage/${session.id}`)}
                                >
                                    View Details
                                </Button>
                                <Typography className={classes.title} variant="h3">
                                    {session.title}
                                </Typography>
                                <Typography variant="body"><strong>Track:</strong> {session.track} | <strong>Format:</strong> {session.format} | <strong>Industry:</strong> {getArray(session.industry).join(', ')}</Typography>
                                <MarkdownView
                                    markdown={session.description}
                                />

                            </div>

                        </div>
                        <hr />
                    </>
                ))
            }
        </Container>
        </>
    )
}

export default Leaderboard;