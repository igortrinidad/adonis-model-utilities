'use strict'

/**
 * adonis-model-utilities
 *
 * (c) Igor Trindade <igortrindade.me@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const GE = require('@adonisjs/generic-exceptions')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/**
 *
 * @class PasswordHash
 *
 * @param {Model} Model
 * @param {Object} options
 * @param {String} options.field
 */
class PasswordHash {
  register (Model, options) {

    if (!options || typeof (options) !== 'object') {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options object as 2nd parameter to IgorTrinidad/Uuid trait')
    }
    
    /**
     * Set defaul values if not defined in options
     */
    const passwordOptions = {
      field : "password",   // default password field column
    }
    Object.assign(passwordOptions, options)
    
    
    if(typeof (passwordOptions.field) !== 'string') {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass a password column parameter as string to IgorTrinidad/PasswordHash trait')
    }

    /**
     * Password field / column
     */
    const field = passwordOptions.field

    /**
     * Do bind hooks when fields are not defined
     */
    if (!field) {
      return
    }

    /**
     * inject or merge hidden attribute in model for password field
     */
    if(typeof(Model.hidden) == 'undefined') {

      const injectHidden = {
        get hidden() {
          return [field]
        }
      }
      Object.assign(Model, injectHidden)

    } else {

      const modelHidden = cloneDeep(Model.hidden)
      modelHidden.push(field)
      Object.defineProperty (Model, "hidden", {
        get: () => modelHidden,
      })

    }

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    Model.addHook('beforeSave', async (modelInstance) => {
      if (modelInstance.dirty.password) {
        modelInstance.password = await Hash.make(modelInstance.password)
      }
    })


  }
}

module.exports = PasswordHash
