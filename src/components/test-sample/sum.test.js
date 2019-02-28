const sum = require('./sum');

test('sum funtion test', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(2, 2)).toBe(4);
});

