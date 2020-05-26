'use strict'

const util = require('@adonisjs/lucid/lib/util')
const formatCurrency = require('../Util/FormatCurrency')
const titleCaseString = require('../Util/TitleCaseString')

class FormatCurrencyAttributes {

  register (Model, customOptions) {

    const accountingOptions = {
      symbol : "US$ ",   // default currency symbol is '$'
      format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
      decimal : ",",  // decimal point separator
      thousand: ".",  // thousands separator
      precision : 2   // decimal places
    }

    Object.assign(accountingOptions, customOptions)

    this.addGetters(Model, accountingOptions)
  }

  /**
   * Add getters to model for each casted attribute
   *
   * @param Model
   * @param accountingOptions
   */
  addGetters (Model, accountingOptions) {

  
    if(typeof(Model.currencies) === 'object') {

      Model.currencies.map((attr) => {

        if(typeof(attr) == 'string') {
          const getter = util.getGetterName(attr).replace('get', 'getFormatted')
          const computedGetter = `formatted${titleCaseString(attr)}`
          if (typeof Model.prototype[getter] !== 'function') {
            Model.prototype[getter] = this.getter(attr, accountingOptions)
          }

          if(typeof(Model.computed) == 'undefined') {

            const injectComputedInModel = {
              get computed() {
                return [computedGetter]
              }
            }

            Object.assign(Model, injectComputedInModel)

          } else {

            const modelComputed = JSON.parse(JSON.stringify(Model.computed))

            modelComputed.push(computedGetter)

            Object.defineProperty (Model, "computed", {
              get: () => modelComputed,
            })

          }

        }
      })

    }

  }

  /**
   * Setter method
   * @returns {string}
   */
  getter (attr, accountingOptions) {
    return (model) => {
      return formatCurrency(model[attr], accountingOptions)
    }
  }
}

module.exports = FormatCurrencyAttributes
