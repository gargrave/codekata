const assert = require('assert')

const { Cart, Checkout } = require('./checkout.fp')
const { defaultPricingRules } = require('./rules')

function mockCheckoutProcess(goods) {
  const cart = goods.split('').reduce((acc, item) => Cart.scan(item, acc), [])
  return Checkout.total(cart, defaultPricingRules)
}

assert.equal(0, mockCheckoutProcess(''))
assert.equal(50, mockCheckoutProcess('A'))
assert.equal(80, mockCheckoutProcess('AB'))
assert.equal(115, mockCheckoutProcess('CDBA'))

assert.equal(100, mockCheckoutProcess('AA'))
assert.equal(130, mockCheckoutProcess('AAA'))
assert.equal(180, mockCheckoutProcess('AAAA'))
assert.equal(230, mockCheckoutProcess('AAAAA'))
assert.equal(260, mockCheckoutProcess('AAAAAA'))

assert.equal(160, mockCheckoutProcess('AAAB'))
assert.equal(175, mockCheckoutProcess('AAABB'))
assert.equal(190, mockCheckoutProcess('AAABBD'))
assert.equal(190, mockCheckoutProcess('DABABA'))
