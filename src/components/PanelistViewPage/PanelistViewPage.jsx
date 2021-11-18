import './PanelistViewPage.css';
import useReduxStore from '../../hooks/useReduxStore';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';


function PanelViewPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useReduxStore();

    console.log('these are the current panelists', store.panelistReducer);

    const [track, setTrack] = useState('');
    const [format, setFormat] = useState('');

    useEffect(() => {
        fetchPanelist();
    }, []);

    const fetchPanelist = ( session ) => {
        dispatch({
            type: 'FETCH_PANELIST', payload: session
        })
    }

    // navigates user to the details page of the speaker on click.
    const moveToSelectedPage = () => {
        history.push('/user')
    }

    // allow the drop downs to show what has been selected.
    const handleTrackChange = (event) => {
        setTrack(event.target.value);
    };

      const handleFormatChange = (event) => {
        setFormat(event.target.value);
    };

    return(
        <div>
            <div class='search-section'>
                <h2>Search</h2>
                <TextField id='search-bar' label='search' variant="outlined" />
                {/* <form> */}

                <div class='filter-buttons'>
                    <button class='reset-button'>RESET</button>
                    <button class='search-button'>SEARCH</button>
                </div>

                    <br />

                    {/* <FormControl fullWidth> */}
                        <InputLabel id='track-filter'>Track</InputLabel>
                            <Select
                                labelId="track-filter"
                                id="track-filter-select"
                                value={track}
                                label="Track"
                                onChange={handleTrackChange}
                            >
                                <MenuItem value='{Growth}'>Growth</MenuItem>
                                <MenuItem value='{Founder}'>Founder</MenuItem>
                                <MenuItem value='{Designer}'>Designer</MenuItem>
                                <MenuItem value='{Maker}'>Maker</MenuItem>
                                <MenuItem value='{Product}'>Product</MenuItem>
                                <MenuItem value='{Developer}'>Developer</MenuItem>
                                <MenuItem value='{People}'>People</MenuItem>
                                <MenuItem value='{Spolight}'>Spolight</MenuItem>
                                <MenuItem value='{Other}'>Other</MenuItem>
                            </Select>
                    {/* </FormControl> */}

                    {/* <h5>Track</h5>
                    <input
                        id='track-filter'
                        type='text'
                        name='track'
                        placeholder='track'
                    /> */}

                    {/* <FormControl fullWidth> */}
                        <InputLabel id='format-filter'>Format</InputLabel>
                            <Select
                                labelId="format-filter"
                                id="format-filter-select"
                                value={format}
                                label="Format"
                                onChange={handleFormatChange}
                            >
                                <MenuItem value='{Presentation}'>Presentation</MenuItem>
                                <MenuItem value='{Panel}'>Panel</MenuItem>
                                <MenuItem value='{Workshop}'>Workshop</MenuItem>
                                <MenuItem value='{Keynote}'>Keynote</MenuItem>
                                <MenuItem value='{Roundtable}'>Roundtable</MenuItem>
                                <MenuItem value='{Fireside Chat}'>Fireside Chat</MenuItem>
                                <MenuItem value='{Showcase}'>Showcase</MenuItem>
                                <MenuItem value='{Demo}'>Demo</MenuItem>
                                <MenuItem value='{Meetup}'>Meetup</MenuItem>
                                <MenuItem value='{Pitch}'>Pitch</MenuItem>
                                <MenuItem value='{Other}'>Other</MenuItem>
                                
                            </Select>
                    {/* </FormControl> */}

                    {/* <h5>Format</h5>
                    <input
                        id='format-filter'
                        type='text'
                        name='format'
                        placeholder='format'
                    /> */}

                {/* </form> */}

                <br />

                <button>LeaderBoard</button>

            </div>

            <br />
            

            {/* this will be implementing Material UI */}
            <div class='table-section'>
                <h1>TCSW Panelists</h1>
                <h5>Community Voting: date-date</h5>

                <br/>

                <h5>page</h5>

                <h5>
                    page
                    <button>back</button>
                    <button>forward</button>
                </h5>

                <table className='panelist-table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Industry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {store.panelistReducer.map((panelist) => (
                            <tr>
                                <td onClick={moveToSelectedPage}>{panelist.title}</td>
                                <td>{panelist.location_details}</td>
                                <td>{panelist.industry_id}</td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PanelViewPage;