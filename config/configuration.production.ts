// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default () => ({
  database: {
    host: 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.PROD_DATABASE_PASSWORD || '',
    database: process.env.PROD_DATABASE_NAME || '',
  },
});
