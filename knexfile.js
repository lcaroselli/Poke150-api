// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/poke150',
    migrations: {
     directory: './db/migrations'
   },
   seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/byobtest',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  },

  production: {
     client: 'pg',
     connection:  process.env.DATABASE_URL + `?ssl=true`,
     migrations: {
       directory: './db/migrations'
     },
     seeds: {
       directory: './db/seeds/dev',
     },
     useNullAsDefault: true
   }
};
