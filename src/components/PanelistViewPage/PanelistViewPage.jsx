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
    const [track, setTrack] = useState('');
    const [format, setFormat] = useState('');
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ filteredData, setFilteredData ] = useState(''); 

    // useEffect(() => {
    //     fetchPanelist();
    // }, []);

    // const fetchPanelist = ( session ) => {
    //     dispatch({
    //         type: 'FETCH_PANELIST', payload: session
    //     })
    // }

    const goToPanelDetails = ( session ) => {
        dispatch({ type: 'FETCH_SUBMISSION_DETAILS', payload: session})

        history.push(`/votepage/${session.id}`);
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
            <div className='search-section'>
                <h2>Search</h2>
                <input 
                type='text'
                placeholder='search....'
                onChange={ event => { setSearchTerm( event.target.value )}}
            />

                {store.panelistReducer.filter((speakers) => {
                    if( searchTerm == '') {
                        return speakers
                    }else if( speakers.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return speakers
                    }
                }).map((speakers, key) => {
                    return(
                        
                        <div className='search-list' key={key}>
                            <p onClick={ () => goToPanelDetails( speakers )}>{speakers.title}</p>
                            <div>
                            {/* <table className='panelist-table'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Location</th>
                                        <th>Industry</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.panelistReducer.map((panelist) => (
                                        <tr>
                                            <td onClick={goToPanelDetails}>{panelist.title}</td>
                                            <td>{panelist.location_details}</td>
                                            <td>{panelist.industry_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> */}
                            </div>
                        </div>
                    )
                })}

                <div class='filter-buttons'>
                    <button class='reset-button'>RESET</button>
                    <button class='search-button'>SEARCH</button>
                </div>

                    <br />

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
                        {store.panelistReducer.map((panelist) => (
                            <tr>
                                <td onClick={goToPanelDetails}>{panelist.title}</td>
                                <td>{panelist.location_details}</td>
                                <td>{panelist.industry_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PanelViewPage;