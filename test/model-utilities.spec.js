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

const userData = {
  firstName: 'igOR',
  lastName: 'TRindade',
  username: 'igortrindade',
  email: 'igor@trindade.com'
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

  test('It should create a new User and check if the fullName matches', async (assert) => {

    const Model = use('Model')

    const UserModel = require('./models/User')(Model)

    const newUser = await UserModel.create(userData)

    assert.equal(newUser['fullName'], 'Igor Trindade')

  })

})