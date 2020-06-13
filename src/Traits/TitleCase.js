'use strict'

/**
 * adonis-model-utilities
 *
 * (c) Igor Trindade <igortrindade.me@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const util = require('@adonisjs/lucid/lib/util')
const GE = require('@adonisjs/generic-exceptions')
const titleCaseString = require('../Util/TitleCaseString')


/**
 *
 * @class Title Case
 *
 * @param {Model} Model
 * @param {Object} options
 * @param {Array} options.fields
 * @param {String} field
 */
class TitleCase {
  register (Model, options) {

    if (!options || typeof (options) !== 'object') {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options [object] as 2nd parameter to IgorTrindade/TitleCase trait')
    }
    
    options.fields.map((field) => {
      if(typeof(field) !== 'string') {
        throw GE.InvalidArgumentException.invalidParameter('Make sure to pass fields as string to 2nd parameter on IgorTrindade/TitleCase trait')
      }
    })

    /**
     * Fields
     */
    const fields = options.fields

    this.addSetters(Model, fields)

  }

  /**
   * Add setters to model for each attribute
   *
   * @param Model
   */
  addSetters (Model, fields) {

    fields.map((attr) => {

      const setter = util.getSetterName(attr)
      if (typeof Model.prototype[setter] !== 'function') {
        Model.prototype[setter] = this.setter(attr)
      }
      
    })
    

  }

  /**
   * Setter method
   * @returns {string}
   */
  setter (attr) {
    return (value) => {
      return titleCaseString(value)
    }
  }
}

module.exports = TitleCase
