module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('faq',
      [
        {
          order: 1,
          question: 'What is the Session Selector?',
          answer: 'The TCSW Session Selector is a platform where you can submit your event ideas for Twin Cities Startup Week (TCSW) as well as vote for which sessions you want to see at the festival. The Session Selector is a way for the community to be more involved in the content presented at TCSW.',
        }, {
          order: 2,
          question: 'What is the timeline?',
          answer: `- April 6th - Session Submissions Open
- June 12th - Session Submissions Close 
- June 13th-15th - TCSW Team finalizes approved sessions
- June 16th - Session Voting Opens 
- June 29th - Session Voting Closes
- June 30th - July 5th - TCSW Team creates TCSW Schedule 
- July 6th - TCSW Team notifies approved sessions and requests more event details 
- July 27th - TCSW session details due 
- August 3rd - Launch TCSW Schedule & Public Registration 
- August 3rd - September 23rd - TCSW Promotion`,
        },
        {
          order: 3,
          question: 'How do I submit a session application?',
          answer: `1. Visit: [https://sessions.twincitiesstartupweek.com/](https://sessions.twincitiesstartupweek.com/)
2. Click the REGISTER button on the homepage to create your Session Selector Account.
3. Use the SUBMISSION Form button on the homepage to share your session details and submit your TCSW event idea.
`,
        },
        {
          order: 4,
          question: 'Can I enter an application after the deadline?',
          answer: 'Please make all submissions before June 12, 2022. If you think this is an extenuating circumstance, you can email [tcsw@beta.mn](mailto:tcsw@beta.mn?subject=TCSW%20Session%20Selector) with any questions or concerns.',
        },
        {
          order: 5,
          question: 'How are Session Selector applications selected for TCSW?',
          answer: 'Sessions are selected based on both community voting and input from the TCSW team. The TCSW team will use public voting to determine TCSW Main Stage Track sessions as well as the community sessions that will be featured on the TCSW calendar. Every year we receive more sessions that we have time slots on the schedule so make sure to bring your best!',
        },
        {
          order: 6,
          question: 'How many applications can be submitted?',
          answer: 'You can submit up to five applications per entity.',
        },
        {
          order: 7,
          question: 'Will my application be public?',
          answer: 'The information you submit in your application will be what the public sees during community voting.',
        },
        {
          order: 8,
          question: 'Are vote counts public?',
          answer: 'No, only the TCSW team can see the number of Up or Down votes each session gets. However, the Leaderboard will show the sessions with the most votes!',
        },
        {
          order: 9,
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
`,
        },
        {
          order: 10,
          question: 'Are there examples of past TCSW sessions?',
          answer: 'Yes! You can find all 2020 and 2021 mainstage and virtual sessions on the [TCSW Resource Library](https://www.twincitiesstartupweek.com/en-us/resource-library)',
        },
        {
          order: 11,
          question: 'Can I edit my session application?',
          answer: 'Yes. If you are logged into your Session Selector account, you can view and edit your session application(s) until submissions close on June 12, 2022. Our team will review the edited submission and reevaluate its acceptance into the TCSW Session Selector for public voting.',
        },
        {
          order: 12,
          question: 'Can I encourage my network to vote for my session during community voting?',
          answer: `Yes, please do! The TCSW team will provide a media kit if your session is selected for community voting. The best way to ensure your session is selected to be at TCSW 2022 is to prove the community is interested in your topic, so promote away! There is also a social media option on the Session Selector platform.`,
        },
        {
          order: 13,
          question: 'If I\'m selected, what happens next?',
          answer: 'The TCSW team will notify you in early July 2022 via email if your session has been selected. We will ask for more information and share next steps in this messaging (see timeline above).',
        },
      ]);
      await queryInterface.bulkInsert('content_block',
        [
          {
            name: 'about',
            content: `## TCSW Session Selector & Voting
#### 2022 Session Submission Dates
Session Submissions Open: April 6 to June 12, 2022

Session Voting Open: June 16 to June 29, 2022

"Twin Cities Startup Week is a week-long celebration of **Minnesota entrepreneurs and innovators** created by and for the community. This year, we’re taking the experience to a new level by introducing a platform that will empower community members to influence the panels, speakers, and sessions that will be showcased on the schedule throughout the week – the TCSW Session Selector. Thank you for your help highlighting the best of the Startup Capital of the North!” – Kelly Schultze, Managing Director of Twin Cities Startup Week 

The TCSW Session Selector is a way for the community to be more involved in the sessions, workshops, panels, and events at TCSW. Whether you are hosting an event for TCSW 2022 or just want to have a say in what’s presented, you’re in the right place. Create an account, submit your session application for TCSW 2022, and vote on content you want to see all in one platform. You can also leave comments on why you think certain sessions are important!

Questions? Check out our [FAQ page](https://sessions.twincitiesstartupweek.com/#/faq)

Have an idea? [Start submitting now!](https://sessions.twincitiesstartupweek.com/#/submission)

HISTORY:

This is the first year the TCSW team is trying out this process. We heard from the community in 2020 and 2021, and wanted to make sure all ideas and input were considered. We worked with Prime Digital Academy to make the platform come to life — you can learn more about them [here](https://www.primeacademy.io/)! 

APPLICATION PROCESS: We encourage anyone in the community with valuable thought leadership to submit an application through the Session Selector between April 6, 2022 - June 12, 2022. Once applications close, the TCSW team will be in touch if your session made it to community voting. Then, it’s time for the community to vote on what they want to see during the week! Sessions are selected based on a combination of community voting and input from the TCSW team. Find the full timeline [here](https://sessions.twincitiesstartupweek.com/#/faq).`,
          },
          {
            name: 'home1',
            content: `**2022 Session Submission Dates**

Session Submissions Open: April 6 to June 12, 2022

Session Voting Open: June 16 to June 29, 2022

Once signed in, use the submission form to submit your session proposal by June 12. Once submitted, the TCSW team will notify you via email whether or not your submission has been accepted into the TCSW Session Selector for public voting. You can edit your session submission until submissions close on June 12, 2022. The TCSW team will review each change and accept or reject the edited submission for public voting.

Encourage your network to vote for your session from June 16 to June 29. The TCSW team will use public voting to determine TCSW Main Stage Track sessions as well as the community sessions that will be featured on the TCSW calendar. Every year we receive more sessions that we have time slots on the schedule so make sure to bring your best!

Here to vote but not interested in hosting a session? Create an account and check back from June 16 - June 29 to help us select the TCSW calendar! 

**As a user you will have the ability to do the following:**

✓ Submit up to five sessions to Twin Cities Startup Week<br />
✓ Vote once for each session that has been approved`,
          },
          {
            name: 'home2',
            content: `Twin Cities Startup Week 2022 will be a hybrid festival from September 16-23!

Interested in hosting either an in-person or virtual session? If you are an individual, business, or community organization doing amazing things in the world of startups and innovation, we'd love to work with you!

There are a few steps to organizing a TCSW session:

1. Use the submission form to submit your session proposal by June 12. Once submitted, the TCSW team will notify you via email whether or not your submission has been accepted into the TCSW Session Selector for public voting. You can edit your session submission until submissions close on June 12 - please keep in mind what you submit via the form will be visible to the public during community voting.

2. Encourage your network to vote for your session from June 16 to June 29. The TCSW team will use public voting to determine TCSW Main Stage Track sessions as well as the community sessions that will be featured on the TCSW calendar.

3. Once public voting closes, the TCSW team will begin crafting the TCSW schedule. You will hear back on July 6 if your session has been accepted to the TCSW calendar. You will then have until July 27 to finalize your session details.

4. The full TCSW schedule will launch on August 3 - be ready to begin event promotion and build excitement for your event. The TCSW team will provide some resources and instructions for promoting and hosting a fantastic in-person or virtual event.

5. Host your event! We're planning on having about 150 events this year.

6. Provide feedback. It is important to us that event hosts, partners and attendees are given an opportunity to provide feedback. As an event host, we will send you a survey to gather feedback and capture any stories that came out of your events. We will also have the opportunity to collect attendee feedback from your session.`,
          },
          {
            name: 'home',
            content: `Twin Cities Startup Week is back from September 16 - 23, 2022!<br /> We will be hosting a hybrid festival this year with in-person, virtual, and hybrid events.

We are thrilled to welcome to the new Twin Cities Startup Week Session Selector! You can submit your session proposal for TCSW, vote on what you want to see at TCSW 2022, and add comments for the community to consider.`,
          },
          {
            name: 'search',
            content: `## TCSW Session Selector & Voting
Excited to help select the final event lineup for Twin Cities Startup Week 2022? Revisit this page when public voting opens on June 16, 2022!

Public voting will be open from June 16, 2022 to June 29, 2022.

Help make this the best TCSW yet!`,
          },
          {
            name: 'faq',
            content: `## TCSW Session Selector & Voting
#### 2022 Session Submission Dates
Session Submissions Open: April 6 to June 12, 2022

Session Voting Open: June 16 to June 29, 2022`,
          },
        ]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('faq');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
