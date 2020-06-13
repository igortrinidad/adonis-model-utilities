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


/**
 *
 * @class Uuid
 *
 * @param {Model} Model
 * @param {Object} options
 * @param {String} options.field
 */
class Uuid {
  register (Model, options) {

    if (!options || typeof (options) !== 'object') {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options object as 2nd parameter to IgorTrinidad/Uuid trait')
    }
    
    /**
     * Set default values if not defined in options
     */
    const uuidOptions = {
      field : "id",   // default field / column
      version: 'v4', // default version
      name: 'yourdomain.com', // default name used in v3 and v5
      namespace: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' // default namespace used in v3 and v5
    }

    Object.assign(uuidOptions, options)
    
    
    if(typeof (uuidOptions.version) !== 'string') {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass a version [string] to 2nd paramenter in IgorTrinidad/Uuid trait')
    }

    if(!['v1', 'v3', 'v4', 'v5'].includes(uuidOptions.version)) {
      throw GE.InvalidArgumentException.invalidParameter("Make sure to pass a VALID version [string] ['v1', 'v3', 'v4', 'v5'] in IgorTrinidad/Uuid trait")
    }

    /**
     * Uuid field / column
     */
    const field = uuidOptions.field
    const version = uuidOptions.version
    const name = uuidOptions.name
    const namespace = uuidOptions.namespace

    /**
     * Do bind hooks when fields are not defined
     */
    if (!field) {
      return
    }

    /**
     * Inject incrementing false in model to Uuid works
     */

    if(typeof(Model.incrementing) == 'undefined' || Model.incrementing === true) {

      Object.defineProperty (Model, "incrementing", {
        get: () => {
          return false
        },
      })


    }

    Model.addHook('beforeCreate', async (modelInstance) => {

      if(version == 'v1' || version == 'v4') {
        modelInstance.$attributes[field] = await require('uuid')[version]()
      } else {
        modelInstance.$attributes[field] = await require('uuid')[version](name, namespace)
      }

    })


  }
}

module.exports = Uuid
