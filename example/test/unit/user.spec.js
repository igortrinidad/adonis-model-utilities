const { test, trait, assert } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

const userData = {
  firstName: 'igOR',
  lastName: 'trINDADE',
  username: 'igortrINDADE',
  email: 'igor@trindade.com',
  password: 'topsecret'
}

test('it should create a new user using all traits defined in the model', async ({ client, assert }) => {

  const newUser = await User.create(userData)

  const userGetted = newUser.toJSON()

  assert.equal(userGetted['password'], null)
  assert.equal(userGetted['firstName'], 'Igor')
  assert.equal(userGetted['lastName'], 'Trindade')
  assert.equal(userGetted['fullName'], 'Igor Trindade')

})

test('it should check if the user created has password and email are hidden on JSON model load', async ({ client, assert }) => {

  const newUser = await User.first()

  const userGetted = newUser.toJSON()

  assert.isUndefined(userGetted.password)
  assert.isUndefined(userGetted.email)

})

test('it should check if the user email could match after setVisible', async ({ client, assert }) => {

  const newUser = await User.query().setVisible(['email']).first()

  const userGetted = newUser.toJSON()

  assert.isDefined(userGetted.email)
  assert.equal(userGetted.email, userData.email)

})
