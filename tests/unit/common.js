const assert = require("assert");
const {helper} = require("../../src/common.js");

suite("common.js");

test("helper.verifyIndexAndContainer throws if index is not an object in state", ()=>{
    const state = {
        testContainer: [],
        testIndex: {},
    };

    assert.throws(()=>{ helper.verifyIndexAndContainer(state, "bollocks", "testContainer"); }, {message: /not an object/});
    assert.doesNotThrow(()=>{ helper.verifyIndexAndContainer(state, "testIndex", "testContainer"); });
});

test("helper.verifyIndexAndContainer throws if container is not an array in state", ()=>{
    const state = {
        testContainer: [],
        testIndex: {},
    };

    assert.throws(()=>{ helper.verifyIndexAndContainer(state, "testIndex", "bollocks"); }, {message: /not an array/});
    assert.doesNotThrow(()=>{ helper.verifyIndexAndContainer(state, "testIndex", "testContainer"); });
});