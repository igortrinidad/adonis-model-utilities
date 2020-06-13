'use strict'

/**
 * adonis-lucid-slug
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const GE = require('@adonisjs/generic-exceptions')
const { v4: uuidv4 } = require('uuid')

/**
 * The slugify class is added a trait to any Lucid model. It will
 * register required hooks to auto generate unique slugs.
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
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options object as 2nd parameter to IgorTrindade/Uuid trait')
    }

    /**
     * Uuid
     */
    const field = options.field

    /**
     * Do bind hooks when fields are not defined
     */
    if (!field) {
      return
    }

    Model.addHook('beforeCreate', async (modelInstance) => {

      modelInstance.$attributes[field] = uuidv4()

    })


  }
}

module.exports = Uuid
