'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('format', [
        {
          type: 'Presentation',
        }, {
          type: 'Panel',
        }, {
          type: 'Workshop',
        }, {
          type: 'Roundtable',
        }, {
          type: 'Fireside Chat',
        }, {
          type: 'Showcase',
        }, {
          type: 'Demo',
        }, {
          type: 'Meetup',
        }, {
          type: 'Pitch',
        }, {
          type: 'Other',
        },
      ], {
        transaction,
      });
      await queryInterface.bulkInsert('purpose', [
        {
          name: 'To Enable: Help teach a skill or set of skills',
        }, {
          name: 'To Inspire: Inspire attendees through showcasing',
        }, {
          name: 'To Connect: Help bring like minded people together so they can connect and network',
        },
      ], {
        transaction,
      });
      await queryInterface.bulkInsert('location', [
        {
          type: 'Online via TCSW virtual venue',
        }, {
          type: 'In-person',
        }, {
          type: 'To be determined',
        },
      ], {
        transaction,
      });
      await queryInterface.bulkInsert('time', [
        {
          time_of_day: 'Morning 8am-11am',
        }, {
          time_of_day: 'Midday 11am-2pm',
        }, {
          time_of_day: 'Afternoon 2pm-5pm',
        }, {
          time_of_day: 'Evening 5pm-9pm',
        },
      ], {
        transaction,
      });
      await queryInterface.bulkInsert('area_of_interest', [
        {
          type: 'Celebrating and empowering female founders',
        }, {
          type: 'Supporting diversity and inclusion',
        }, {
          type: 'Supporting student and youth entrepreneurs',
        }, {
          type: 'Highlighting arts and culture',
        }, {
          type: 'Engaging investors',
        }, {
          type: 'Supporting impact ventures or social enterprises',
        }, {
          type: 'None of these specifically',
        }, {
          type: 'Other',
        },
      ], {
        transaction,
      });
      await queryInterface.bulkInsert('industry', [
        {
          name: 'General Entrepreneurship',
        }, {
          name: 'Technology',
        }, {
          name: 'Healthcare',
        }, {
          name: 'Retail',
        }, {
          name: 'Food and Ag',
        }, {
          name: 'Education & Training',
        }, {
          name: 'Sales',
        }, {
          name: 'Marketing & Advertising',
        }, {
          name: 'Investing',
        }, {
          name: 'Cryptocurrency',
        }, {
          name: 'Creative Economy',
        }, {
          name: 'Med Device/MedTech',
        }, {
          name: 'FinTech',
        }, {
          name: 'Hemp & Cannabis',
        }, {
          name: 'Smart Cities',
        }, {
          name: 'Social Impact',
        }, {
          name: 'Art & Culture',
        }, {
          name: 'Other',
        },
      ], {
        transaction,
      });
      await queryInterface.bulkInsert('track', [
        {
          name: 'Growth',
        }, {
          name: 'Culture',
        }, {
          name: 'Funding',
        }, {
          name: 'Product',
        }, {
          name: 'Spotlight',
        },
      ], {
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('format', null, {});
    await queryInterface.bulkDelete('purpose', null, {});
    await queryInterface.bulkDelete('location', null, {});
    await queryInterface.bulkDelete('time', null, {});
    await queryInterface.bulkDelete('area_of_interest', null, {});
    await queryInterface.bulkDelete('industry', null, {});
    await queryInterface.bulkDelete('track', null, {});
  }
};
