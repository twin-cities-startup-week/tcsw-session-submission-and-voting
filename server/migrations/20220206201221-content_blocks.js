module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      INTEGER,
      STRING,
      TEXT,
      DATE,
    } = Sequelize.DataTypes
    const transaction = await queryInterface.sequelize.transaction();
    try {
      
      await queryInterface.createTable(
        'content_block',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: STRING,
          content: TEXT,
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
        'faq',
        {
          id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          order: INTEGER,
          question: STRING,
          answer: TEXT,
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
      console.log(err);
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    try {
      await queryInterface.dropTable('content_block');
      await queryInterface.dropTable('faq');
    } catch (err) {
      throw err;
    }
  },
};
