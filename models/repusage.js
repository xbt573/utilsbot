'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RepUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    RepUsage.init({
        chatId: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },

        userId: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },

        time: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'RepUsage',
    });
    RepUsage.removeAttribute('id');
    return RepUsage;
};