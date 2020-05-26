'use strict'

const {ServiceProvider} = require('@adonisjs/fold')

class ModelUtilitiesProvider extends ServiceProvider {
  register () {

    // Trait setter title case attributes
    this.app.singleton('Adonis/Traits/TitleCaseAttributes', () => {
      const TitleCaseAttributes = require('../src/Traits/TitleCaseAttributes')
      return new TitleCaseAttributes()
    })
    this.app.alias('Adonis/Traits/TitleCaseAttributes', 'TitleCaseAttributes')

    // Trait getter format currencies attributes
    this.app.singleton('Adonis/Traits/FormatCurrencyAttributes', () => {
      const FormatCurrencyAttributes = require('../src/Traits/FormatCurrencyAttributes')
      return new FormatCurrencyAttributes()
    })
    this.app.alias('Adonis/Traits/FormatCurrencyAttributes', 'FormatCurrencyAttributes')

    // Trait getter and setter format dates attributes
    this.app.singleton('Adonis/Traits/FormatDateAttributes', () => {
      const FormatDateAttributes = require('../src/Traits/FormatDateAttributes')
      return new FormatDateAttributes()
    })
    this.app.alias('Adonis/Traits/FormatDateAttributes', 'FormatDateAttributes')

    // Uuid setter hook
    this.app.singleton('Adonis/Hooks/UuidHook', () => {
      const Uuid = require('../src/Hooks/UuidHook')
      return Uuid
    })
    this.app.alias('Adonis/Hooks/UuidHook', 'UuidHook')

  }
}

module.exports = ModelUtilitiesProvider
