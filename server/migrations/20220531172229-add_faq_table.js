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
