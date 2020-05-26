'use strict'

const util = require('@adonisjs/lucid/lib/util')
const formatDate = require('../Util/FormatDate')

class FormatDateAttributes {

  register (Model, customOptions = {}) {

    const formatOptions = {
      unformatted: 'YYYY-MM-DD',
      formatted: 'DD/MM/YYYY'
    }

    Object.assign(formatOptions, customOptions)

    this.addSetters(Model, formatOptions)
  }

  /**
   * Add getters to model for each casted attribute
   *
   * @param Model
   * @param accountingOptions
   */
  addSetters (Model, formatOptions) {

    if(typeof(Model.formattedDates) === 'object') {

      Model.formattedDates.map((attr) => {

        if(attr.field === 'created_at' || attr.field === 'updated_at') return

        if(attr.setter == 'undefined' || attr.setter) {
          const setter = util.getSetterName(attr.field)
          if (typeof Model.prototype[setter] !== 'function') {
            Model.prototype[setter] = this.setter(formatOptions)
          }
        }

        if(attr.getter == 'undefined' || attr.getter) {
          const getter = util.getGetterName(attr.field)
          if (typeof Model.prototype[getter] !== 'function') {
            Model.prototype[getter] = this.getter(formatOptions)
          }
        }

      })

    }

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

module.exports = FormatDateAttributes
