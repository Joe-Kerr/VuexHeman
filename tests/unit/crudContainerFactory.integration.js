const assert = require("assert");
const sinon = require("sinon");
const sample = require("../../src/store.crudContainerFactory.js").default;
const Vue = require("vue").default;
const Vuex = require("vuex");
Vue.use(Vuex);

suite("store.crudContainerFactory.js");

let backup;

function getUniqueProp(parent, prop) {
    const results = Object.keys(parent).filter(_prop=>_prop.startsWith(prop));
    assert.equal(results.length, 1, "Test error: Expected exactly 1 unique prop.");
    return results[0];
}

before(()=>{
    backup = console.warn;
    console.warn = ()=>{};
});

after(()=>{
    console.warn = backup;
});

test("CRUD containers are independent from each other", ()=>{
	const store = new Vuex.Store({
		modules: {
			a: sample({namespaced: false, container: "aContainer", index: "aIndex", adderName: "addA", "deleterName": "delA"}),
			b: sample({namespaced: false, container: "bContainer", index: "bIndex", adderName: "addB", "deleterName": "delB", getterName: "preventWarning"})
		}
	});
	
	const aNextId = getUniqueProp(store.state.a, "nextId");
	const bNextId = getUniqueProp(store.state.b, "nextId");
	
	store.dispatch("addA", {dt: 1});
	store.dispatch("addA", {dt: 2});
	store.dispatch("addB", {dt: 3});
	
	assert.deepEqual(store.state.a.aContainer, [{id:1, dt:1}, {id:2, dt:2}]);
	assert.deepEqual(store.state.a.aIndex, {1:0, 2:1});
	assert.equal(store.state.a[aNextId], 3);
	
	assert.deepEqual(store.state.b.bContainer, [{id:1, dt:3}]);
	assert.deepEqual(store.state.b.bIndex, {1:0});
	assert.equal(store.state.b[bNextId], 2);
});