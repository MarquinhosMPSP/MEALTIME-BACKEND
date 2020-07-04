// Update with your config settings.

const environment = require("./src/environments/environment");

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || environment.database,
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`
  },
  onUpdateTrigger: table  => `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
  `
};
