const add = require('./add')
test('adding 1 and 2 equals 3', () => {
  expect(add(1, 2)).toBe(3)
})
