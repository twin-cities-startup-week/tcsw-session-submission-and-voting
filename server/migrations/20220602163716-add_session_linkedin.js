module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('session', 'linkedin', { type: Sequelize.DataTypes.STRING(2048), allowNull: true });
    } catch (err) {
      throw err;
    }
  },

  down: async (queryInterface) => {
    try {
      await queryInterface.removeColumn('session', 'linkedin');
    } catch (err) {
      throw err;
    }
  },
};
