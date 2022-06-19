QUnit.module("generator")

QUnit.test('Test Algae level 3', assert => {

    var gen = new Generator({"A":"AB", "B":"A"}, 'A', 3);
    var output = run_generator(gen)
    assert.equal(output, "ABAAB");
});