const assert = require('assert')

const { Cart, Checkout } = require('./checkout.fp')
const { defaultPricingRules } = require('./rules')

function price(goods) {
  const cart = goods.split('').reduce((acc, item) => Cart.scan(item, acc), [])
  return Checkout.total(cart, defaultPricingRules)
}

function testTotals() {
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
}

function testIncremental() {
  let cart = []
  assert.equal(0, Checkout.total(cart, defaultPricingRules))

  cart = Cart.scan('A', cart)
  assert.equal(50, Checkout.total(cart, defaultPricingRules))

  cart = Cart.scan('B', cart)
  assert.equal(80, Checkout.total(cart, defaultPricingRules))

  cart = Cart.scan('A', cart)
  assert.equal(130, Checkout.total(cart, defaultPricingRules))

  cart = Cart.scan('A', cart)
  assert.equal(160, Checkout.total(cart, defaultPricingRules))

  cart = Cart.scan('B', cart)
  assert.equal(175, Checkout.total(cart, defaultPricingRules))
}

testTotals()
testIncremental()
