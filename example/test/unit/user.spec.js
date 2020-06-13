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
