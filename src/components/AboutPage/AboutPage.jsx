import React from "react";
import { useState, useEffect } from "react";

import { Paper, makeStyles } from "@material-ui/core";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  const [learnMore, setLearnMore] = useState(false);

  const learnMoreInfo = () => {
    setLearnMore(!learnMore);
  };

  return (
    <Paper elevation={15}>
      <div className="container">
        <div>
          <h2>TCSW Session Submission & Voting</h2>
          <h4>2022 Session Submission Dates</h4>
          <p> Session Submission Deadline: May 15, 2022</p>
          <p> Session Voting Deadline: June 5, 2022</p>

          <p>Twin Cities Startup Week is back from September 16 - 23, 2022!</p>

          <p>
            Interested in hosting a session? If you are an individual, business,
            or community organization doing amazing things in the world of
            startups and innovation, we'd love to work with you!{" "}
          </p>

          <p>There are a few steps to organizing a TCSW session:</p>

          <p>SESSION PROPOSALS ARE DUE MAY 1ST - NEED TO UPDATE</p>

          <p>
            1. Use this form to submit your session proposal by May 1st. Once
            submitted, we will reach out with any questions that we have. We
            will notify you by ????? whether your sessions was accepted or not.
            Every year we receive more sessions that we have time slots on the
            schedule so if your session is not accepted, please think about
            applying next year!
          </p>

          <p>
            2. If your session is accepted, final details are due ???. This will
            include speaker information, content summary, location, and
            timing/length. We know that things may change, but ask that you
            submit as much as possible so we can upload information into our
            master calendar prior to our schedule being announced on ????.
          </p>

          <p>
            3: Spread the word! We will work with you to help promote your
            session and make sure you - and your attendees - have an incredible
            experience. On ??? we will host an Event Host Webinar focused on how
            to prepare for and promote your TCSW session.
          </p>

          <p>
            4: (Virtual sessions) Attend one of the Session Host TCSW Dress
            Rehearsals to test and practice using the technology and make sure
            you and your speakers are comfortable with the Hopin platform
            (taking place in August).
          </p>

          <p>
            5: Attend the TCSW Event Host Happy Hour on ????. This will be a
            time you can learn more about other events happening throughout the
            week and connect with other event hosts.
          </p>

          <p>
            6: Host your event! We're planning on having about 200 events this
            year.
          </p>

          <p>
            7: Provide feedback. It is important to us that event hosts,
            partners and attendees are given an opportunity to provide feedback.
            As an event host, we will send you a survey to gather feedback and
            capture any stories that came out of your events. We will also
            provide you a few questions to ask your attendees.
          </p>

          <p>
            If you have any questions or concerns about TCSW 2021, please don't
            hesitate to reach out to kelly@beta.mn.
          </p>

          <button type="submit" onClick={learnMoreInfo}>
            
            Learn More
          </button>
        </div>
        {learnMore && (
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
            repellat accusamus velit eaque sint ex, adipisci laborum, porro
            repellendus aspernatur, dignissimos odio. Quasi ex nobis, tempora
            beatae ad hic alias?
          </p>
        )}
      </div>
    </Paper>
  );
}

export default AboutPage;
