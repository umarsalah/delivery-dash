'use strict';

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
    ALTER TABLE Users
    ADD not_archived VARCHAR(255) AS (CONCAT(email, '|' , IFNULL(deleted_at, ''))) UNIQUE;
      `,
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      ` ALTER TABLE Users DROP not_archived;`,
    );
  },
};
