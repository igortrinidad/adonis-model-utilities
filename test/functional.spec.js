const test = require('japa')
const formatCurrency = require('../src/Util/FormatCurrency')
const formatDate = require('../src/Util/FormatDate')
const titleCaseString = require('../src/Util/TitleCaseString')
const createFullName = require('../src/Util/CreateFullName')


test.group('Functional', (group) => {

  test('It should format a given value using formatCurrency function', (assert) => {

    assert.equal(formatCurrency(105.43, {symbol: 'R$ '}), 'R$ 105,43')

  })

  test('It should format a given date using formatDate function from YYYY-MM-DD to DD/MM/YYYY', (assert) => {

    assert.equal(formatDate('2020-06-12', 'YYYY-MM-DD', 'DD/MM/YYYY'), '12/06/2020')

  })

  test('It should format a given string using titleCaseString function', (assert) => {

    assert.equal(titleCaseString('igoR TrInDADE'), 'Igor Trindade')
    assert.equal(titleCaseString('igor'), 'Igor')

  })

  test('It should return the fullName for a given firstName and lastName', (assert) => {

    assert.equal(createFullName('igoR', 'TrINDADE'), 'Igor Trindade')

  })

})