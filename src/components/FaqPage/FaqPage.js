import React, {useState, useEffect} from 'react';
import FaqItemPage from '../FaqItemPage/FaqItemPage';
import Typography from '@mui/material/Typography';
import './Faq.css';
import { useDispatch, useSelector } from "react-redux";
import ReactGA from 'react-ga';

//Material-ui
import { Paper, makeStyles } from "@material-ui/core";  
    //Styling
  const useStyles = makeStyles({
    root: {
        maxWidth: '920px',
        margin: '0 auto',
        padding: '5px 20px 50px 20px', 
    },
    shadow: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        paddingTop: '10px',
        paddingBottom: '10px',
        width: '100%',
    },
    content: {
        paddingTop: '33px',
    }
  });

function FaqPage (){
    const classes = useStyles();
    const dispatch = useDispatch();
    const { faq } = useSelector((store) => store.content);
    useEffect(() => {
        dispatch({ type: "FETCH_FAQ" });
    }, [dispatch]);
      
    useEffect(() => {
        if (process.env.REACT_APP_GA_CODE) {
            ReactGA.pageview('/faq');
        }
    }, []);

    const [faqs, setFaqs] = useState([
        {
            question: 'What is the Session Selector?',
            answer: 'The TCSW Session Selector is a platform where you can submit your event ideas for Twin Cities Startup Week (TCSW) as well as vote for which sessions you want to see at the festival. The Session Selector is a way for the community to be more involved in the content presented at TCSW.',
        },
        {
            question: `What is the timeline?`,
            answer:`- April 6th - Session Submissions Open
- June 12th - Session Submissions Close 
- June 13th-15th - TCSW Team finalizes approved sessions
- June 16th - Session Voting Opens 
- June 29th - Session Voting Closes
- June 30th - July 5th - TCSW Team creates TCSW Schedule 
- July 6th - TCSW Team notifies approved sessions and requests more event details 
- July 27th - TCSW session details due 
- August 3rd - Launch TCSW Schedule & Public Registration 
- August 3rd - September 23rd - TCSW Promotion`
        },
            
        {
            question: 'How do I submit a session application?',
            answer: `1. Visit: [https://sessions.twincitiesstartupweek.com/](https://sessions.twincitiesstartupweek.com/)
2. Click the REGISTER button on the homepage to create your Session Selector Account.
3. Use the SUBMISSION Form button on the homepage to share your session details and submit your TCSW event idea.
`
        },

        {
            question: 'Can I enter an application after the deadline?',
            answer: 'Please make all submissions before June 12, 2022. If you think this is an extenuating circumstance, you can email [tcsw@beta.mn](mailto:tcsw@beta.mn?subject=TCSW%20Session%20Selector) with any questions or concerns.'
        },

        {
            question: 'How are Session Selector applications selected for TCSW?',
            answer: 'Sessions are selected based on both community voting and input from the TCSW team. The TCSW team will use public voting to determine TCSW Main Stage Track sessions as well as the community sessions that will be featured on the TCSW calendar. Every year we receive more sessions that we have time slots on the schedule so make sure to bring your best!'
        }, 

        {
            question: 'How many applications can be submitted?',
            answer: 'You can submit up to five applications per entity.',
        },

        {
            question: 'Will my application be public?',
            answer: 'The information you submit in your application will be what the public sees during community voting.'
        },

        {
            question: 'Are vote counts public?',
            answer: 'No, only the TCSW team can see the number of Up or Down votes each session gets. However, the Leaderboard will show the sessions with the most votes!'
        },

        {
            question: 'What session criteria will be used to evaluate the submissions?',
            answer: `We look for sessions that align with the following purposes: 
- To Enable: Help teach a skill or set of skills
- To Inspire: Inspire attendees through showcasing
- To Connect: Help bring like minded people together so they can connect and network

Session Selection Criteria
- Diverse representation - we are asking that all sessions with three or more speakers include some diversity in gender and/or race representation.
- A unique experience
- Well-written application
- Thought put into the attendee experience
- Session is an appropriate length for content
- Flexible with schedule
- Interest from the community using the Session Selector

Common Session Pitfalls
- Sales pitch
- Poorly written application
- Event is too long
- No thought put into the attendee experience
- Poor communication with the TCSW team
`
        },

        {
            question: 'Are there examples of past TCSW sessions?',
            answer: 'Yes! You can find all 2020 and 2021 mainstage and virtual sessions on the [TCSW Resource Library](https://www.twincitiesstartupweek.com/en-us/resource-library)'
        },

        {
            question: 'Can I edit my session application?',
            answer: 'Yes. If you are logged into your Session Selector account, you can view and edit your session application(s) until submissions close on June 12, 2022. Our team will review the edited submission and reevaluate its acceptance into the TCSW Session Selector for public voting.'
        },

        {
            question: 'Can I encourage my network to vote for my session during community voting?',
            answer: `Yes, please do! The TCSW team will provide a media kit if your session is selected for community voting. The best way to ensure your session is selected to be at TCSW 2022 is to prove the community is interested in your topic, so promote away! There is also a social media option on the Session Selector platform.`
        },

        {
            question: 'If I\'m selected, what happens next?',
            answer: 'The TCSW team will notify you in early July 2022 via email if your session has been selected. We will ask for more information and share next steps in this messaging (see timeline above).'
        }
    ])
  
    return (
        <div className={classes.root}> 
            <div className={classes.content}>
                <Typography variant="h2">
                    TCSW Session Submission & Voting
                </Typography>
                <h4> 2022 Session Submission Dates</h4>
                <p> Session Submission Deadline: April 6, 2022 to June 12, 2022</p>
                <p> Session Voting Deadline: June 16, 2021 to June 29, 2022</p>
                <br />
            </div>  
            <div className={classes.shadow}>
                {faq.map((faq, i) =>
                    <FaqItemPage faq={faq} index={i} />
                )}
            </div>      

        
        </div>
    )}


export default FaqPage;