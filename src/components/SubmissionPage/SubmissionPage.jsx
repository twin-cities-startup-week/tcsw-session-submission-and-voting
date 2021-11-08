import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


function SubmissionPage() {


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



                    </FormControl>
                </Container>
            </Box>
        </>
    )
}

export default SubmissionPage;