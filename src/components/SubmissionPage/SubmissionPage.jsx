import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useDispatch } from 'react-redux';




function SubmissionPage() {

    //for styling for multi select drop down menu
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };//end MenuProps

    //options for multiselect drop down date menu
    const dates = [
        { id: 1, date: 'Saturday, September 17, 2022'},
        { id: 2, date: 'Sunday, September 18, 2022'},
        { id: 3, date: 'Monday, September 19, 2022'},
        { id: 4, date: 'Tuesday, September 20, 2022'},
        { id: 5, date: 'Wednesday, September 21, 2022'},
        { id: 6, date: 'Thursday, September 22, 2022'},
        { id: 7, date: 'Friday, September 23, 2022'},
    ]//end dates

    //options for multiselect drop down time menu
    const times = [
        {id: 1, time: 'Morning: 8am - 11am'},
        {id: 2, time: 'Midday: 11 am - 2pm'},
        {id: 3, time: 'Afternoon: 2pm - 5pm'},
        {id: 4, time: 'Evening: 5pm - 9pm'},
    ]//end times

    //options for multiselect drop down industries menu
    const industries = [
        {id: 1, name: 'General Entrepreneuership'},
        {id: 2, name: 'Technology'},
        {id: 3, name: 'Healthcare'},
        {id: 4, name: 'Retail'},
        {id: 5, name: 'Food and Ag'},
        {id: 6, name: 'Education and Training'},
        {id: 7, name: 'Sales'},
        {id: 8, name: 'Marketing and Advertising'},
        {id: 9, name: 'Investing'},
        {id: 10, name: 'Cryptocurrency'},
        {id: 11, name: 'Creative Economy'},
        {id: 12, name: 'Med Device/MedTech'},
        {id: 13, name: 'FinTech'},
        {id: 14, name: 'Hemp & Cannabis'},
        {id: 15, name: 'Smart Cities'},
        {id: 16, name: 'Social Impact'},
        {id: 17, name: 'Art & Culture'},
        {id: 18, name: 'Other'},
    ]

    const theme = useTheme();

    //DATES MULTISELECT FUNCTIONS
    function getDateStyles(date, individualDate, theme) {
        return {
            fontWeight:
                individualDate.indexOf(date) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }//end getDateStyles

    function getTimeStyles(time, individualTime, theme) {
        return {
            fontWeight:
                individualTime.indexOf(time) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }//end getTimeStyles


    //INDUSTRY MULTISELECT FUNCTIONS
    function getIndustryStyles(industry, individualIndustry, theme) {
        return {
            fontWeight:
                individualIndustry.indexOf(industry) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }//end getIndustryStyles

    const [individualIndustry, setIndividualIndustry] = useState([]);
    const handleIndustryChange = (event) => {
        const {
            target: { value },
        } = event;
        setIndividualIndustry(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };//end handleIndustryChange

    //TIME MULTISELECT FUNCTIONS
    const [individualTime, setIndividualTime] = useState([]);
    const handleTimeChange = (event) => {
        const {
            target: { value },
        } = event;
        setIndividualTime(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };//end handleTimeChange


    const [individualDate, setIndividualDate] = useState([]);
    const handleDateChange = (event) => {
        const {
            target: { value },
        } = event;
        setIndividualDate(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };//end handleDateChange

    const dispatch = useDispatch();

    //posting new submission to db as an object
    const addSubmission = (event) => {
        console.log('adding a new submission');
        event.preventDefault();
        const newSubmission = {
            email: email,
            phone: phone,
            host: host,
            title: title,
            description: description,
            attendees: attendees,
            location: location,
            location_details: locationDetails,
            date: individualDate.id, //need to look at this more specifically - goes with multiselect
            length: length,
            time: individualTime.id, //need to look at this one too - goes with multi select
            format: format,
            industry: individualIndustry.id, //another multiselect to fix
            track: track,
            area_of_interest: areaOfInterest,
            diversity: diversity,
            speakers: speakers,
            covid: covid,
            media: media,
            image: image, //need to ask Sarah F about this/do more research
            success: success,
            excited: excited,
            other_hosts: otherHosts,
            other_info: otherInfo,
        }
        console.log('The new submission is', newSubmission );
        dispatch({ type: 'POST_SUBMISSION_TO_SERVER', payload: newSubmission});
    }//end addSubmission

    //variables for individual form questions (multiselects are above)
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [host, setHost] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription ] = useState('');
    const [attendees, setAttendees ] = useState('');
    const [location, setLocation ] = useState('');
    const [locationDetails, setLocationDetails ] = useState('');
    const [length, setLength] = useState('');
    const [format, setFormat ] = useState('');
    const [track, setTrack ] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [diversity, setDiversity ] = useState('');
    const [speakers, setSpeakers] = useState('');
    const [covid, setCovid ] = useState('');
    const [media, setMedia] = useState('');
    const [image, setImage ] = useState('');
    const [success, setSuccess ] = useState('');
    const [excited, setExcited] = useState('');
    const [otherHosts, setOtherHosts ] = useState('');
    const [otherInfo, setOtherInfo ] = useState('');


    return (
        <>
            <Box p={2}>
                <Typography variant="h5" align="left">
                    TCSW Session Submission 2022
                </Typography>
            </Box>
            <Box p={3}>
                <Container component={Paper}>
                    <form onSubmit={addSubmission}>
                    <FormControl>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> Email Address:</Typography>
                            <Typography variant="caption" display="block" gutterBottom>This is the email we will use for all TCSW-related communications.</Typography>
                            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" required value={email} onChange={(event) => setEmail(event.target.value)}/>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> Phone:</Typography>
                            <Typography variant="caption" display="block" gutterBottom>This is the phone number we will use for all TCSW-related communications.</Typography>
                            <TextField fullWidth id="outlined-basic" label="Phone" variant="outlined" required value={phone} onChange={(event) => setPhone(event.target.value)}/>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Is this event being hosted by an organization, company or other entity? If so, list here. If not, tell us a little bit about yourself.</Typography>
                            <TextField fullWidth id="outlined-basic" label="Host" variant="outlined" required value={host} onChange={(event) => setHost(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Title of your event: </Typography>
                            <TextField fullWidth id="outlined-basic" label="Title" variant="outlined" required value={title} onChange={(event) => setTitle(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Describe your event in 150 words or less: </Typography>
                            <TextField fullWidth id="outlined-multiline-flexible" multiline maxRows={5} label="Description" variant="outlined" required value={description} onChange={(event) => setDescription(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Approximately how many attendees do you expect? </Typography>
                            <TextField fullWidth id="outlined-basic" label="Attendees" variant="outlined" required value={attendees} onChange={(event) => setAttendees(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Where will your event be hosted? </Typography>
                            <FormControl component="fieldset" value={location} onChange={(event) => setLocation(event.target.value)}>
                                <RadioGroup defaultValue="Online via the TCSW virtual venue" name="radio-buttons-group">
                                    <FormControlLabel value={1} control={<Radio />} label="Online via the TCSW virtual venue" />
                                    <FormControlLabel value={2} control={<Radio />} label="In-person" />
                                    <FormControlLabel value={3} control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>If your event is being held in-person, please share where you would like it to be hosted. </Typography>
                            <Typography variant="caption" display="block" gutterBottom> We would love to host community, culture, art, etc. events at our TCSW Community Hub or other cool spaces in the Cities.</Typography>
                            <TextField fullWidth id="outlined-basic" label="Location Details" variant="outlined" value={locationDetails} onChange={(event) => setLocationDetails(event.target.value)}/>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What day(s) work for you to host your event? Select all that apply. </Typography>
                            <div>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">Date</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={dates}
                                        onChange={handleDateChange}
                                        input={<OutlinedInput label="Date" />}
                                        MenuProps={MenuProps}
                                    >
                                        {dates.map((date) => (
                                            <MenuItem
                                                key={date.id}
                                                value={date.id}
                                                style={getDateStyles(date, individualDate, theme)}
                                            >
                                                {date}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> Approximately how long will your event be?</Typography>
                            <Typography variant="caption" display="block" gutterBottom>Please keep in mind people need time to travel between events. </Typography>
                            <TextField fullWidth id="outlined-basic" label="Length" variant="outlined" required value={length} onChange={(event) => setLength(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Which time do you prefer to host? </Typography>
                            <Typography variant="caption" display="block" gutterBottom> TCSW is packed with events! As we piece together our calendar, we will work with you to find a great slot for your event. Please select all that apply. </Typography>
                            <div>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">Time</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={times}
                                        onChange={handleTimeChange}
                                        input={<OutlinedInput label="Time" />}
                                        MenuProps={MenuProps}
                                    >
                                        {times.map((time) => (
                                            <MenuItem
                                                key={time.id}
                                                value={time.id}
                                                style={getTimeStyles(time, individualTime, theme)}
                                            >
                                                {time}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What is the event format? </Typography>
                            <FormControl component="fieldset" required value={format} onChange={(event) => setFormat(event.target.value)}>
                                <RadioGroup defaultValue="Presentation " name="radio-buttons-group">
                                    <FormControlLabel value={1} control={<Radio />} label="Presentation" />
                                    <FormControlLabel value={2} control={<Radio />} label="Panel" />
                                    <FormControlLabel value={3} control={<Radio />} label="Workshop" />
                                    <FormControlLabel value={4} control={<Radio />} label="Keynote" />
                                    <FormControlLabel value={5} control={<Radio />} label="Roundtable" />
                                    <FormControlLabel value={6} control={<Radio />} label="Fireside Chat" />
                                    <FormControlLabel value={7} control={<Radio />} label="Showcase" />
                                    <FormControlLabel value={8} control={<Radio />} label="Demo" />
                                    <FormControlLabel value={9} control={<Radio />} label="Meetup" />
                                    <FormControlLabel value={10} control={<Radio />} label="Pitch" />
                                    <FormControlLabel value={11} control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What industry are you focusing on? </Typography>
                            <Typography variant="caption" display="block" gutterBottom> Please select all that are applicable. </Typography>
                            <div>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">Industry</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={industries}
                                        onChange={handleIndustryChange}
                                        input={<OutlinedInput label="Industry" />}
                                        MenuProps={MenuProps}
                                    >
                                        {industries.map((industry) => (
                                            <MenuItem
                                                key={industry.id}
                                                value={industry.id}
                                                style={getIndustryStyles(industry, individualIndustry, theme)}
                                            >
                                                {industry}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>In which track would you like your event featured? </Typography>
                            <FormControl component="fieldset" required value={track} onChange={(event) => setTrack(event.target.value)}>
                                <RadioGroup defaultValue="Growth" name="radio-buttons-group">
                                    <FormControlLabel value={1} control={<Radio />} label="Growth" />
                                    <FormControlLabel value={2} control={<Radio />} label="Founder" />
                                    <FormControlLabel value={3} control={<Radio />} label="Designer" />
                                    <FormControlLabel value={4} control={<Radio />} label="Maker" />
                                    <FormControlLabel value={5} control={<Radio />} label="Product" />
                                    <FormControlLabel value={6} control={<Radio />} label="Developer" />
                                    <FormControlLabel value={7} control={<Radio />} label="People" />
                                    <FormControlLabel value={8} control={<Radio />} label="Spotlight" />
                                    <FormControlLabel value={9} control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What is the purpose of your event? </Typography>
                            <FormControl component="fieldset" required value={areaOfInterest} onChange={(event) => setAreaOfInterest(event.target.value)}>
                                <RadioGroup defaultValue="Celebrating and empowering female leaders" name="radio-buttons-group">
                                    <FormControlLabel value={1} control={<Radio />} label="Celebrating and empowering female leaders" />
                                    <FormControlLabel value={2} control={<Radio />} label="Supporting diversity and inclusion" />
                                    <FormControlLabel value={3} control={<Radio />} label="Supporting student and youth entrepreneurs" />
                                    <FormControlLabel value={4} control={<Radio />} label="Highlighting arts and culture" />
                                    <FormControlLabel value={5} control={<Radio />} label="Engaging investors" />
                                    <FormControlLabel value={6} control={<Radio />} label="Supporting impact ventures or social enterprises" />
                                    <FormControlLabel value={7} control={<Radio />} label="None of these specifically" />
                                    <FormControlLabel value={8} control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>We require all TCSW events with three or more speakers have gender and/or race/ethnicity diversity with regard to its organization, participation, and content. Will your event align with this requirement? </Typography>
                            <FormControl component="fieldset" required value={diversity} onChange={(event) => setDiversity(event.target.value)}>
                                <RadioGroup defaultValue="Yes" name="radio-buttons-group">
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> Who would you like to speak at your event? </Typography>
                            <Typography variant="caption" display="block" gutterBottom>Planning to have speakers? Awesome! We'd love to know who you had in mind. Don't worry, this can change down the road. If you need help finding speakers, please list that too! </Typography>
                            <TextField fullWidth id="outlined-basic" label="Speakers" variant="outlined" required value={speakers} onChange={(event) => setSpeakers(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>We require all TCSW session hosts to commit to following Covid safety protocols, which will be released by TCSW in August based on CDC and State Guidelines.  Do you commit to following all TCSW Covid Safety protocols? </Typography>
                            <FormControl component="fieldset" required value={covid} onChange={(event) => setCovid(event.target.value)}>
                                <RadioGroup defaultValue="Yes" name="radio-buttons-group">
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Please share any related media you would like to have included on your TCSW session listing.  </Typography>
                            <TextField fullWidth id="outlined-basic" label="Media" variant="outlined" required value={media} onChange={(event) => setMedia(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Please share a session image (file upload - to do ).  </Typography>
                            <TextField fullWidth id="outlined-basic" label="Image" variant="outlined" required value={image} onChange={(event) => setImage(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What does success look like for your event? </Typography>
                            <TextField fullWidth id="outlined-basic" label="Success looks like:" variant="outlined" required value={success} onChange={(event) => setSuccess(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What makes you most excited to host an event during Twin Cities Startup Week? </Typography>
                            <TextField fullWidth id="outlined-basic" label="Most excited to host because:" variant="outlined" required value={excited} onChange={(event) => setExcited(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> Who else should be hosting an event? (referral)</Typography>
                            <Typography variant="caption" display="block" gutterBottom>We love working with new event hosts and businesses during the week! Do know of any individuals or organizations that have a story to tell, something to teach or incredible content to share? Please list their name, email address and tell us a little bit about why they'd make a great event host - we'll make sure to reach out to them!</Typography>
                            <TextField fullWidth id="outlined-basic" label="Referral" variant="outlined" required value={otherHosts} onChange={(event) => setOtherHosts(event.target.value)} />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> More to share?</Typography>
                            <Typography variant="caption" display="block" gutterBottom>Did we miss anything? Do you have questions? Is there something else about your event you want to share that didn't fit in the questions above? Let us know!</Typography>
                            <TextField fullWidth id="outlined-basic" label="More to share?" variant="outlined" required value={otherInfo} onChange={(event) => setOtherInfo(event.target.value)} />
                        </Box>
                        <Button variant="contained" type="submit">Submit Submission</Button>
                    </FormControl>
                    </form>
                </Container>
            </Box>
        </>
    )
}

export default SubmissionPage;