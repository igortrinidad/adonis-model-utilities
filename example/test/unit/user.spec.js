const { test, trait, assert } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')

const user = {
  firstName: 'igOR',
  lastName: 'trINDADE',
  username: 'igortrINDADE',
  email: 'igor@trindade.com',
  password: '111111'
}

test('it should create a new user', async ({ client, assert }) => {

  const newUser = await User.create(user)

  console.log(newUser.toJSON())

})
