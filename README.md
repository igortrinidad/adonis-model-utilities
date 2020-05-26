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

### Title Case Trait:

Add trait to the model and set the field that should be TitleCase:
```js
class User {
  static super () {
    super.boot()

    /**
     * add trait TitleCaseAttributes
    */
    this.addTrait('@provider:TitleCaseAttributes')
  }
  
  /**
   * add getter titleCases to inform trait what fields that should be treated
  */
  static get titleCases () {
    return ['name', 'lastName']
  }

}
```

##### this trait apply a setter on defined fields so all fields will be saved with Title Case (first char uppercase for each word of the string)

### Format Currency Trait:

Add trait to the model and set the fields that should be formatted:
```js
class Product {
  static super () {
    super.boot()

    /**
     * add trait FormatCurrencyAttributes
    */
    this.addTrait('@provider:FormatCurrencyAttributes', {symbol: 'R$ '})
  }
  
  /**
   * add getter currencies to inform trait what fields that should apply the trait
  */
  static get currencies () {
    return ['price']
  }

}
```
##### This trait apply add computed property (virtual) for the model, not changing the original field with prefix "formatted" eg: formattedPrice: "R$ 105,45"

###### Trait options (*optional)

```js
  {
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
     * add trait FormatDateAttributes
    */
    this.addTrait('@provider:FormatDateAttributes', {unformatted: 'YYYY-MM-DD', formatted: 'DD/MM/YY'})
  }
  
  /**
   * add getter currencies to inform trait what fields that should apply the trait
  */
  static get formattedDates () {
    return [
      {
        field: 'bday',
        setter: true,
        getter: true 
      }
    ]
  }

}
```

###### Trait options (*optional)

```js
  {
    unformatted: 'YYYY-MM-DD',
    formatted: 'DD/MM/YYYY'
  }

```

##### You can set the trait to only apply the getter, setter or both to the field before save on the db or fetch the data

##### This trait shouldn't be used on created_at and updated_at columns or dates setted using AdonisJS dates mutator


### Uuid hook:

Add hook to the model that will make a new model instance with id `node uuid v4`
```js
class User {

  static super () {
    super.boot()

    /**
     * Add uuid generate hook
     */
    this.addHook('beforeCreate', '@provider:UuidHook.id')
  }
  
  /**
  * Set incrementing to false to inform Adonis to not increment the id field
  */
  static get incrementing () {
    return false
  }

}
```

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

##### This hook create an model instance with id `node uuid v4` string

## Built With

* [Adonis](http://adonisjs.com)
* [Moment](http://momentjs.com)
* [Accounting](http://openexchangerates.github.io/accounting.js/)



## Test

```bash
  git clone https://github.com/igortrinidad/adonis-model-utilities.git
  cd adonis-model-utilities/example
  npm install
  adonis key:generate
  adonis test
```

##### Or over the browser
```bash
  git clone https://github.com/igortrinidad/adonis-model-utilities.git
  cd adonis-model-utilities/example
  npm install
  adonis key:generate
  adonis serve
```

##### Just access the root route of the application running and check the return of the model created with traits


## Author


* **Igor Trindade** - *Developer*
* [github.com/igortrinidad](https://github.com/igortrinidad)
* [https://igortrindade.dev](https://igortrindade.dev)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Changelog

- v1.0.0
  - Initial release.
  