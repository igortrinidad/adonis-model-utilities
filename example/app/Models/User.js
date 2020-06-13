'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {

  static get fullNameAttribute () {
    return {
      fullName: 'fullName',
      firstName: 'firstName',
      lastName: 'lastName'
    }
  }

  static get titleCases () {
    return ['name']
  }

  static boot () {
    super.boot()

    /**
     * Format currency trait - only getter
     */
    this.addTrait('@provider:TitleCaseAttributes')

    this.addTrait('@provider:IgorTrindade/FullName', {
      fullName: 'fullName',
      firstName: 'firstName',
      lastName: 'lastName'
    })

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
