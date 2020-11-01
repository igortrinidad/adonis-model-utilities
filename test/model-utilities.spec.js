'use strict'

/**
 * adonis-model-utilities
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const setup = require('./helpers/setup')
const { ioc } = require('@adonisjs/fold')
const validateUuid = require('uuid-validate')
const moment = require('moment')

const userData = {
  firstName: 'igOR',
  lastName: 'TRindade',
  username: 'igortrindade',
  email: 'igor@trindade.com'
}

const productData = {
  title: 'Independent Stage 11 Standart Truck ',
  value: 22.99,
  availableAt: '18/06/2020'
}

test.group('Adonis traits integrations', (group) => {
  group.before(async () => {

    await setup.up()

    ioc.bind('IgorTrinidad/TitleCase', () => {
      const TitleCase = require('../src/Traits/TitleCase')
      return new TitleCase()
    })
    ioc.bind('IgorTrinidad/FormatCurrency', () => {
      const FormatCurrency = require('../src/Traits/FormatCurrency')
      return new FormatCurrency()
    })
    ioc.bind('IgorTrinidad/FormatDate', () => {
      const FormatDate = require('../src/Traits/FormatDate')
      return new FormatDate()
    })
    ioc.bind('IgorTrinidad/Uuid', () => {
      const Uuid = require('../src/Traits/Uuid')
      return new Uuid()
    })
    ioc.bind('IgorTrinidad/FullName', () => {
      const FullName = require('../src/Traits/FullName')
      return new FullName()
    })

  })

  group.beforeEach(async () => {
    await use('Database').beginGlobalTransaction()
  })

  group.afterEach(() => {
    use('Database').rollbackGlobalTransaction()
  })

  group.after(async () => {
    await setup.down()
  })

  /**
   * User traits
   */
  test('It should create a new User and check if the uuid is valid', async (assert) => {

    const Model = use('Model')
    const UserModel = require('./models/User')(Model)

    const newUser = await UserModel.create(userData)

    assert.isTrue(validateUuid(newUser.id))

  })

  test('It should create a new User and check if the firstName and lastName had TitleCase applied', async (assert) => {

    const Model = use('Model')
    const UserModel = require('./models/User')(Model)

    const newUser = await UserModel.create(userData)

    console.log(newUser)

    assert.equal(newUser['firstName'], 'Igor')
    assert.equal(newUser['lastName'], 'Trindade')

  })

  test('It should create and fetch the first user model, try to change the model id but without success', async (assert) => {

    const Model = use('Model')
    const UserModel = require('./models/User')(Model)

    const newUser = await UserModel.create(userData)
    const firstUser = await UserModel.first()

    firstUser.id = '123123'
    await firstUser.save()

    const newFirstUser = await UserModel.first()

    assert.equal(newUser.id, newFirstUser.id)
    
    const allUsers = await UserModel.all()

    assert.equal(allUsers.rows.length, 1)

    allUsers.rows.map((user) => {
      assert.equal(user.id, newUser.id)
    })

  })

  test('It should create a new User and check if the fullName matches', async (assert) => {

    const Model = use('Model')
    const UserModel = require('./models/User')(Model)

    const newUser = await UserModel.create(userData)

    assert.equal(newUser['fullName'], 'Igor Trindade')

  })

  test('It should create a new Product and check if the value formatted matches', async (assert) => {

    const Model = use('Model')
    const ProductModel = require('./models/Product')(Model)

    const newProduct = await ProductModel.create(productData)


    assert.equal(newProduct.toJSON()['formattedValue'], 'US$ 22,99')

  })

  test('It should, create and fetch the first product model, update the availableAt attribute and check if the date is valid', async (assert) => {

    const Model = use('Model')
    const ProductModel = require('./models/Product')(Model)

    const newProduct = await ProductModel.create(productData)

    const firstProduct = await ProductModel.first()

    firstProduct.availableAt = '10/10/2020'

    await firstProduct.save()

    await firstProduct.reload()

    assert.isTrue(moment(firstProduct.availableAt, 'DD/MM/YYYY').isValid())

  })

})