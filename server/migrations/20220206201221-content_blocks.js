module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      INTEGER,
      STRING,
      TEXT,
    } = Sequelize.DataTypes
    try {
      const transaction = await queryInterface.sequelize.transaction();
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
    try {
      await queryInterface.dropTable('content_block');
    } catch (err) {
      throw err;
    }
  },
};
