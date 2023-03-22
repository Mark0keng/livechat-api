'use strict';

const {faker} = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
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
    const specialist = ["Konsultan Pajak", "Konsultan Akuntansi", "Konsultan Investasi", "Konsultan Financial Auditing"];
    const random = Math.floor(Math.random() * specialist.length)

    const informations = [...Array(11)].map((information, index) => (
      {
        user_id: index + 1,
        office_id: Math.floor(Math.random() * 10) + 1,
        slug: faker.lorem.slug(),
        photo: faker.image.avatar(),
        address: faker.address.streetAddress(true),
        price: faker.phone.number('###000'),
        specialist: specialist[random],
        work_experience: Math.floor(Math.random() * 5),
        biography: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ))
    await queryInterface.bulkInsert('Consultant_Informations', informations, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Consultant_Informations', null, {});
  }
};
