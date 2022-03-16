export default () => ({
  database: {
    host: 'localhost',
    port: 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DEV_DATABASE_PASSWORD || '',
    database: process.env.DEV_DATABASE_NAME || '',
  },
});
