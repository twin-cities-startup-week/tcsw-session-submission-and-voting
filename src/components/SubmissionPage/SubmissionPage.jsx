import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container'


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
            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined"  />
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


            </FormControl>
            </Container>
            </Box>
        </>
    )
}

export default SubmissionPage;