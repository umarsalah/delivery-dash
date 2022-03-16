export default () => ({
  database: {
    host: 'localhost',
    port: 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.PROD_DATABASE_PASSWORD || '',
    database: process.env.PROD_DATABASE_NAME || '',
  },
});
