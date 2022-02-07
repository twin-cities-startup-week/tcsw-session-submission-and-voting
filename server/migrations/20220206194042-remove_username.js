module.exports = {
  up: async (queryInterface) => {
    try {
      await queryInterface.removeColumn('user', 'username');
    } catch (err) {
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('user', 'username', { type: Sequelize.DataTypes.STRING, allowNull: false });
    } catch (err) {
      throw err;
    }
  },
};
