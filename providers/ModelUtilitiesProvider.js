'use strict'

const {ServiceProvider} = require('@adonisjs/fold')

class ModelUtilitiesProvider extends ServiceProvider {

  register () {

    // Trait setter title case attributes
    this.app.singleton('Adonis/Traits/IgorTrinidad/TitleCase', () => {
      const TitleCase = require('../src/Traits/TitleCase')
      return new TitleCase()
    })
    this.app.alias('Adonis/Traits/IgorTrinidad/TitleCase', 'IgorTrinidad/TitleCase')

    // Trait getter format currencies attributes
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

    // Uuid trait
    this.app.singleton('Adonis/Traits/IgorTrinidad/Uuid', () => {
      const Uuid = require('../src/Traits/Uuid')
      return new Uuid()
    })
    this.app.alias('Adonis/Traits/IgorTrinidad/Uuid', 'IgorTrinidad/Uuid')

    //FullName
    this.app.singleton('Adonis/Addons/IgorTrinidadFullName', () => {
      const FullName = require('../src/Traits/FullName')
      return new FullName()
    })
    this.app.alias('Adonis/Addons/IgorTrinidadFullName', 'IgorTrinidad/FullName')

    //PasswordHash
    this.app.singleton('Adonis/Addons/IgorTrinidadPasswordHash', () => {
      const PasswordHash = require('../src/Traits/PasswordHash')
      return new PasswordHash()
    })
    this.app.alias('Adonis/Addons/IgorTrinidadPasswordHash', 'IgorTrinidad/PasswordHash')

  }
}

module.exports = ModelUtilitiesProvider
