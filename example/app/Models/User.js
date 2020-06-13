'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {

  static boot () {
    super.boot()

    /**
     * Uuid trait
     */
    this.addTrait('@provider:IgorTrinidad/Uuid', { field: 'id', version: 'v4'})

    /**
     * First Name
     */
    this.addTrait('@provider:IgorTrinidad/TitleCase', { fields: ['firstName', 'lastName'] })

    /**
     * FullName trait
     */
    this.addTrait('@provider:IgorTrinidad/FullName', {
      fullName: 'fullName',
      firstName: 'firstName',
      lastName: 'lastName'
    })

    /**
     * PasswordHash trait
     */
    this.addTrait('@provider:IgorTrinidad/PasswordHash', {field: 'password'})

  }

}

module.exports = User
