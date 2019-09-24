const assert = require("assert");
const index = require("../../src/index.js");
const getters = require("../../src/getters.js");
const mutations = require("../../src/mutations.js");
const actions = require("../../src/actions.js");

suite("index.js");

test("expected categorised exports provided", ()=>{
	assert.ok("default" in index);
	assert.ok("vuexHeman" in index);
	assert.ok("getters" in index);
	assert.ok("mutations" in index);
	assert.ok("actions" in index);	
});

test("expected individual exports provided", ()=>{
	
	function assertExports(obj, index) {
		for(const exportName in obj) {
			assert.ok(exportName in index, "Expected "+exportName+" to be on index exports.");
		}
	}

	assertExports(getters, index);
	assertExports(mutations, index);
	assertExports(actions, index);
	
	assert.ok("crudContainer" in index);
});