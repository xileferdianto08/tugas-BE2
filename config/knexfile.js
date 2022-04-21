module.exports = {
  development: {
      client: 'mysql',
      connection: {
      host: '127.0.0.1',
      user: 'root', // replace with your mysql username
      password: '', // replace with your mysql password
      database: 'be-tutorial2'
    },
    debug: true,
    pool: { 
      min: 2, 
      max: 5 
    }
  }
};