# adonis-model-utilities
A set of tools to use within your AdonisJS models

## 1. Install

Install npm module:

```bash
$ adonis install adonis-model-utilities
```

## 2. Register provider

Once you have installed adonis-model-utilities, make sure to register the provider inside `start/app.js` in order to make use of it.

```js
const providers = [
  'adonis-model-utilities/providers/ModelUtilitiesProvider'
]
```

## 3. Use:

### Uuid Trait:

Add trait to the model that will make a new model instance using `node uuid`
```js
class User {

  static super () {
    super.boot()

    /**
     * Uuid trait
     */
    this.addTrait('@provider:IgorTrinidad/Uuid', { field: 'id', version: 'v4'})
  }

}
```

##### This trait create an model instance with id `node uuid v4` string
##### You can change the uuid version to `v1, v3, v4 or v5`.


#### Example of migration using Uuid Hook
```js
class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.uuid('id').index().unique().notNullable()
    })
  }
  down () {
    this.drop('users')
  }
}

```

### Password Hash Trait:

Add trait to the model and set the field that should apply the Hash method of own Adonis framework:
```js
class User {

  static super () {
    super.boot()

    /**
     * PasswordHash trait
     */
    this.addTrait('@provider:IgorTrinidad/PasswordHash', {field: 'password'})
  }

}
```

###### this model above is exactly same as:

```js

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {

  static get hidden () {
    return ['password']
  }

  static boot () {
    super.boot()
    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

  }

}

module.exports = User

```


### Format Currency Trait:

Add trait to the model and set the fields that should be formatted:
```js
class Product {

  static super () {
    super.boot()

    /**
     * Format currency trait
     */
    this.addTrait('@provider:IgorTrinidad/FormatCurrency', {fields: ['value'], prefix: 'formatted', symbol: 'US$ '})
  }

}
```
##### This trait apply add computed property (virtual) for the model, not changing the original field with prefix "formatted" eg: formattedPrice: "R$ 105,45"

###### Trait options (*optional)

```js
  {
    prefix: "formatted", //defaul model attribute prefix like formattedValue
    symbol : "US$ ",   // default currency symbol is '$'
    format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
    decimal : ",",  // decimal point separator
    thousand: ".",  // thousands separator
    precision : 2   // decimal places
  }

```

### Format Date Trait:

Add trait to the model and set the fields that should be formatted:
```js
class User {

  static super () {
    super.boot()

    /**
     * Format date trait
     */
    this.addTrait('@provider:IgorTrinidad/FormatDate', {fields: ['bday'], unformatted: 'YYYY-MM-DD',formatted: 'DD/MM/YYYY'})
  }
  

}
```

###### Trait options (*optional)

```js
  {
    fields: ['bday'],
    unformatted: 'YYYY-MM-DD', //*optional
    formatted: 'DD/MM/YYYY', //*optional
    setter: true, //*optional
    getter: true //*optional
  }

```

##### You can set the trait to only apply the getter, setter or both to the field before save on the db or fetch the data

##### This trait shouldn't be used on created_at and updated_at columns or dates setted using AdonisJS dates mutator

### Title Case Trait:

Add trait to the model and set the field that should be TitleCase:
```js
class User {

  static super () {
    super.boot()

    /**
     * Title case
     */
    this.addTrait('@provider:IgorTrinidad/TitleCase', { fields: ['firstName', 'lastName'] })
  }

}
```

##### this trait apply a setter on defined fields so all fields will be saved with Title Case (first char uppercase for each word of the string)


### FullName Trait:

Add trait to the model and set the trait options:
```js
class User {

  static super () {
    super.boot()

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
```

##### this trait apply a setter to the column formating the fullName for the on saving

### Parse Number Trait:

Add trait to the model and set the field that should be ParseNumber:
```js
class User {

  static super () {
    super.boot()

    /**
     * Parse Number
     */
    this.addTrait('@provider:IgorTrinidad/ParseNumber', { fields: ['value_one', 'value_two'] })
  }

}
```
##### this trait apply a getter on defined fields to parse numbers, this may be necessary if your db engine are formating number columns with too much zero decimals as string


## Built With

* [Adonis](http://adonisjs.com)
* [Moment](http://momentjs.com)
* [Accounting](http://openexchangerates.github.io/accounting.js/)



## Test functional (using Japa Tests)

```bash
  git clone https://github.com/igortrinidad/adonis-model-utilities.git
  npm install
  DB=sqlite node japa-tests
```

## Test Adonis integration

```bash
  git clone https://github.com/igortrinidad/adonis-model-utilities.git
  cd adonis-model-utilities/example
  npm install
  adonis key:generate
  adonis test
  adonis test
```


## Author


* **Igor Trindade** - *Developer*
* [github.com/igortrinidad](https://github.com/igortrinidad)
* [https://igortrindade.dev](https://igortrindade.dev)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Changelog

- v1.2.3
  - Initial release.
  - Added model attribute prefix option for formatCurrency
  - Added functional tests using Japa Tests
  - Abstracted titleCase map function
  - Added FullName trait
  - Breaking changes: simplified all traits options inside trait function, changed UuidHook to trait, removed getters from models
  - Fixed missing dependencies on PasswordTrait and FormatDate
  