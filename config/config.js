require('dotenv').config();
module.exports = {
  'development': {
    'username': 'root',
    'password': process.env.DB_PASSWORD,
    'database': 'dinning_playlist_DB',
    'host': '127.0.0.1',
    'port': 3306,
    'dialect': 'mysql',
  },
  'test': {
    'username': 'root',
    'password': process.env.DB_PASSWORD,
    'database': 'dinning_playlist_DB',
    'host': '127.0.0.1',
    'port': 3306,
    'dialect': 'mysql',
  },
  'production': {
    'username': 'root',
    'password': process.env.DB_PASSWORD,
    'database': 'dinning_playlist_DB',
    'host': '127.0.0.1',
    'port': 3306,
    'dialect': 'mysql',
  },
};
