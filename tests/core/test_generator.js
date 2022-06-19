QUnit.module("generator")

QUnit.test.each('Test Algae', [
    [0, 'A'],
    [1, 'AB'],
    [2, "ABA"],
    [3, "ABAAB"]
], (assert, [target_level, expected]) => {

    var gen = new Generator({"A":"AB", "B":"A"}, 'A', target_level);
    var output = run_generator(gen)
    assert.equal(output, expected);
});