// Update with your config settings.

const environment = require("./src/environments/environment");

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: "mealtime_db",
      user: environment.db_user,
      password: environment.password
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
  onUpdateTrigger: table  => `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
  `
};
