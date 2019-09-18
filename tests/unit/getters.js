const assert = require("assert");
const sinon = require("sinon");
const {getArrayElWIdxByIdFactory} = require("../../src/getters.js");
const {helper} = require("../../src/common.js");

suite("getters.js");

const getArrayElWIdxById = getArrayElWIdxByIdFactory()

test("getArrayElWIdxByIdFactory returns a function", ()=>{
	assert.equal(typeof getArrayElWIdxById, "function");
});

test("getArrayElWIdxByIdFactory sets name and index prop of state", ()=>{
	const state = {custEls: [{id:1}], custIdx: {1:0}};
	const rightParams = getArrayElWIdxByIdFactory({container: "custEls", index: "custIdx"});
	assert.deepEqual(rightParams(state)(1), {id:1});
});

test("getArrayElWIdxByIdFactory calls verification helper", ()=>{
	sinon.spy(helper, "verifyIndexAndContainer");

	const state = {custEls: [{id:1}], custIdx: {1:0}};
	const rightParams = getArrayElWIdxByIdFactory({container: "custEls", index: "custIdx"});
	rightParams(state)(1), {id:1};

	assert.equal(helper.verifyIndexAndContainer.callCount, 1);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[0], state);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[1], "custIdx");
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[2], "custEls");

	helper.verifyIndexAndContainer.restore();
});


test("getArrayElWIdxById returns another function", ()=>{
	assert.equal(typeof getArrayElWIdxById({container: [], index: {}}), "function");
});

test("getArrayElWIdxById returns element from container by id", ()=>{
	const state = {container: [{id:2}, {id:1}, {id:3}], index: {2:0, 1:1, 3:2}};
	assert.deepEqual(getArrayElWIdxById(state)(1), {id:1});
});

test("getArrayElWIdxById returns null or predefined value if element not found", ()=>{
	const state = {container: [{id:2}, {id:1}, {id:3}], index: {2:0, 1:1, 3:2}};
	assert.equal(getArrayElWIdxById(state)(4), null);	
	
	const withNoResultSet = getArrayElWIdxByIdFactory({noResult: "empty"});
	assert.equal(withNoResultSet(state)(4), "empty");
});