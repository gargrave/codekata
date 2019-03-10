const assert = require('assert')

const { Checkout } = require('./checkout')
const { defaultPricingRules } = require('./rules')

function price(goods) {
  const co = new Checkout(defaultPricingRules)
  goods.split('').forEach(item => co.scan(item))
  return co.total
}

assert.equal(0, price(''))
assert.equal(50, price('A'))
assert.equal(80, price('AB'))
assert.equal(115, price('CDBA'))

assert.equal(100, price('AA'))
assert.equal(130, price('AAA'))
assert.equal(180, price('AAAA'))
assert.equal(230, price('AAAAA'))
assert.equal(260, price('AAAAAA'))

assert.equal(160, price('AAAB'))
assert.equal(175, price('AAABB'))
assert.equal(190, price('AAABBD'))
assert.equal(190, price('DABABA'))
