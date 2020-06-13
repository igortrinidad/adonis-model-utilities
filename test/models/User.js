module.exports = (Model) => {
  class User extends Model {

    static get fullNameAttribute () {
      return {
        fullName: 'fullName',
        firstName: 'firstName',
        lastName: 'lastName'
      }
    }

    static get titleCases () {
      return ['name']
    }

    static boot () {
      super.boot()

      /**
       * Uuid trait
       */
      this.addTrait('@provider:IgorTrinidad/Uuid', { field: 'id'})

      /**
       * Format currency trait
       */
      this.addTrait('@provider:IgorTrinidad/FormatCurrency')

      /**
       * FullName trait
       */
      this.addTrait('@provider:IgorTrinidad/FullName', {
        fullName: 'fullName',
        firstName: 'firstName',
        lastName: 'lastName'
      })

    }

  }
  User._bootIfNotBooted()

  return User
}