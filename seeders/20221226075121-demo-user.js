'use strict';

const bcrypt = require('bcrypt')
const {faker} = require('@faker-js/faker');

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
    const consultants = [...Array(10)].map((user) => (
      {
        uuid: faker.datatype.uuid(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        refresh_token: null,
        role: 'consultant',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ))
    
    await queryInterface.bulkInsert('Users', consultants, {});

    await queryInterface.bulkInsert('Users', [{
        uuid: faker.datatype.uuid(),
        name: 'consultant1',
        email: 'consultant@gmail.com',
        password: await bcrypt.hash('123456', 10),
        refresh_token: null,
        role: 'consultant',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        uuid: faker.datatype.uuid(),
        name: 'superadmin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('123456', 10),
        refresh_token: null,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        uuid: faker.datatype.uuid(),
        name: 'user1',
        email: 'user@gmail.com',
        password: await bcrypt.hash('123456', 10),
        refresh_token: null,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },
  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
