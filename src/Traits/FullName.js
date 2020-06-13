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
const createFullName = require('../Util/CreateFullName')

/**
 * The slugify class is added a trait to any Lucid model. It will
 * register required hooks to auto generate unique slugs.
 *
 * @class FullName
 *
 * @param {Model} Model
 * @param {Object} options
 * @param {String} options.fullName
 * @param {String} options.firstName
 * @param {String} options.lastName
 */
class FullName {

  register (Model, options) {
    if (!options || typeof (options) !== 'object') {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options object as 2nd parameter to IgorTrindade/FullName trait')
    }

    /**
     * fullName, firstName, lastName
     */
    const fullName = options.fullName
    const firstName = options.firstName
    const lastName = options.lastName

    /**
     * Do bind hooks when fields are not defined
     */
    if (!fullName) {
      return
    }

    /**
     * Add hook
     */
    Model.addHook('beforeSave', async (modelInstance) => {

      modelInstance.$attributes[fullName] = createFullName(modelInstance.$attributes[firstName], modelInstance.$attributes[lastName])

    })

  }
}

module.exports = FullName
