'use strict';

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `ALTER TABLE Users DROP CONSTRAINT email;`,
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface, Sequelize) => {
    return Promise.all([]);
  },
};
