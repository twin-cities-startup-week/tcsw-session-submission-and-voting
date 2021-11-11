import React, { useState } from 'react';


//Material-ui
import { Paper, makeStyles } from "@material-ui/core";
  
    // Styling
  const useQuestions = makeStyles({
    questions: {
        width: '100%',
        maxWidth: '768px',
        margin: '0 auto',
        padding: '15px',
        margin: '15px', 
        padding: '15px', 
        backgroundColor: '#fff', 
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',

        position: 'relative',
        fontSize: '20px',
        paddingRight: '80px'

    }
  });

  // Styling
  const useAnswers = makeStyles({
    answers: {
        // opacity: '0',
        // maxHeight: '0',
        // overflowY: 'hidden',
        // transition: 'all 0.4s ease',

    }
  });


function FaqItemPage ({faq, index}) {

    const questions = useQuestions();
    const answers = useAnswers();

    const [openAnswers, setOpenAnswers] = useState(false);

    
    
    return (
    <div onClick={() => setOpenAnswers(!openAnswers)}
        key={index} 
        > 
        <div className={questions.questions}> 
            {faq.question}
        </div>

        {openAnswers && <div  className={answers.answers}> 
            {faq.answer}
        </div>}
    </div>
    )
}


export default FaqItemPage;