import './VotePage.css'
import useReduxStore from '../../hooks/useReduxStore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MarkdownView from 'react-showdown';
import { makeStyles } from '@mui/styles';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button, Grid, Typography, IconButton } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import ReactGA from 'react-ga';

function isValidHttpUrl(s) {
    let url;
    try {
        url = new URL(s);
    } catch (e) { return false; }
    return /https?/.test(url.protocol);
}

// Styling
const useStyles = makeStyles({
    root: {
        maxWidth: '920px',
        margin: '0 auto',
        padding: '15px',
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
        height: '300px',
        width: '300px',
        objectFit: 'cover',
        padding: 0,
    }
});

function VotePage() {
    const user = useSelector((store) => store.user);
    const details = useSelector((store) => store.submission.submissionDetails);
    const { id: submissionId } = useParams();
    // const store = useReduxStore();
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        if (submissionId && submissionId !== '') {
            dispatch({ type: 'FETCH_SUBMISSION_DETAILS', payload: { id: submissionId } });
            if (process.env.REACT_APP_GA_CODE) {
                ReactGA.pageview(`/votepage/${submissionId}`);
            }
            window.scrollTo(0, 0);
        }
        
    }, [submissionId, dispatch])

    // function to add a Vote to the session vote count.   
    const voteForSession = ( sessionId ) => {
        if (user && user.id) {
            dispatch({ type: 'VOTE_FOR_SESSION', payload: sessionId });  
        } else {
            history.push(`/registration`);
        }     
    }

    const diplayAlreadyVoted = () => {
        dispatch({
            type: 'SET_GLOBAL_MODAL',
            payload: {
                modalOpen: true,
                title: 'Already voted for this session',
                body: 'Oops! Looks like you already voted for this session. Check out some of the others - you can vote for every one once!',
            },
        });
    }

    const sessionApprove = ( sessionId ) => {
        dispatch({ type: 'APPROVE_SESSION', payload: sessionId });
        alert('You have approved this session!');
        history.push(`/admin`);
    }

    const sessionDeny = ( sessionId ) => {
        dispatch({ type: 'DENY_SESSION', payload: sessionId });
        alert('You have rejected this session!');
        history.push(`/admin`);
    }

    const confirmDelete = (sessionId) => {
        const result = confirm('Are you sure you want to delete this session?');
        if (result) {
            dispatch({ type: 'DELETE_SESSION', payload: sessionId });
            alert('You have deleted this session!');
            history.push(`/admin`);
        }
    }

    return(
        <div>
            <Grid container spacing={0} style={{ backgroundColor: '#FBBD19', width: '100%' }}>
                <Grid item xs={12} lg={2} style={{ backgroundColor: '#FBBD19', padding: '20px' }}>
                    <Button
                        sx={{ width: '100%' }} variant="contained"
                        onClick={() => history.goBack()}
                    >
                        Back to Sessions
                    </Button>
                    {user.admin &&
                        (
                            <>
                                <h5>Time:</h5>
                                <ul>
                                    {details.time && details.time.map(time => <li>{time}</li>)}
                                </ul>
                                <h5>Date:</h5>
                                <ul>
                                    {details.date && details.date.map(date => <li>{date}</li>)}
                                </ul>
                            </>
                        )
                    }
                </Grid>
                <Grid item md={12} lg={10} order={{ xs: 1, sm: 1, md: 1, lg: 2 }} style={{ backgroundColor: '#FFF', padding: '20px'  }}>
                    <div className={classes.item}>
                        <div style={{ paddingRight: '20px' }}>
                            <img src={details.image || 'images/TCSW_session_selector.png'} className={classes.previewImage} />
                        </div>
                        <div style={{ flex: 1 }}>
                            {
                                details.user_votes && details.user_votes.length > 0 ?
                                    (
                                        <IconButton
                                            sx={{ float: 'right', marginLeft: '20px', border: "3px solid #0c495a", borderRadius: 50 }}
                                            aria-label="delete" size="large" color="primary"
                                            onClick={() => diplayAlreadyVoted()}>
                                            <ThumbUpIcon fontSize="large" />
                                        </IconButton>
                                    )
                                    :
                                    (
                                        <IconButton
                                            sx={{ float: 'right', marginLeft: '20px', border: "3px solid #0c495a", borderRadius: 50 }}
                                            aria-label="delete" size="large" color="primary"
                                            onClick={() => voteForSession(details.id)}
                                        >
                                            <ThumbUpOffAltIcon fontSize="large" />
                                        </IconButton>
                                    )
                            }
                            {user.admin &&
                                (
                                    <>
                                        <Button sx={{ float: 'right', marginTop: '8px', marginLeft: '20px' }} className='approve-button' variant="contained" color="success" onClick={() => sessionApprove(details.id)}>
                                            Approve
                                        </Button>
                                        <Button sx={{ float: 'right', marginTop: '8px', marginLeft: '20px' }} className='deny-button' variant="contained" color="error" onClick={() => sessionDeny(details.id)}>Deny</Button>
                                        <Button sx={{ float: 'right', marginTop: '8px' }} className='edit-button' onClick={() => history.push(`/submission/${details.id}/edit`)}>Edit</Button>
                                        <Button sx={{ float: 'right', marginTop: '8px' }} className='edit-button' color="error" onClick={() => confirmDelete(details.id)}>Delete</Button>
                                    </>
                                )
                            }
                            <Typography variant="h2">{details.title}</Typography>
                            <Typography variant="body"><strong>Track:</strong> {details.track} | <strong>Format:</strong> {details.format} | <strong>Industry:</strong> {details.industry && details.industry.join(', ')}</Typography>
                            <MarkdownView
                                markdown={details.description}
                            />
                        </div>
                    </div>

                    <div className='speaker'>
                        <h3>Speakers</h3>
                        <MarkdownView
                            markdown={details.speakers}
                        />
                    </div>

                    <div className='organizers'>
                        <h3>Organizers</h3>
                        <p>{details.host}</p>
                    </div>

                    <div className='related-media'>
                        <h3>Related Media</h3>
                        {
                            details.media && isValidHttpUrl(details.media) ? (
                                <p><a href={details.media} target="_blank">{details.media}</a></p>
                            ) : (
                                <p>{details.media}</p>
                            )
                        }
                    </div>

                    <div>
                        <h3>Location</h3>
                        <p>{details.location}</p>
                        {
                            details.location_details && (
                                <>
                                    <p><strong>Location Details:</strong></p>
                                    
                                    {details.location_details}
                                </>
                            )
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default VotePage;