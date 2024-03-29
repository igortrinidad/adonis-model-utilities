module.exports = (Model) => {

  class Product extends Model {

    static boot () {
      super.boot()

      /**
       * Uuid trait
       */
      this.addTrait('@provider:IgorTrinidad/Uuid', { field: 'id'})

      /**
       * Title case
       */
      this.addTrait('@provider:IgorTrinidad/TitleCase', { fields: ['title'] })

      /**
       * Format currency trait
       */
      this.addTrait('@provider:IgorTrinidad/FormatCurrency', {fields: ['value'], prefix: 'formatted', symbol: 'US$ '})

      /**
       * Format date trait
       */
      this.addTrait('@provider:IgorTrinidad/FormatDate', {fields: ['availableAt'], unformatted: 'YYYY-MM-DD', formatted: 'DD/MM/YYYY', setter: false})

      /**
       * Parse Number
       */
      this.addTrait('@provider:IgorTrinidad/ParseNumber', { fields: ['value'] })

    }

  }
  Product._bootIfNotBooted()

  return Product
}