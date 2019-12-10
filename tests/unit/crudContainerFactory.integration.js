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
	
	store.dispatch("addA", {dt: 1});
	store.dispatch("addA", {dt: 2});
	store.dispatch("addB", {dt: 3});
	
	assert.deepEqual(store.state.a.aContainer, [{id:1, dt:1}, {id:2, dt:2}]);
	assert.deepEqual(store.state.a.aIndex, {1:0, 2:1});
	
	assert.deepEqual(store.state.b.bContainer, [{id:1, dt:3}]);
	assert.deepEqual(store.state.b.bIndex, {1:0});
});

test("CRUD containers use their own id range ", ()=>{
    const storeA = new Vuex.Store( sample({namespaced: false}) );
    const storeB = new Vuex.Store( sample({namespaced: false}) );
    const nextIdA = getUniqueProp(storeA.state, "nextId");
    const nextIdB = getUniqueProp(storeB.state, "nextId");

	storeA.dispatch("add", {});
	storeB.dispatch("add", {});
	
	assert.equal(storeA.state[nextIdA], 2);
	assert.equal(storeB.state[nextIdB], 2);
});