module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('session', 'ip_address', { type: Sequelize.DataTypes.STRING, allowNull: true });
      await queryInterface.addColumn('session', 'status', { type: Sequelize.DataTypes.STRING, defaultValue: 'pending' });
    } catch (err) {
      throw err;
    }
  },

  down: async (queryInterface) => {
    try {
      await queryInterface.removeColumn('session', 'ip_address');
      await queryInterface.removeColumn('session', 'status');
    } catch (err) {
      throw err;
    }
  },
};
