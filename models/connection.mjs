import Sequelize from 'sequelize';

import dbConfig from '../config/config.json';

const connection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export default connection;
