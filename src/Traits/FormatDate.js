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
const formatDate = require('../Util/FormatDate')
const GE = require('@adonisjs/generic-exceptions')

class FormatDate {

  register (Model, options = {}) {

    if (!options || typeof (options) !== 'object') {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options [object] as 2nd parameter to IgorTrindade/FormatDate trait')
    }

    if (!options.fields) {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options.fields array of string parameter to IgorTrindade/FormatDate trait')
    }

    options.fields.map((field) => {
      if(typeof(field) !== 'string') {
        throw GE.InvalidArgumentException.invalidParameter('Make sure to pass fields an array of string to fields parameter on IgorTrindade/FormatDate trait')
      }
    })

    const formatDateOptions = {
      unformatted: 'YYYY-MM-DD',
      formatted: 'DD/MM/YYYY',
      getter: true,
      setter: true
    }

    Object.assign(formatDateOptions, options)

    this.addSetters(Model, formatDateOptions)
  }

  /**
   * Add getters to model for each casted attribute
   *
   * @param Model
   * @param accountingOptions
   */
  addSetters (Model, formatDateOptions) {

    formatDateOptions.fields.map((field) => {

      if(field === 'created_at' || field === 'updated_at') return

      if(formatDateOptions.setter) {
        const setter = util.getSetterName(field)
        if (typeof Model.prototype[setter] !== 'function') {
          Model.prototype[setter] = this.setter(formatDateOptions)
        }
      }

      if(formatDateOptions.getter) {
        const getter = util.getGetterName(field)
        if (typeof Model.prototype[getter] !== 'function') {
          Model.prototype[getter] = this.getter(formatDateOptions)
        }
      }

    })

  }

  /**
   * Setter method
   * @returns {string}
   */
  getter (formatOptions) {
    return (value) => {
      return formatDate(value, formatOptions.unformatted, formatOptions.formatted)
    }
  }


  /**
   * Setter method
   * @returns {string}
   */
  setter (formatOptions) {
    return (value) => {
      return formatDate(value, formatOptions.formatted, formatOptions.unformatted)
    }
  }
}

module.exports = FormatDate
