module.exports = (Model) => {
  class User extends Model {

    static boot () {
      super.boot()

      /**
       * Uuid trait
       */
      this.addTrait('@provider:IgorTrinidad/Uuid', { field: 'id', version: 'v4'})
      
      /**
       * First Name
       */
      this.addTrait('@provider:IgorTrinidad/TitleCase', { fields: ['firstName', 'lastName'] })

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