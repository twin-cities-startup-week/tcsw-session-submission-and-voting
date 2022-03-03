import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useHistory, useParams } from 'react-router-dom';
import { readAndCompressImage } from 'browser-image-resizer';


function slugify(string) {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
    const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
    const p = new RegExp(a.split('').join('|'), 'g');
    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with ‘and’
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}

const imageConfig = {
    quality: 1.0,
    maxHeight: 300,
};


function SubmissionPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    //variables for individual form questions (multiselects are above)
    const { editSubmission: submission } = useSelector((store) => store.submission);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [open, setOpen] = useState(false);
    const { id: submissionId } = useParams();
    useEffect(() => {
        if (submissionId && submissionId !== '') {
            dispatch({ type: "GET_USER_SUBMISSION_DETAIL", payload: submissionId });
        }
    }, [submissionId, dispatch]);

    const useStyles = makeStyles({
        root: {
            width: '100%',
            maxWidth: '920px',
            margin: '0 auto',
            padding: '15px', 
        },
        paper: {
            backgroundColor: '#A7A9AC'
        },
        buttonText: {
            color: '#FBBD19'
        },
        boldText: {
            fontWeight: 500,
        },
        content: {
            paddingTop: '33px',
        }
    });

    const classes = useStyles();

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

    //options for multiselect drop down industries menu
    const industries = [
        'General Entrepreneuership',
        'Technology',
        'Healthcare',
        'Retail',
        'Food and Ag',
        'Education and Training',
        'Sales',
        'Marketing and Advertising',
        'Investing',
        'Cryptocurrency',
        'Creative Economy',
        'Med Device/MedTech',
        'FinTech',
        'Hemp & Cannabis',
        'Smart Cities',
        'Social Impact',
        'Art & Culture',
        'Other',
    ]

    const theme = useTheme();

    //DATES MULTISELECT FUNCTIONS
    function getDateStyles(date, dates, theme) {
        return {
            fontWeight:
                getArray(dates).indexOf(date) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }//end getDateStyles

    function getTimeStyles(time, times, theme) {
        return {
            fontWeight:
                getArray(times).indexOf(time) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }//end getTimeStyles


    //INDUSTRY MULTISELECT FUNCTIONS
    function getIndustryStyles(industry, industries, theme) {
        return {
            fontWeight:
                getArray(industries).indexOf(industry) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }//end getIndustryStyles

    const onFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        console.log('onFileChange');
        const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (selectedFile && selectedFile.size > 1048576 * 5) {
            alert('File is too big. File size limit is 5MB.');
        } else if (selectedFile && acceptedFileTypes.includes(selectedFile.type)) {
            const copyFile = new Blob([selectedFile], { type: selectedFile.type });
            const resizedFile = await readAndCompressImage(copyFile, imageConfig);
            dispatch({
                type: "SET_EDITING_SUBMISSION", payload: {
                    ...submission,
                    image: URL.createObjectURL(resizedFile),
                }
            });
            setFileToUpload(selectedFile);
        }
    };

    const onSubmissionComplete = () => {
        setOpen(false);
        alert('Thank you for your submission!');
        dispatch({ type: "CLEAR_EDITING_SUBMISSION"});
        setFileToUpload(null);
        history.push('/user/submission');
    }

    const onSubmissionFailure = () => {
        setOpen(false);
        alert('There was a problem with your submission. Please reach out to hello@beta.mn so that we can help.')
    }

    const getArray = (value) => {
        let result = [];
        if (typeof value === 'string') {
            result = JSON.parse(value);
        } else if (Array.isArray(value)) {
            result = value;
        }
        return result;
    }

    //posting new submission to db as an object
    const addSubmission = (event) => {
        event.preventDefault();
        setOpen(true);
        const newSubmission = Object.assign({}, submission);
        try {
            if (newSubmission.email === ''
                || newSubmission.phone === ''
                || newSubmission.host === ''
                || newSubmission.title === '' 
                || newSubmission.description === ''
                || newSubmission.attendees === '' 
                || newSubmission.location === ''
                || newSubmission.location_details === ''
                || newSubmission.length === ''
                || newSubmission.format === ''
                || newSubmission.track === ''
                || newSubmission.area_of_interest === ''
                || newSubmission.diversity === ''
                || newSubmission.speakers === ''
                || newSubmission.covid === ''
                || newSubmission.success === ''
                || newSubmission.excited === ''
                || newSubmission.industry.length === 0
                || newSubmission.time.length === 0
                || newSubmission.date.length === 0) {
                setOpen(false);
                alert('All fields must be completed in order to submit the form!');
                return;
            }
        } catch (e) {
            console.log(e);
            setOpen(false);
            alert('Oh no! Something went wrong. Please reach out to us directly for help: hello@beta.mn');
            return;
        }
        if (fileToUpload && fileToUpload.name) {
            fileToUpload.fileName = `${slugify(newSubmission.title)}.${fileToUpload.name.split('.').pop()}`;
        }
        if (submissionId && submissionId !== '') {
            dispatch({ type: 'UPDATE_SUBMISSION_TO_SERVER', payload: newSubmission, fileToUpload, onComplete: onSubmissionComplete, onFailure: onSubmissionFailure });

        } else {
            dispatch({ type: 'POST_SUBMISSION_TO_SERVER', payload: newSubmission, fileToUpload, onComplete: onSubmissionComplete, onFailure: onSubmissionFailure });

        }

    } //end addSubmission

    const handleChangeFor = (property) => (event) => {
        dispatch({
            type: "SET_EDITING_SUBMISSION", payload: {
                ...submission,
                [property]: event.target.value,
            } 
        });
    }

    return (
        <div className={classes.root}>
            
            <Dialog open={open}>
                <DialogTitle id="responsive-dialog-title">
                    Please wait...
                </DialogTitle>
                <DialogContent align="center" className={classes.feedbackContainer}>
                    <span role="img" aria-label="loading">⌛</span>
                    {/* TODO: Add animation */}
                </DialogContent>
                {/* This modal can't be closed. */}
            </Dialog>
            <div className={classes.content}>
                <Box>
                    <Typography variant="h2">
                        TCSW Session Selector Form
                    </Typography>
                </Box>
                {/* {JSON.stringify(submission)} */}
                <br />
                <Box>
                    <Container component={Paper} elevation={6}>
                        <form onSubmit={addSubmission}>
                            <FormControl>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom> Email Address:</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>This is the email we will use for all TCSW-related communications.</Typography>
                                    <TextField fullWidth id="email-input" label="Email" variant="outlined" required value={submission.email} onChange={handleChangeFor('email')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom> Phone:</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>This is the phone number we will use for all TCSW-related communications.</Typography>
                                    <TextField fullWidth id="phone-input" label="Phone" variant="outlined" required value={submission.phone} onChange={handleChangeFor('phone')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>Is this event being hosted by an organization, company or other entity? If so, list here. If not, tell us a little bit about yourself.</Typography>
                                    <TextField fullWidth id="host-input" label="Host" variant="outlined" required value={submission.host} onChange={handleChangeFor('host')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>Title of your event: </Typography>
                                    <TextField fullWidth id="title-input" label="Title" variant="outlined" required value={submission.title} onChange={handleChangeFor('title')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>Image for your event:</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>Preferred size 400px wide by 400px tall.</Typography>
                                    {
                                        submission.image
                                        && submission.image !== ''
                                        && (
                                            <div>
                                                <img
                                                    src={submission.image}
                                                    alt="Preview image"
                                                    style={{ width: '240px', height: '240px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        )
                                    }
                                    <Input
                                        id="courseWorkUpload"
                                        type="file"
                                        inputProps={{ accept: 'image/jpg,image/png,image/jpeg' }}
                                        disableUnderline
                                        onChange={onFileChange}
                                    />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>Describe your event in 150 words or less: </Typography>
                                    <TextField fullWidth id="description-input" multiline maxRows={5} label="Description" variant="outlined" required value={submission.description} onChange={handleChangeFor('description')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>Approximately how many attendees do you expect? </Typography>
                                    <TextField type="number" fullWidth id="attendees-input" label="Attendees" variant="outlined" required value={submission.attendees} onChange={handleChangeFor('attendees')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>Where will your event be hosted? </Typography>
                                    <FormControl component="fieldset" value={submission.location} onChange={handleChangeFor('location')}>
                                        <RadioGroup value={submission.location} name="radio-buttons-group">
                                            <FormControlLabel value={'Online via the TCSW virtual venue'} control={<Radio />} label="Online via the TCSW virtual venue" />
                                            <FormControlLabel value={'In-person'} control={<Radio />} label="In-person" />
                                            <FormControlLabel value={'To be determined'} control={<Radio />} label="To be determined" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>If your event is being held in-person, please share where you would like it to be hosted. </Typography>
                                    <Typography variant="caption" display="block" gutterBottom> We would love to host community, culture, art, etc. events at our TCSW Community Hub or other cool spaces in the Cities.</Typography>
                                    <TextField fullWidth id="location-input" label="Location Details" variant="outlined" value={submission.location_details} onChange={handleChangeFor('location_details')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>What day(s) work for you to host your event? </Typography>
                                    <Typography variant="caption" display="block" gutterBottom> Select all that apply. </Typography>
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-multiple-name-label">Date</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={getArray(submission.date)}
                                                onChange={handleChangeFor('date')}
                                                input={<OutlinedInput label="Date" />}
                                                MenuProps={MenuProps}
                                                
                                            >
                                                {dates.map((date) => (
                                                    <MenuItem
                                                        key={date}
                                                        value={date}
                                                        style={getDateStyles(date, submission.date, theme)}
                                                    >
                                                        {date}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom> Approximately how long will your event be?</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>Please keep in mind people need time to travel between events. </Typography>
                                    <TextField fullWidth id="length-input" label="Length" variant="outlined" required value={submission.length} onChange={handleChangeFor('length')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>Which time do you prefer to host? </Typography>
                                    <Typography variant="caption" display="block" gutterBottom> TCSW is packed with events! As we piece together our calendar, we will work with you to find a great slot for your event. Please select all that apply. </Typography>
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-multiple-name-label">Time</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={getArray(submission.time)}
                                                onChange={handleChangeFor('time')}
                                                input={<OutlinedInput label="Time" />}
                                                MenuProps={MenuProps}
                                            >
                                                {times.map((time) => (
                                                    <MenuItem
                                                        key={time}
                                                        value={time}
                                                        style={getTimeStyles(time, submission.time, theme)}
                                                    >
                                                        {time}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>What is the event format? </Typography>
                                    <FormControl component="fieldset" required onChange={handleChangeFor('format')}>
                                        <RadioGroup value={submission.format} name="radio-buttons-group">
                                            <FormControlLabel value={'Presentation'} control={<Radio />} label="Presentation" />
                                            <FormControlLabel value={'Panel'} control={<Radio />} label="Panel" />
                                            <FormControlLabel value={'Workshop'} control={<Radio />} label="Workshop" />
                                            <FormControlLabel value={'Keynote'} control={<Radio />} label="Keynote" />
                                            <FormControlLabel value={'Roundtable'} control={<Radio />} label="Roundtable" />
                                            <FormControlLabel value={'Fireside Chat'} control={<Radio />} label="Fireside Chat" />
                                            <FormControlLabel value={'Showcase'} control={<Radio />} label="Showcase" />
                                            <FormControlLabel value={'Demo'} control={<Radio />} label="Demo" />
                                            <FormControlLabel value={'Meetup'} control={<Radio />} label="Meetup" />
                                            <FormControlLabel value={'Pitch'} control={<Radio />} label="Pitch" />
                                            <FormControlLabel value={'Other'} control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>What industry are you focusing on? </Typography>
                                    <Typography variant="caption" display="block" gutterBottom> Please select all that are applicable. </Typography>
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-multiple-name-label">Industry</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={getArray(submission.industry)}
                                                onChange={handleChangeFor('industry')}
                                                input={<OutlinedInput label="Industry" />}
                                                MenuProps={MenuProps}
                                            >
                                                {industries.map((industry) => (
                                                    <MenuItem
                                                        key={industry}
                                                        value={industry}
                                                        style={getIndustryStyles(industry, submission.industry, theme)}
                                                    >
                                                        {industry}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>In which track would you like your event featured? </Typography>
                                    <FormControl component="fieldset" required onChange={handleChangeFor('track')}>
                                        <RadioGroup value={submission.track} name="radio-buttons-group">
                                            <FormControlLabel value={'Growth'} control={<Radio />} label="Growth" />
                                            <FormControlLabel value={'Founder'} control={<Radio />} label="Founder" />
                                            <FormControlLabel value={'Designer'} control={<Radio />} label="Designer" />
                                            <FormControlLabel value={'Maker'} control={<Radio />} label="Maker" />
                                            <FormControlLabel value={'Product'} control={<Radio />} label="Product" />
                                            <FormControlLabel value={'Developer'} control={<Radio />} label="Developer" />
                                            <FormControlLabel value={'People'} control={<Radio />} label="People" />
                                            <FormControlLabel value={'Spotlight'} control={<Radio />} label="Spotlight" />
                                            <FormControlLabel value={'Investor'} control={<Radio />} label="Investor" />
                                            <FormControlLabel value={'Corporate'} control={<Radio />} label="Corporate" />
                                            <FormControlLabel value={'Other'} control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>What is the purpose of your event? </Typography>
                                    <FormControl component="fieldset" onChange={handleChangeFor('purpose')}>
                                        <RadioGroup value={submission.purpose} name="radio-buttons-group">
                                            <FormControlLabel value={'To Enable: Help teach a skill or set of skills'} control={<Radio />} label="To Enable: Help teach a skill or set of skills" />
                                            <FormControlLabel value={'To Inspire: Inspire attendees through showcasing'} control={<Radio />} label="To Inspire: Inspire attendeess through showcasing" />
                                            <FormControlLabel value={'To Connect: Help bring like minded people together so they can connect and network'} control={<Radio />} label="To Connect: Help bring like minded people together so they can connect and network" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>Does your event cater to one or more of the following? </Typography>
                                    <FormControl component="fieldset" required value={submission.area_of_interest} onChange={handleChangeFor('area_of_interest')}>
                                        <RadioGroup value={submission.area_of_interest} name="radio-buttons-group">
                                            <FormControlLabel value={'Celebrating and empowering female leaders'} control={<Radio />} label="Celebrating and empowering female leaders" />
                                            <FormControlLabel value={'Supporting diversity and inclusion'} control={<Radio />} label="Supporting diversity and inclusion" />
                                            <FormControlLabel value={'Support student and youth entrepreneurs'} control={<Radio />} label="Supporting student and youth entrepreneurs" />
                                            <FormControlLabel value={'Highlighting arts and culture'} control={<Radio />} label="Highlighting arts and culture" />
                                            <FormControlLabel value={'Engaging investors'} control={<Radio />} label="Engaging investors" />
                                            <FormControlLabel value={'Supporting impact ventures or social enterprises'} control={<Radio />} label="Supporting impact ventures or social enterprises" />
                                            <FormControlLabel value={'None of these specifically'} control={<Radio />} label="None of these specifically" />
                                            <FormControlLabel value={'Other'} control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>We require all TCSW events with three or more speakers have gender and/or race/ethnicity diversity with regard to its organization, participation, and content. Will your event align with this requirement? </Typography>
                                    <FormControl component="fieldset" required value={submission.diversity} onChange={handleChangeFor('diversity')}>
                                        <RadioGroup value={submission.diversity} name="radio-buttons-group">
                                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom> Who would you like to speak at your event? </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>Planning to have speakers? Awesome! We'd love to know who you had in mind. Don't worry, this can change down the road. If you need help finding speakers, please list that too! </Typography>
                                    <TextField fullWidth id="speaker-input" label="Speakers" variant="outlined" required value={submission.speakers} onChange={handleChangeFor('speakers')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>We require all TCSW session hosts to commit to following Covid safety protocols, which will be released by TCSW in August based on CDC and State Guidelines.  Do you commit to following all TCSW Covid Safety protocols? </Typography>
                                    <FormControl component="fieldset" required value={submission.covid} onChange={handleChangeFor('covid')}>
                                        <RadioGroup value={submission.covid} name="radio-buttons-group">
                                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="false" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>Please share any related media you would like to have included on your TCSW session listing (YouTube links, etc).</Typography>
                                    <TextField fullWidth id="media-input" label="Media" variant="outlined" value={submission.media} onChange={handleChangeFor('media')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>What does success look like for your event? </Typography>
                                    <TextField fullWidth id="success-input" label="Success looks like..." variant="outlined" required value={submission.success} onChange={handleChangeFor('success')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom>What makes you most excited to host an event during Twin Cities Startup Week? </Typography>
                                    <TextField fullWidth id="excited-input" label="Most excited to host because..." variant="outlined" required value={submission.excited} onChange={handleChangeFor('excited')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom> Who else should be hosting an event? (referral)</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>We love working with new event hosts and businesses during the week! Do know of any individuals or organizations that have a story to tell, something to teach or incredible content to share? Please list their name, email address and tell us a little bit about why they'd make a great event host - we'll make sure to reach out to them!</Typography>
                                    <TextField fullWidth id="referral-input" label="Referral" variant="outlined" value={submission.other_hosts} onChange={handleChangeFor('other_hosts')} />
                                </Box>
                                <Box p={1}>
                                    <Typography variant="body2" className={classes.boldText} gutterBottom> More to share?</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>Did we miss anything? Do you have questions? Is there something else about your event you want to share that didn't fit in the questions above? Let us know!</Typography>
                                    <TextField fullWidth id="questions-input" label="More to share?" variant="outlined" value={submission.other_info} onChange={handleChangeFor('other_info')} />
                                </Box>
                                <Box p={2}>
                                <Button fullWidth variant="contained" type="submit" className={classes.buttonText}>Submit</Button>
                                </Box>
                            </FormControl>
                        </form>
                    </Container>
                </Box>
            </div>
        </div>
    )
}

export default SubmissionPage;