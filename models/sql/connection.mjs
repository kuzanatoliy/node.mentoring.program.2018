import Sequelize from 'sequelize';

import dbConfig from '../../configs/database';

const connection = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export default connection;
