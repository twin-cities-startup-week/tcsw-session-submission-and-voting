import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';


function PanelViewPage() {
    const history = useHistory();

    const [track, setTrack] = useState('');

    // navigates user to the details page of the speaker on click
    const moveToSelectedPage = () => {
        history.push('/user')
    }

    const handleChange = (event) => {
        setTrack(event.target.value);
      };

    return(
        <div>
            <div>
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
            <div>
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

                    <FormControl fullWidth>
                        <InputLabel id='track-filter'>Track</InputLabel>
                            <Select
                                labelId="track-filter"
                                id="track-filter-select"
                                value={track}
                                label="Track"
                                onChange={handleChange}
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

                    <h5>Format</h5>
                    <input
                        id='format-filter'
                        type='text'
                        name='format'
                        placeholder='format'
                    />
                    
                    <h5>Level</h5>
                    <input
                        id='level-filter'
                        type='text'
                        name='level'
                        placeholder='level'
                    />

                </form>

                <br />

                <button>LeaderBoard</button>

            </div>
        </div>
    )
}

export default PanelViewPage;