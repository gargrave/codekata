class Checkout {
  constructor(pricingRules) {
    this.rules = pricingRules
    this.cart = []
  }

  scan(item) {
    this.cart.push(item)
  }

  get total() {
    let totalPrice = 0

    const cartMap = this.cart.reduce((acc, item) => {
      const itemCount = acc[item] ? acc[item] + 1 : 1
      return {
        ...acc,
        [item]: itemCount,
      }
    }, {})

    Object.keys(cartMap).forEach(item => {
      const ruleset = this.rules[item]
      const rulesetKeys = Object.keys(ruleset)
      const itemQty = cartMap[item]

      if (rulesetKeys.length === 1) {
        totalPrice += itemQty * ruleset[rulesetKeys[0]]
      } else {
        const sortedKeys = rulesetKeys.sort().reverse()
        let remainingItemQty = itemQty

        sortedKeys.forEach(ruleKey => {
          while (remainingItemQty >= ruleKey) {
            totalPrice += ruleset[ruleKey]
            remainingItemQty -= ruleKey
          }
        })
      }
    })

    return totalPrice
  }
}

module.exports = {
  Checkout,
}
