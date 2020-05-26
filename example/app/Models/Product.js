'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

  static get incrementing () {
    return false
  }

  static get titleCases () {
    return ['name']
  }

  static get currencies () {
    return ['value']
  }

  static get formattedDates () {
    return [
      {
        field: 'availableAt',
        setter: true,
        getter: true
      }
    ]
  }

  static boot () {
    super.boot()

    /**
     * Add uuid generate hook
     */
    this.addHook('beforeCreate', '@provider:UuidHook.id')

    /**
     * Format currency trait - only getter
     */
    this.addTrait('@provider:TitleCaseAttributes')

    /**
     * Format currency trait - only getter
     */
    this.addTrait('@provider:FormatCurrencyAttributes', {symbol: 'R$ '})

    /**
     * Format currency trait - only getter
     */
    this.addTrait('@provider:FormatDateAttributes')


  }

}

module.exports = Product
