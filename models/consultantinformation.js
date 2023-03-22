'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConsultantInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasOne(models.ConsultantInformation, {foreignKey: 'user_id'})
      models.ConsultantInformation.belongsTo(models.User, {foreignKey: 'user_id'})

      models.ConsultantOffice.hasMany(models.ConsultantOffice, {foreignKey: 'office_id'})
      models.ConsultantInformation.belongsTo(models.ConsultantOffice, {foreignKey: 'office_id'})
    }
  }
  ConsultantInformation.init({
    user_id: DataTypes.INTEGER,
    office_id: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    photo: DataTypes.STRING,
    price: DataTypes.STRING,
    specialist: DataTypes.STRING,
    work_experience: DataTypes.STRING,
    biography: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'ConsultantInformation',
    tableName: 'consultant_informations',
  });
  return ConsultantInformation;
};