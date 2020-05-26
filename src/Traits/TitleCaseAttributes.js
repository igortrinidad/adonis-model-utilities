'use strict'

const util = require('@adonisjs/lucid/lib/util')
const titleCaseString = require('../Util/TitleCaseString')

class TitleCaseAttributes {
  register (Model) {
    this.addSetters(Model)
  }

  /**
   * Add getters and setters to model for each casted attribute
   *
   * @param Model
   */
  addSetters (Model) {

    if(typeof(Model.titleCases) === 'object') {
      Model.titleCases.map((attr) => {

        if(typeof(attr) == 'string') {
          const setter = util.getSetterName(attr)
          if (typeof Model.prototype[setter] !== 'function') {
            Model.prototype[setter] = this.setter(attr)
          }
        }
      })
    }

  }

  /**
   * Setter method
   * @returns {string}
   */
  setter (attr) {
    return (value) => {
      return value.split(' ').map((str) => titleCaseString(str)).join(' ')
    }
  }
}

module.exports = TitleCaseAttributes
