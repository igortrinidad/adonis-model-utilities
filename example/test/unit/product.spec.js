const { test, trait, assert } = use('Test/Suite')('Product')
const Product = use('App/Models/Product')

trait('Test/ApiClient')

const product = {
  title: 'blUE and ORANGE SHirt',
  value: '105.45',
  availableAt: '18/06/2020'
}

test('it should create an new product model and apply all traits of the model', async ({ client, assert }) => {

  const newProduct = await Product.create(product)

  assert.equal(newProduct.toJSON()['formattedValue'], 'US$ 105,45')

})
