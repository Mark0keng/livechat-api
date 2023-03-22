'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.User.hasMany(models.ChatRoom, {foreignKey: 'user_id'})
      // models.ChatRoom.belongsTo(models.User, {foreignKey: 'user_id'})

      // models.User.hasMany(models.ChatRoom, {foreignKey: 'consultant_id'})
      // models.ChatRoom.belongsTo(models.User, {foreignKey: 'consultant_id'})
      models.ChatRoom.belongsTo(models.User, {foreignKey: 'user_id', as: 'Client'});
      models.ChatRoom.belongsTo(models.User, {foreignKey: 'consultant_id', as: 'Consultant'});
    }
  }
  ChatRoom.init({
    room: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    consultant_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};