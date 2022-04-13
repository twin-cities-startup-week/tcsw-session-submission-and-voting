import './SearchPage.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Button, Grid, Paper, Typography, FormControl, RadioGroup, FormControlLabel, Hidden, Checkbox } from '@mui/material';
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
let searchTimeout = null;
function Panelists() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {approvedSessions} = useSelector((store) => store.session);
    const user = useSelector((store) => store.user);
    const { block } = useSelector((store) => store.content);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeIndicator, setTypeIndicator] = useState('');
    const [track, setTrack] = useState([]);
    const [format, setFormat] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const classes = useStyles();

    //Get all the session
    useEffect(() => {
        if (user.admin) {
            delaySearch();
        } else {
            dispatch({ type: "FETCH_CONTENT_BLOCKS" });
        }
    }, [format, track, searchTerm, user, dispatch]);

    const resetFilters = () => {
        setSearchTerm('');
        setTrack([]);
        setFormat([]);
        runSearch();
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);

    }

    const delaySearch = () => {
        if (searchTimeout) {
            console.log('clearing timeout');
            clearTimeout(searchTimeout);
            setTypeIndicator('Searching..');
        } else {
            setTypeIndicator('Searching.');
        }
        
        // Delay the search so that it runs after the user is done typing
        searchTimeout = setTimeout(() => runSearch(), 300);
    }

    const runSearch = () => {
        setTypeIndicator('Searching...');
        dispatch({ type: 'FETCH_APPROVED_SESSIONS', payload: {
            searchTerm,
            track,
            format: encodeURIComponent(String(format)),
        }, onComplete: searchComplete});
        searchTimeout = null;
    }

    const searchComplete = () => {
        setTypeIndicator('');
    }

    const goToLeaderBoard = () => {
        history.push('/leaderboard');
    }

    const handleChangeForFormat = (value) => (event) => {
        let listOfItems = [...format];
        console.log(value);
        if (event.target.checked && listOfItems.indexOf(value) < 0) {
            listOfItems = [...format, value];
        } else if (!event.target.checked) {
            listOfItems = listOfItems.filter(item => item !== value);
        }
        setFormat(listOfItems);
    }

    const trackAndFormat = () => (
        <>
            <Typography variant="h6" style={{ paddingTop: '20px', paddingBottom: '5px' }}>Track</Typography>
            <select className='track-selector' value={track} onChange={event => setTrack(event.target.value)}>
                <option value=''> </option>
                <option value="Growth">Growth</option>
                <option value="Culture">Culture</option>
                <option value="Funding">Funding</option>
                <option value="Product">Product</option>
                <option value="Spotlight">Spotlight</option>
            </select>
            <Typography variant="h6" style={{ paddingTop: '20px', paddingBottom: '5px' }}>Format</Typography>
            <RadioGroup value={format} name="radio-buttons-group">
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Presentation') >= 0} onChange={handleChangeForFormat('Presentation')} />
                } label="Presentation" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Panel') >= 0} onChange={handleChangeForFormat('Panel')} />
                } label="Panel" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Workshop') >= 0} onChange={handleChangeForFormat('Workshop')} />
                } label="Workshop" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Keynote') >= 0} onChange={handleChangeForFormat('Keynote')} />
                } label="Keynote" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Roundtable') >= 0} onChange={handleChangeForFormat('Roundtable')} />
                } label="Roundtable" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Fireside Chat') >= 0} onChange={handleChangeForFormat('Fireside Chat')} />
                } label="Fireside Chat" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Showcase') >= 0} onChange={handleChangeForFormat('Showcase')} />
                } label="Showcase" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Demo') >= 0} onChange={handleChangeForFormat('Demo')} />
                } label="Demo" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Meetup') >= 0} onChange={handleChangeForFormat('Meetup')} />
                } label="Meetup" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Pitch') >= 0} onChange={handleChangeForFormat('Pitch')} />
                } label="Pitch" />
                <FormControlLabel control={
                    <Checkbox checked={format.indexOf('Other') >= 0} onChange={handleChangeForFormat('Other')} />
                } label="Other" />
            </RadioGroup>
        </>
    )
    
    return(
        <>
            {
                // Temporarily restrict to only admins. TODO: Make the event start date configurable.
                user.admin ? (
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

                                {/* On larger screens, always show track and format filters */}
                                <Hidden smDown>
                                    <br />
                                    <br />
                                    <div className='leader-board-button-div'>
                                        <p>Want to see who is leading the Vote race?</p>
                                        <Button variant="contained" onClick={goToLeaderBoard}>Leaderboard</Button>
                                    </div>
                                </Hidden>


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
                ) : (
                    <div className={classes.root}>
                        <MarkdownView
                            style={{ width: '95%' }}
                            markdown={block['search']}
                        />
                    </div>
                )
            }
        </>
    )
}

export default Panelists;