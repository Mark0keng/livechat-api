'use strict';

const { faker } = require('@faker-js/faker');

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
    const offices = [...Array(10)].map((office) => (
      {
        name: faker.name.fullName(),
        slug: faker.company.name(),
        image: faker.image.business(480, 480),
        information: faker.company.catchPhrase(),
        phone: faker.phone.number('+62 8## #### ####'),
        email: faker.internet.email(),
        address: faker.address.streetAddress(true),
        lat: faker.address.latitude(),
        long: faker.address.longitude(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ))
    await queryInterface.bulkInsert('Consultant_Offices', offices, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Consultant_Offices', null, {});
  }
};
