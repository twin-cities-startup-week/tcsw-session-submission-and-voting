import './SearchPage.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
    Button,
    Grid,
    Typography,
    RadioGroup,
    FormControlLabel,
    Hidden,
    Checkbox,
    IconButton,
} from '@mui/material';
import MarkdownView from 'react-showdown';
import ReactGA from 'react-ga';

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
        paddingTop: '0px',
        paddingBottom: '20px',
        cursor: 'pointer',
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
let searchTimeout = null;
function Panelists() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {approvedSessions} = useSelector((store) => store.session);
    const user = useSelector((store) => store.user);
    const {searchTerm, searchTrack, searchFormat, searchChanged} = useSelector((store) => store.session);
    const [typeIndicator, setTypeIndicator] = useState('');
    const [collapsed, setCollapsed] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        if (process.env.REACT_APP_GA_CODE) {
            ReactGA.pageview('/votepage');
        }
        if (user && !user.id) {
            // Used to redirect back to this page after login
            localStorage.setItem('PREVIOUS_PAGE', '/votepage');
        }
    }, []);

    //Get all the session
    useEffect(() => {
        if (searchChanged) {
            delaySearch();
        }
    }, [searchFormat, searchTrack, searchTerm, user, dispatch]);

    const resetFilters = () => {
        dispatch({ type: 'CLEAR_SEARCH_FILTERS' });
        delaySearch();
    }

    const handleSearchChange = (event) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: event.target.value });
    }

    const delaySearch = () => {
        if (searchTimeout) {
            // console.log('clearing timeout');
            clearTimeout(searchTimeout);
            setTypeIndicator('Searching..');
        } else {
            setTypeIndicator('Searching.');
        }
        
        // Delay the search so that it runs after the user is done typing
        searchTimeout = setTimeout(() => runSearch(), 250);
    }

    const runSearch = () => {
        dispatch({ type: 'SET_SEARCH_CHANGED', payload: false })
        setTypeIndicator('Searching...');
        dispatch({ type: 'FETCH_APPROVED_SESSIONS', payload: {
            searchTerm,
            track: encodeURIComponent(String(searchTrack)),
            format: encodeURIComponent(String(searchFormat)),
        }, onComplete: searchComplete});
        searchTimeout = null;
    }

    const searchComplete = () => {
        setTypeIndicator('');
    }

    const goToLeaderBoard = () => {
        history.push('/leaderboard');
    }

    const handleChangeForTrack = (value) => (event) => {
        let listOfItems = [...searchTrack];
        // console.log(value);
        if (event.target.checked && listOfItems.indexOf(value) < 0) {
            listOfItems = [...searchTrack, value];
        } else if (!event.target.checked) {
            listOfItems = listOfItems.filter(item => item !== value);
        }
        dispatch({ type: 'SET_SEARCH_TRACK', payload: listOfItems });
    }

    const handleChangeForFormat = (value) => (event) => {
        let listOfItems = [...searchFormat];
        // console.log(value);
        if (event.target.checked && listOfItems.indexOf(value) < 0) {
            listOfItems = [...searchFormat, value];
        } else if (!event.target.checked) {
            listOfItems = listOfItems.filter(item => item !== value);
        }
        dispatch({ type: 'SET_SEARCH_FORMAT', payload: listOfItems });
    }

    const trackAndFormat = () => (
        <>
            <Typography variant="h6" style={{ paddingTop: '20px', paddingBottom: '5px' }}>Track</Typography>
            <RadioGroup value={searchTrack} name="radio-buttons-group">
                <FormControlLabel control={
                    <Checkbox checked={searchTrack.indexOf('Growth') >= 0} onChange={handleChangeForTrack('Growth')} />
                } label="Growth" />
                <FormControlLabel control={
                    <Checkbox checked={searchTrack.indexOf('Culture') >= 0} onChange={handleChangeForTrack('Culture')} />
                } label="Culture" />
                <FormControlLabel control={
                    <Checkbox checked={searchTrack.indexOf('Funding') >= 0} onChange={handleChangeForTrack('Funding')} />
                } label="Funding" />
                <FormControlLabel control={
                    <Checkbox checked={searchTrack.indexOf('Product') >= 0} onChange={handleChangeForTrack('Product')} />
                } label="Product" />
                <FormControlLabel control={
                    <Checkbox checked={searchTrack.indexOf('Spotlight') >= 0} onChange={handleChangeForTrack('Spotlight')} />
                } label="Spotlight" />
            </RadioGroup>
            <Typography variant="h6" style={{ paddingTop: '20px', paddingBottom: '5px' }}>Format</Typography>
            <RadioGroup value={searchFormat} name="radio-buttons-group">
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Presentation') >= 0} onChange={handleChangeForFormat('Presentation')} />
                } label="Presentation" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Panel') >= 0} onChange={handleChangeForFormat('Panel')} />
                } label="Panel" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Workshop') >= 0} onChange={handleChangeForFormat('Workshop')} />
                } label="Workshop" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Keynote') >= 0} onChange={handleChangeForFormat('Keynote')} />
                } label="Keynote" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Roundtable') >= 0} onChange={handleChangeForFormat('Roundtable')} />
                } label="Roundtable" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Fireside Chat') >= 0} onChange={handleChangeForFormat('Fireside Chat')} />
                } label="Fireside Chat" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Showcase') >= 0} onChange={handleChangeForFormat('Showcase')} />
                } label="Showcase" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Demo') >= 0} onChange={handleChangeForFormat('Demo')} />
                } label="Demo" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Meetup') >= 0} onChange={handleChangeForFormat('Meetup')} />
                } label="Meetup" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Pitch') >= 0} onChange={handleChangeForFormat('Pitch')} />
                } label="Pitch" />
                <FormControlLabel control={
                    <Checkbox checked={searchFormat.indexOf('Other') >= 0} onChange={handleChangeForFormat('Other')} />
                } label="Other" />
            </RadioGroup>
        </>
    )

    // function to add a Vote to the session vote count.   
    const voteForSession = (sessionId) => {
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
    
    return(
        <>
            <div style={{ backgroundColor: '#FBBD19', width: '100%', height: '100%' }}>
                <Grid container spacing={0} style={{ backgroundColor: '#FBBD19', width: '100%', height: '100%' }}>
                    <Grid item xs={12} sm={4} md={4} lg={2} style={{ backgroundColor: '#FBBD19', padding: '20px' }}>
                        <Typography variant="h2" style={{ paddingTop: '20px', paddingBottom: '5px' }}>
                            SEARCH
                            <Hidden smUp>
                                {
                                    collapsed ? (
                                        <Button style={{ float: 'right' }} onClick={() => setCollapsed(false)}>Expand</Button>
                                    ) : (
                                        <Button style={{ float: 'right' }} onClick={() => setCollapsed(true)}>Collapse</Button>
                                    )
                                }
                            </Hidden>

                        </Typography>

                        <Typography variant="h6" style={{ paddingTop: '20px', paddingBottom: '5px' }}>Keyword</Typography>
                        <input
                            className='search-bar'
                            type='text'
                            value={searchTerm}
                            placeholder='Keyword'
                            onChange={handleSearchChange}
                        />
                        {
                            // On mobile phones, toggle the track and format filters
                            !collapsed && (
                                <Hidden smUp>
                                    {trackAndFormat()}
                                </Hidden>
                            )
                        }
                        <Hidden smDown>
                            {trackAndFormat()}
                        </Hidden>
                        <Button variant="contained" style={{ marginTop: '20px' }} onClick={resetFilters}>Reset</Button>

                        {/* <Hidden smDown>
                            <br />
                            <br />
                            <div className='leader-board-button-div'>
                                <p>Want to see who is leading the Vote race?</p>
                                <Button variant="contained" onClick={goToLeaderBoard}>Leaderboard</Button>
                            </div>
                        </Hidden> */}


                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={10} style={{ backgroundColor: '#FFF', padding: '20px' }}>
                        {
                            typeIndicator !== '' && (
                                <div style={{ height: '500px' }}>
                                    <Typography variant="h6">{typeIndicator}</Typography>
                                </div>
                            )
                        }
                        {
                            approvedSessions
                            && approvedSessions.length === 0
                            && typeIndicator === ''
                            && (
                                <div style={{ height: '500px' }}>
                                    <Typography variant="h6">No results found.</Typography>
                                </div>
                            )
                        }
                        {
                            typeIndicator === ''
                            && approvedSessions
                            && approvedSessions.map(session => (
                                <div key={session.id}>
                                    <div className={classes.item}>
                                        <div onClick={() => history.push(`/votepage/${session.id}`)} style={{ paddingRight: '20px', cursor: 'pointer' }}>
                                            <img src={session.image || 'images/TCSW_session_selector.png'} className={classes.previewImage} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            {
                                                session.user_votes && session.user_votes.length > 0 ?
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
                                                            onClick={() => voteForSession(session.id)}
                                                        >
                                                            <ThumbUpOffAltIcon fontSize="large" />
                                                        </IconButton>
                                                    )
                                            }
                                            {/* <Button component={Paper} elevation={8}
                                                variant="contained"
                                                type="submit"
                                                name="submit"
                                                value="Log In"
                                                sx={{ float: 'right', marginTop: '8px' }}
                                                onClick={() => history.push(`/votepage/${session.id}`)}
                                            >
                                                View Details
                                            </Button> */}
                                            <Typography onClick={() => history.push(`/votepage/${session.id}`)} className={classes.title} variant="h2">
                                                {session.title}
                                            </Typography>
                                            <Typography variant="body"><strong>Track:</strong> {session.track} | <strong>Format:</strong> {session.format} | <strong>Industry:</strong> {getArray(session.industry).join(', ')}</Typography>
                                            <MarkdownView
                                                markdown={session.description}
                                            />
                                            
                                        </div>
                                        
                                    </div>
                                    <hr />
                                </div>
                            ))
                        }
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Panelists;