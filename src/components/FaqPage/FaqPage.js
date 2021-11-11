import React, {useState} from 'react';
import FaqItemPage from '../FaqItemPage/FaqItemPage';

//Material-ui
import { Paper, makeStyles } from "@material-ui/core";
  
    // Styling
  const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: '768px',
        margin: '0 auto',
        padding: '15px',
        margin: '15px', 
        padding: '15px', 
        backgroundColor: '#fff', 
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',

    }
  });

function FaqPage (){
    const classes = useStyles();


    const [faqs, setFaqs] = useState([
        {
            question: 'What is a panelPicker?',
            answer: 'PanelPicker is a session proposal platform',
        },
        {
            question: 'How can I request a panel?',
            answer: 'You have to be a registered user, and your topic have to be approved',
        }
    ])
    // const openFaqs = () => {
    //     setFaqs(!faqs)
    // } 
    return (
        <div>
       <h2>TCSW Session Submission & Voting</h2>
          <h4> 2022 Session Submission Dates</h4>
              <p> Session Submission Deadline: May 15, 2022</p>
              <p> Session Voting Deadline: June 5, 2022</p>

        <div className={classes.root}> 
        {faqs.map((faq, i) => 
            <FaqItemPage faq={faq} index={i}/>
        )}
        </div>
        </div>
    )}


export default FaqPage;