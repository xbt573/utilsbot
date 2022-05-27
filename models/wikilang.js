'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wikilang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wikilang.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    chatId: DataTypes.BIGINT,
    lang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Wikilang',
  });
  return Wikilang;
};