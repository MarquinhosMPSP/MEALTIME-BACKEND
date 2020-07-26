// Update with your config settings.
const localConnection = {
  database: 'mealtime_db',
  user: 'daniel',
  password: '',
  timezone: 'UTC',
  dateStrings: true
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
