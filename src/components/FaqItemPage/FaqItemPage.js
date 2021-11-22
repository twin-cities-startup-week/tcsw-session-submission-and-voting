import React, { useState } from "react";

//Material-ui
import { Paper, makeStyles } from "@material-ui/core";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Styling
const useQuestions = makeStyles({
  questions: {
    width: "100%",
    maxWidth: "768px",
    margin: "0 auto",
    padding: "15px",
    margin: "15px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",

    position: "relative",
    fontSize: "20px",
    paddingRight: "80px",

    backgroundImage: "url(./arrow-down-mint.svg)",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",


    // // content: '',
    // // position: 'absolute',
    // // top: '50%',
    // right: '0px',
    // // transform: 'translateY(-50%)',
    // width: '30px',
    // height: '30px'
  },
});

// Styling
const useAnswers = makeStyles({
  arrow: {
    color: 'green'
  },
});

function FaqItemPage({ faq, index }) {
  const questions = useQuestions();
  const arrow = useAnswers();

  const [openAnswers, setOpenAnswers] = useState(false);

  return (
    <div onClick={() => setOpenAnswers(!openAnswers)} key={index}>
      <div className={questions.questions}>{faq.question}<ArrowDownwardIcon className={arrow}/></div>

      {openAnswers && <div >{faq.answer}</div>}
      {/* className={answers.answers} */}
    </div>
  );
}

export default FaqItemPage;
