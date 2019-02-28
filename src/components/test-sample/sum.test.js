const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('intentional error 2 + 2 equal 5', () => {
    expect(sum(2, 2)).toBe(5);
});
