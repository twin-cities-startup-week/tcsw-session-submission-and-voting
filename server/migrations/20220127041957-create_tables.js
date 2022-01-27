module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      DATE,
      INTEGER,
      DATEONLY,
      STRING,
      BOOLEAN,
      DOUBLE,
      TEXT,
    } = Sequelize;
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'area_of_interest',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          type: STRING,
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'date',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          date_of_event: STRING,
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'format',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          type: STRING,
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'industry',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: STRING,
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'location',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          type: STRING,
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'purpose',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: STRING,
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'user',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          username: {
            type: STRING,
            allowNull: false,
          },
          email: {
            type: STRING,
            allowNull: false,
          },
          password: TEXT,
          google_id: TEXT,
          first_name: {
            type: STRING,
            allowNull: false,
          },
          admin: {
            type: BOOLEAN,
            defaultValue: false,
          },
          middle_name: STRING,
          last_name: {
            type: STRING,
            allowNull: false,
          },
          photo_content_type: STRING,
          photo_file_size: INTEGER,
          photo_file_name: STRING(2048),
          photo_updated_at: {
            type: DATE,
          },
          phone: STRING,
          linkedin_account: STRING(2048),
          twitter_account: STRING(2048),
          github_account: STRING(2048),
          website_link: STRING(2048),
          reset_password_token: TEXT,
          reset_password_sent_at: {
            type: DATE,
          },
          remember_created_at: {
            type: DATE,
          },
          sign_in_count: INTEGER,
          current_sign_in_at: {
            type: DATE,
          },
          last_sign_in_at: {
            type: DATE,
          },
          current_sign_in_ip: STRING,
          last_sign_in_ip: STRING,
          created_at: {
            type: DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'session',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: STRING,
            allowNull: false,
          },
          email: STRING,
          phone: STRING,
          user_id: {
            type: INTEGER,
            references: {
              model: 'user',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
            allowNull: false,
          },
          industry: STRING,
          track: STRING,
          covid: BOOLEAN,
          speakers: STRING, /* Who would you like to speak at your event? */
          diversity: BOOLEAN,
          purpose: STRING,
          location: STRING,
          location_details: STRING,
          time: STRING,
          date: STRING,
          votes: INTEGER,
          host: STRING,
          description: TEXT,
          attendees: STRING,
          length: STRING, /* Approx how long will your event be? */
          format: STRING,
          area_of_interest: STRING, /* Does your event cater to one or more of the following? */
          media: STRING(2048), /* links to youtube? */
          image: TEXT, /* STRETCH, AWS S3 bucket. */
          success: STRING,
          excited: STRING,
          other_hosts: STRING,
          other_info: STRING,
          awaiting_approval: {
            type: BOOLEAN,
            defaultValue: false,
          },
          approved: {
            type: BOOLEAN,
            defaultValue: false,
          },
          created_at: {
            type: DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'track',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: STRING,
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'time',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          time_of_day: STRING,
        },
        {
          transaction,
        },
      );
      await queryInterface.createTable(
        'user_vote',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
            allowNull: false,
          },
          session_id: {
            type: INTEGER,
            references: {
              model: 'session',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
            allowNull: false,
          },
          created_at: {
            type: DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        {
          transaction,
        },
      );
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
      await queryInterface.dropTable('user_vote');
      await queryInterface.dropTable('area_of_interest');
      await queryInterface.dropTable('date');
      await queryInterface.dropTable('format');
      await queryInterface.dropTable('industry');
      await queryInterface.dropTable('location');
      await queryInterface.dropTable('purpose');
      await queryInterface.dropTable('session');
      await queryInterface.dropTable('track');
      await queryInterface.dropTable('time');
      await queryInterface.dropTable('user');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
