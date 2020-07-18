// Update with your config settings.
const localConnection = {
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS
}

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || localConnection,
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`
  },
  pool: {
    afterCreate:  (conn, done) => {
      console.log('[DB] Connected...')
      conn.query('SET timezone="UTC";', function (err) {
        if (err) {
          console.log('[DB] Error...');
        } 
        return done(err, conn);
      });
    }
  },
  onUpdateTrigger: table  => `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
  `
};
