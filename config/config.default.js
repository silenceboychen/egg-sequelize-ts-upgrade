'use strict';

exports.sequelize = {
  dialect: 'mysql',
  database: '',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',

  // support customize your own Squelize
  // optional
  // Sequelize: require('sequelize-typescript').Sequelize,

  // todo:support multi datasources by config.sequelize.datasources
  // datasources: [
  //   {
  //     delegate: 'model', // lood to `app[delegate]`
  //     baseDir: 'model', // models in `app/${model}`
  //     // other sequelize configurations
  //   },
  //   {
  //     delegate: 'sequelize', // lood to `app[delegate]`
  //     baseDir: 'sequelize', // models in `app/${model}`
  //     // other sequelize configurations
  //   },
  // ],
};