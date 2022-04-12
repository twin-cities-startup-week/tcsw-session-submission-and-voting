import './Panelists.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Button, Grid, Paper, Typography } from '@mui/material';
import MarkdownView from 'react-showdown';

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
        height: '200px',
        width: '200px',
        objectFit: 'cover',
        padding: 0,
    }
});

function Panelists() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { approvedSessions } = useSelector((store) => store.session);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ trackState, setTrackState ] = useState('');
    const [ formatState, setFormatState ] = useState('');
    const classes = useStyles();

    //Get all the session
    useEffect(() => {
        dispatch({ type: "FETCH_APPROVED_SESSIONS" });
    }, [dispatch]);

    const goToPanelDetails = ( session ) => {
        history.push(`/votepage/${session.id}`)
    }

    const resetFilters = () => {
        setSearchTerm('');
        setTrackState('');
        setFormatState('');
    }

    const goToLeaderBoard = () => {
        history.push('/leaderboard')
    }
    
    return(
        <div style={{ backgroundColor: '#FBBD19', width: '100%', height: '100%' }}>
            <Grid container spacing={0} style={{ backgroundColor: '#FBBD19', width: '100%', height: '100%' }}>
                <Grid item md={12} lg={2} order={{ xs: 2, sm: 2, md: 2, lg: 1 }} style={{ backgroundColor: '#FBBD19', padding: '20px', height: '100%' }}>
                    <h2 className='filter-heading'>SEARCH</h2>
                    
                    <div className='filter-dropdown-selectors'>
                        <h5>Keyword</h5>
                        <input 
                            className='search-bar'
                            type='text'
                            value={searchTerm}
                            placeholder='Keyword'
                            onChange={ event => { setSearchTerm( event.target.value )}}
                        />
                    </div>

                    <div className='filter-dropdown-selectors'>
                        <h5>Track</h5>
                        <select className='track-selector' onChange={ event => setTrackState( event.target.value )}>
                            <option value=''> </option>
                            <option value="Growth">Growth</option>
                            <option value="Culture">Culture</option>
                            <option value="Funding">Funding</option>
                            <option value="Product">Product</option>
                            <option value="Spotlight">Spotlight</option>
                        </select>
                    
                        <h5 className='format-filter-header'>Format</h5>
                        <select className='format-selector' onChange={ event => setFormatState( event.target.value )}>
                            <option value=''> </option>
                            <option value="Presentation">Presentation</option>
                            <option value="Panel">Panel</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Keynote">Keynote</option>
                            <option value="Roundtable">Roundtable</option>
                            <option value="Fireside Chat">Fireside Chat</option>
                            <option value="Showcase">Showcase</option>
                            <option value="Demo">Demo</option>
                            <option value="Meetup">Meetup</option>
                            <option value="Pitch">Pitch</option>
                            <option value="Other">Other</option>
                        </select>
                    </div> 

                    <br/>

                    <div className='reset-location'>
                        <Button variant="contained" onClick={resetFilters}>Reset</Button>
                    </div>
                    
                    <div className='leader-board-button-div'>
                        <p>Want to see who is leading the Vote race?</p>
                        <Button variant="contained" onClick={goToLeaderBoard}>Leader Board</Button>
                    </div>
                </Grid>
                <Grid item md={12} lg={10} order={{ xs: 1, sm: 1, md: 1, lg: 2 }} style={{ backgroundColor: '#FFF', padding: '20px'  }}>
                    {
                        approvedSessions
                        && approvedSessions.map(session => (
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
                                    <MarkdownView
                                        markdown={session.description}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Panelists;