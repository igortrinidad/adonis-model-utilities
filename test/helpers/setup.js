'use strict'

/**
 * adonis-lucid-slug
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const path = require('path')
const fs = require('fs')
const { registrar, ioc } = require('@adonisjs/fold')
const { setupResolver, Config } = require('@adonisjs/sink')

module.exports = {
  up: function () {
    setupResolver()
    ioc.bind('Adonis/Src/Config', () => {
      const config = new Config()

      config.set('database', {
        connection: process.env.DB,
        mysql: {
          client: 'mysql',
          connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'lucid-slug'
          }
        },
        sqlite: {
          client: 'sqlite3',
          connection: {
            filename: path.join(__dirname, 'db.sqlite3')
          }
        }
      })

      return config
    })

    return registrar
      .providers([
        '@adonisjs/lucid/providers/LucidProvider'
      ])
      .registerAndBoot()
      .then(() => {
        return ioc.use('Database').schema.createTable('users', (table) => {
          table.uuid('id').index().unique().notNullable()
          table.string('firstName', 80).notNullable()
          table.string('lastName', 80).notNullable()
          table.string('fullName', 80).notNullable()
          table.string('username', 80).notNullable().unique()
          table.string('email', 254).notNullable().unique()
          table.timestamps()
        })
        .createTable('products', (table) => {
          table.uuid('id').index().unique().notNullable()
          table.string('name').notNullable()
          table.decimal('value').notNullable()
          table.date('availableAt').notNullable()
          table.timestamps()
        })
      })
  },

  down () {
    return ioc
      .use('Database')
      .schema
      .dropTable('users')
      .dropTable('products')
      .then(() => {
        if (process.env.DB === 'sqlite') {
          fs.unlinkSync(path.join(__dirname, 'db.sqlite3'))
        }
      })
  }
}