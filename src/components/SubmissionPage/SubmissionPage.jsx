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
        'Saturday, September 17, 2022',
        'Sunday, September 18, 2022',
        'Monday, September 19, 2022',
        'Tuesday, September 20, 2022',
        'Wednesday, September 21, 2022',
        'Thursday, September 22, 2022',
        'Friday, September 23, 2022',
    ]//end dates

    //options for multiselect drop down time menu
    const times = [
        'Morning: 8am - 11am',
        'Midday: 11 am - 2pm',
        'Afternoon: 2pm - 5pm',
        'Evening: 5pm - 9pm',
    ]//end times

    const theme = useTheme();

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

    const [individualTime, setIndividualTime] = useState([]);
    const handleTimeChange = (event) => {
        const {
            target: { value },
        } = event;
        setIndividualTime(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };//end handleChange


    const [individualDate, setIndividualDate] = useState([]);
    const handleDateChange = (event) => {
        const {
            target: { value },
        } = event;
        setIndividualDate(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };//end handleChange

    return (
        <>
            <Box p={2}>
                <Typography variant="h5" align="left">
                    TCSW Session Submission 2022
                </Typography>
            </Box>

            <Box p={3}>
                <Container component={Paper}>
                    <FormControl>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> Email Address:</Typography>
                            <Typography variant="caption" display="block" gutterBottom>This is the email we will use for all TCSW-related communications.</Typography>
                            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> Phone:</Typography>
                            <Typography variant="caption" display="block" gutterBottom>This is the phone number we will use for all TCSW-related communications.</Typography>
                            <TextField fullWidth id="outlined-basic" label="Phone" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Is this event being hosted by an organization, company or other entity? If so, list here. If not, tell us a little bit about yourself.</Typography>
                            <TextField fullWidth id="outlined-basic" label="Host" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Title of your event: </Typography>
                            <TextField fullWidth id="outlined-basic" label="Title" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Describe your event in 150 words or less: </Typography>
                            <TextField fullWidth id="outlined-multiline-flexible" multiline maxRows={5} label="Description" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Approximately how many attendees do you expect? </Typography>
                            <TextField fullWidth id="outlined-basic" label="Attendees" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Where will your event be hosted? </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="Online via the TCSW virtual venue" name="radio-buttons-group">
                                    <FormControlLabel value="Online via the TCSW virtual venue" control={<Radio />} label="Online via the TCSW virtual venue" />
                                    <FormControlLabel value="In Person" control={<Radio />} label="In-person" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>If your event is being held in-person, please share where you would like it to be hosted. </Typography>
                            <Typography variant="caption" display="block" gutterBottom> We would love to host community, culture, art, etc. events at our TCSW Community Hub or other cool spaces in the Cities.</Typography>
                            <TextField fullWidth id="outlined-basic" label="Location" variant="outlined" />
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
                                        value={individualDate}
                                        onChange={handleDateChange}
                                        input={<OutlinedInput label="Date" />}
                                        MenuProps={MenuProps}
                                    >
                                        {dates.map((date) => (
                                            <MenuItem
                                                key={date}
                                                value={date}
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
                            <TextField fullWidth id="outlined-basic" label="Length" variant="outlined" />
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
                                        value={individualTime}
                                        onChange={handleTimeChange}
                                        input={<OutlinedInput label="Time" />}
                                        MenuProps={MenuProps}
                                    >
                                        {times.map((time) => (
                                            <MenuItem
                                                key={time}
                                                value={time}
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
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="Presentation " name="radio-buttons-group">
                                    <FormControlLabel value="Presentation" control={<Radio />} label="Presentation" />
                                    <FormControlLabel value="Panel" control={<Radio />} label="Panel" />
                                    <FormControlLabel value="Workshop" control={<Radio />} label="Workshop" />
                                    <FormControlLabel value="Keynote" control={<Radio />} label="Keynote" />
                                    <FormControlLabel value="Roundtable" control={<Radio />} label="Roundtable" />
                                    <FormControlLabel value="Fireside Chat" control={<Radio />} label="Fireside Chat" />
                                    <FormControlLabel value="Showcase" control={<Radio />} label="Showcase" />
                                    <FormControlLabel value="Demo" control={<Radio />} label="Demo" />
                                    <FormControlLabel value="Meetup" control={<Radio />} label="Meetup" />
                                    <FormControlLabel value="Pitch" control={<Radio />} label="Pitch" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What industry are you focusing on? </Typography>
                            <Typography variant="caption" display="block" gutterBottom> Please select all that are applicable. </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="General Entrepreneurship" name="radio-buttons-group">
                                    <FormControlLabel value="General Entrepreneurship" control={<Radio />} label="General Entrepreneurship" />
                                    <FormControlLabel value="Technology" control={<Radio />} label="Technology" />
                                    <FormControlLabel value="Healthcare" control={<Radio />} label="Healthcare" />
                                    <FormControlLabel value="Retail" control={<Radio />} label="Retail" />
                                    <FormControlLabel value="Food and Ag" control={<Radio />} label="Food and Ag" />
                                    <FormControlLabel value="Education and Training" control={<Radio />} label="Education and Training" />
                                    <FormControlLabel value="Sales" control={<Radio />} label="Sales" />
                                    <FormControlLabel value="Marketing and Advertising" control={<Radio />} label="Marketing and Advertising" />
                                    <FormControlLabel value="Investing" control={<Radio />} label="Investing" />
                                    <FormControlLabel value="Cryptocurrency" control={<Radio />} label="Cryptocurrency" />
                                    <FormControlLabel value="Creative Economy" control={<Radio />} label="Creative Economy" />
                                    <FormControlLabel value="Med Device/MedTech" control={<Radio />} label="Med Device/MedTech" />
                                    <FormControlLabel value="Fintech" control={<Radio />} label="Fintech" />
                                    <FormControlLabel value="Hemp and Cannabis" control={<Radio />} label="Hemp and Cannabis" />
                                    <FormControlLabel value="Smart Cities" control={<Radio />} label="Smart Cities" />
                                    <FormControlLabel value="Social Impact" control={<Radio />} label="Social Impact" />
                                    <FormControlLabel value="Arts and Culture" control={<Radio />} label="Arts and Culture" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>In which track would you like your event featured? </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="Growth" name="radio-buttons-group">
                                    <FormControlLabel value="Growth" control={<Radio />} label="Growth" />
                                    <FormControlLabel value="Founder" control={<Radio />} label="Founder" />
                                    <FormControlLabel value="Designer" control={<Radio />} label="Designer" />
                                    <FormControlLabel value="Maker" control={<Radio />} label="Maker" />
                                    <FormControlLabel value="Product" control={<Radio />} label="Product" />
                                    <FormControlLabel value="Developer" control={<Radio />} label="Developer" />
                                    <FormControlLabel value="People" control={<Radio />} label="People" />
                                    <FormControlLabel value="Spotlight" control={<Radio />} label="Spotlight" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What is the purpose of your event? </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="Celebrating and empowering female leaders" name="radio-buttons-group">
                                    <FormControlLabel value="Celebrating and empowering female leaders" control={<Radio />} label="Celebrating and empowering female leaders" />
                                    <FormControlLabel value="Supporting diversity and inclusion" control={<Radio />} label="Supporting diversity and inclusion" />
                                    <FormControlLabel value="Supporting student and youth entrepreneurs" control={<Radio />} label="Supporting student and youth entrepreneurs" />
                                    <FormControlLabel value="Highlighting arts and culture" control={<Radio />} label="Highlighting arts and culture" />
                                    <FormControlLabel value="Engaging investors" control={<Radio />} label="Engaging investors" />
                                    <FormControlLabel value="Supporting impact ventures or social enterprises" control={<Radio />} label="Supporting impact ventures or social enterprises" />
                                    <FormControlLabel value="None of these specifically" control={<Radio />} label="None of these specifically" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>We require all TCSW events with three or more speakers have gender and/or race/ethnicity diversity with regard to its organization, participation, and content. Will your event align with this requirement? </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="Yes" name="radio-buttons-group">
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> Who would you like to speak at your event? </Typography>
                            <Typography variant="caption" display="block" gutterBottom>Planning to have speakers? Awesome! We'd love to know who you had in mind. Don't worry, this can change down the road. If you need help finding speakers, please list that too! </Typography>
                            <TextField fullWidth id="outlined-basic" label="Speakers" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>We require all TCSW session hosts to commit to following Covid safety protocols, which will be released by TCSW in August based on CDC and State Guidelines.  Do you commit to following all TCSW Covid Safety protocols? </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup defaultValue="Yes" name="radio-buttons-group">
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Please share any related media you would like to have included on your TCSW session listing.  </Typography>
                            <TextField fullWidth id="outlined-basic" label="Media" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>Please share any related media you would like to have included on your TCSW session listing.  </Typography>
                            <TextField fullWidth id="outlined-basic" label="Media" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What does success look like for your event? </Typography>
                            <TextField fullWidth id="outlined-basic" label="Success looks like:" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom>What makes you most excited to host an event during Twin Cities Startup Week? </Typography>
                            <TextField fullWidth id="outlined-basic" label="Most excited to host because:" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> Who else should be hosting an event? (referral)</Typography>
                            <Typography variant="caption" display="block" gutterBottom>We love working with new event hosts and businesses during the week! Do know of any individuals or organizations that have a story to tell, something to teach or incredible content to share? Please list their name, email address and tell us a little bit about why they'd make a great event host - we'll make sure to reach out to them!</Typography>
                            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <Typography variant="body2" gutterBottom> More to share?</Typography>
                            <Typography variant="caption" display="block" gutterBottom>Did we miss anything? Do you have questions? Is there something else about your event you want to share that didn't fit in the questions above? Let us know!</Typography>
                            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
                        </Box>
                        <Button variant="contained">Submit Submission</Button>

                    </FormControl>
                </Container>
            </Box>
        </>
    )
}

export default SubmissionPage;