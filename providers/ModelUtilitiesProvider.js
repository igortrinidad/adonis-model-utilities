'use strict'

const {ServiceProvider} = require('@adonisjs/fold')

class ModelUtilitiesProvider extends ServiceProvider {

  register () {

    // Uuid trait
    this.app.singleton('Adonis/Traits/IgorTrinidad/Uuid', () => {
      const Uuid = require('../src/Traits/Uuid')
      return new Uuid()
    })
    this.app.alias('Adonis/Traits/IgorTrinidad/Uuid', 'IgorTrinidad/Uuid')

    //PasswordHash
    this.app.singleton('Adonis/Addons/IgorTrinidadPasswordHash', () => {
      const PasswordHash = require('../src/Traits/PasswordHash')
      return new PasswordHash()
    })
    this.app.alias('Adonis/Addons/IgorTrinidadPasswordHash', 'IgorTrinidad/PasswordHash')

    // Trait Title Case attributes
    this.app.singleton('Adonis/Traits/IgorTrinidad/TitleCase', () => {
      const TitleCase = require('../src/Traits/TitleCase')
      return new TitleCase()
    })
    this.app.alias('Adonis/Traits/IgorTrinidad/TitleCase', 'IgorTrinidad/TitleCase')

    // Trait Format Currency
    this.app.singleton('Adonis/Traits/IgorTrinidad/FormatCurrency', () => {
      const FormatCurrency = require('../src/Traits/FormatCurrency')
      return new FormatCurrency()
    })
    this.app.alias('Adonis/Traits/IgorTrinidad/FormatCurrency', 'IgorTrinidad/FormatCurrency')

    // Format Date Trait
    this.app.singleton('Adonis/Traits/IgorTrinidad/FormatDate', () => {
      const FormatDate = require('../src/Traits/FormatDate')
      return new FormatDate()
    })
    this.app.alias('Adonis/Traits/IgorTrinidad/FormatDate', 'IgorTrinidad/FormatDate')

    // Parse Number Trait
    this.app.singleton('Adonis/Traits/IgorTrinidad/ParseNumber', () => {
      const ParseNumber = require('../src/Traits/ParseNumber')
      return new ParseNumber()
    })
    this.app.alias('Adonis/Traits/IgorTrinidad/ParseNumber', 'IgorTrinidad/ParseNumber')

    //FullName
    this.app.singleton('Adonis/Addons/IgorTrinidadFullName', () => {
      const FullName = require('../src/Traits/FullName')
      return new FullName()
    })
    this.app.alias('Adonis/Addons/IgorTrinidadFullName', 'IgorTrinidad/FullName')

  }
}

module.exports = ModelUtilitiesProvider
