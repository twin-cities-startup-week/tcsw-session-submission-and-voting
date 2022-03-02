import React, {useState} from 'react';
import FaqItemPage from '../FaqItemPage/FaqItemPage';
import Typography from '@mui/material/Typography';
import './Faq.css';

//Material-ui
import { Paper, makeStyles } from "@material-ui/core";  
    //Styling
  const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: '920px',
        margin: '0 auto',
        padding: '15px', 

    },
    shadow: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        padding: '15px',
        width: '100%',
    },
    content: {
        paddingTop: '33px',
    }
  });

function FaqPage (){
    const classes = useStyles();


    const [faqs, setFaqs] = useState([
        {
            question: 'What is the Session Selector?',
            answer: 'The TCSW Session Selector is a way for the community to be more involved in the content presented at TCSW! Prospective speakers and event hosts can submit their ideas to the Session Selector, which will then be voted on by the community and TCSW team.',
        },
        {
            question: `What is the timeline?`,
            answer:`- April 4th - Session Submissions Open 
- May 15th - Session Submissions Close 
- May 16th-20th - TCSW Team finalizes approved sessions 
- May 23rd - Session Voting Opens 
- June 5th - Session Voting Closes 
- June 6th-24th - TCSW Team creates TCSW Schedule 
- June 27th - TCSW Team notifies approved sessions and requests more event details 
- July 22nd - TCSW session details due 
- August 1st - Launch TCSW Schedule & Public Registration 
- August 1st-September 15th - TCSW Promotion`
        },
            
        {
            question: 'How do I enter a session application?',
            answer: 'Visit the TCSW Session Selector platform to submit an application for a TCSW 2022 session.'
        },

        {
            question: 'Can I enter an application after the deadline?',
            answer: 'Please make all submissions before May 15, 2022. If you think this is an extenuating circumstance, you can email [hello@beta.mn](mailto:hello@beta.mn?subject=TCSW%20Session%20Selector) with any questions or concerns.'
        },

        {
            question: 'How are Session Selector applications selected for TCSW?',
            answer: 'Sessions are selected based on both community voting and input from the TCSW team.'
        }, 

        {
            question: 'How many applications can be submitted?',
            answer: 'You can submit up to five applications per entity.',
        },

        {
            question: 'Will my application be public?',
            answer: 'The information you submit in your application will be what the public sees when voting. '
        },

        {
            question: 'Are vote counts public?',
            answer: 'No — only the TCSW team can see the number of Up or Down votes each session gets. However, the Leaderboard will show the sessions with the most votes!'
        },

        {
            question: 'What are the speaker requirements?',
            answer: 'Similar to the past few years, we are asking that all sessions with three or more speakers include some diversity in gender and/or race representation.'
        },

        {
            question: 'Are there examples of past TCSW sessions?',
            answer: 'Yes! You can find all 2020 and 2021 mainstage and virtual sessions on the TCSW Resource Library.'
        },

        {
            question: 'Can I edit my application?',
            answer: 'Yes. If you are logged into your Session Selector account, you can edit your session application until community voting opens on May 23, 2022.'
        },

        {
            question: 'Can I encourage my community to vote for my session during community voting?',
            answer: `Yes, please do! The TCSW team will provide a media kit if your session is 
            selected for community voting. The best way to ensure your session is selected 
            to be at TCSW 2022 is to prove the community is interested in your topic, so promote away!
            There is also a social media option on the Session Selector platform.`
        },

        {
            question: 'If I’m selected, what happens next?',
            answer: 'The TCSW team will notify you in June 2022 via email if your session has been selected. We will ask for more information and share next steps in this messaging!'
        }
    ])
  
    return (
        <div className={classes.root}> 
            <div className={classes.content}>
                <Typography variant="h2">
                    TCSW Session Submission & Voting
                </Typography>
                <h4> 2022 Session Submission Dates</h4>
                <p> Session Submission Deadline: April 4, 2022 to May 15, 2022</p>
                <p> Session Voting Deadline: May 23, 2021 to June 5, 2022</p>
                <br />
            </div>  
            <div className={classes.shadow}>
                {faqs.map((faq, i) =>
                    <FaqItemPage faq={faq} index={i} />
                )}
            </div>      

        
        </div>
    )}


export default FaqPage;