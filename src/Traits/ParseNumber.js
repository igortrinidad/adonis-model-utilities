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

class ParseNumber {

  register (Model, options) {

    if (!options || typeof (options) !== 'object') {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options [object] as 2nd parameter to IgorTrindade/ParseNumber trait')
    }
    
    options.fields.map((field) => {
      if(typeof(field) !== 'string') {
        throw GE.InvalidArgumentException.invalidParameter('Make sure to pass fields as string to 2nd parameter on IgorTrindade/ParseNumber trait')
      }
    })

    /**
     * Fields
     */
    const fields = options.fields

    this.addGetters(Model, fields)
  }

  /**
   * Add getters to model for each casted attribute
   *
   * @param Model
   * @param accountingOptions
   */
  addGetters (Model, fields) {

    fields.map((field) => {

      const getter = util.getGetterName(field)
      if (typeof Model.prototype[getter] !== 'function') {
        Model.prototype[getter] = this.getter()
      }

    })

  }

  /**
   * Getter method
   * @returns {float}
   */
  getter () {
    return (value) => {
      return value === null ? null : parseFloat(value)
    }
  }

}

module.exports = ParseNumber
