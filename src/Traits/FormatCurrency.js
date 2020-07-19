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
const cloneDeep = require('lodash/cloneDeep')
const formatCurrency = require('../Util/FormatCurrency')
const GE = require('@adonisjs/generic-exceptions')
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')

class FormatCurrency {

  register (Model, options) {

    if (!options || typeof (options) !== 'object') {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options [object] as 2nd parameter to IgorTrindade/FormatCurrency trait')
    }

    if (!options.fields) {
      throw GE.InvalidArgumentException.invalidParameter('Make sure to pass options.fields array of string parameter to IgorTrindade/FormatCurrency trait')
    }

    options.fields.map((field) => {
      if(typeof(field) !== 'string') {
        throw GE.InvalidArgumentException.invalidParameter('Make sure to pass fields an array of string to fields parameter on IgorTrindade/FormatCurrency trait')
      }
    })

    const accountingOptions = {
      prefix: "formatted" // default prefix for the virtual value
    }

    Object.assign(accountingOptions, options)

    this.addGetters(Model, accountingOptions)

  }

  /**
   * Add getters to model for each casted attribute
   *
   * @param Model
   * @param options
   */
  addGetters (Model, options) {

    options.fields.map((attr) => {

      const getter = util.getGetterName(attr).replace('get', 'getFormatted')
      const computedGetter = `${options.prefix}${upperFirst(camelCase(attr))}`

      if (typeof Model.prototype[getter] !== 'function') {
        Model.prototype[getter] = this.getter(attr, options)
      }

      if(typeof(Model.computed) == 'undefined') {

        const injectComputedInModel = {
          get computed() {
            return [computedGetter]
          }
        }
        Object.assign(Model, injectComputedInModel)

      } else {

        const modelComputed = cloneDeep(Model.computed)
        modelComputed.push(computedGetter)
        Object.defineProperty (Model, "computed", {
          get: () => modelComputed,
        })

      }

    })

  }

  /**
   * Setter method
   * @returns {string}
   */
  getter (attr, options) {
    return (model) => {
      return formatCurrency(model[attr], options)
    }
  }
}

module.exports = FormatCurrency
