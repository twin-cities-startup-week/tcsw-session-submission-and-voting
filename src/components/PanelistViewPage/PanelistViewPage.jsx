import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';


function PanelViewPage() {
    const history = useHistory();

    const [track, setTrack] = useState('');
    const [format, setFormat] = useState('');
    const [level, setLevel] = useState('');

    // navigates user to the details page of the speaker on click
    const moveToSelectedPage = () => {
        history.push('/user')
    }

    const handleTrackChange = (event) => {
        setTrack(event.target.value);
      };

      const handleFormatChange = (event) => {
        setFormat(event.target.value);
      };

      const handleLevelChange = (event) => {
        setLevel(event.target.value);
      };

    return(
        <div>
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
                        <tr>
                            <td onClick={moveToSelectedPage}>Rain green</td>
                            <td>TCSW</td>
                            <td>Technology</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class='search-section'>
                <h2>Search</h2>
                <form>
                    <input
                        id='track-filter'
                        type='text'
                        name='track'
                        placeholder='search'
                    />

                    <button>RESET</button>
                    <button>SEARCH</button>

                    <br />

                    <FormControl fullWidth>
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
                    </FormControl>

                    <h5>Track</h5>
                    <input
                        id='track-filter'
                        type='text'
                        name='track'
                        placeholder='track'
                    />


                    <FormControl fullWidth>
                        <InputLabel id='format-filter'>Format</InputLabel>
                            <Select
                                labelId="format-filter"
                                id="format-filter-select"
                                value={format}
                                label="Format"
                                onChange={handleFormatChange}
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
                    </FormControl>

                    <h5>Format</h5>
                    <input
                        id='format-filter'
                        type='text'
                        name='format'
                        placeholder='format'
                    />
                    
                    {/* <FormControl fullWidth>
                        <InputLabel id='level-filter'>Level</InputLabel>
                            <Select
                                labelId="level-filter"
                                id="level-filter-select"
                                value={level}
                                label="Level"
                                onChange={handleLevelChange}
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
                    </FormControl>

                    <h5>Level</h5>
                    <input
                        id='level-filter'
                        type='text'
                        name='level'
                        placeholder='level' */}
                    />

                </form>

                <br />

                <button>LeaderBoard</button>

            </div>
        </div>
    )
}

export default PanelViewPage;