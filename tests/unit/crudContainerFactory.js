const assert = require("assert");
const sinon = require("sinon");
const sample = require("../../src/store.crudContainerFactory.js").default;

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

test("crudContainerFactory returns a Vuex store object", ()=>{
    const store = sample();
    assert.ok("namespaced" in store);
    assert.ok("state" in store);
    assert.ok("getters" in store);
    assert.ok("mutations" in store);
    assert.ok("actions" in store);
});

test("crudContainerFactory uses property names provided by settings parameter", ()=>{
    const store = sample({
        container: "testContainer",
        index: "testIndex",
        getterName: "testGetter",
        setterName: "testSetter",
        adderName: "testAdder",
        deleterName: "testDeleter",
        resetterName: "testResetter",
		getNextIdName: "testGetNextId"
    });

    assert.ok("testContainer" in store.state);
    assert.ok("testIndex" in store.state);
    
    assert.ok("testGetter" in store.getters);
    assert.ok("testGetNextId" in store.getters);
	
    assert.ok("testSetter" in store.mutations);
    assert.ok("testAdder" in store.mutations);
    assert.ok("testDeleter" in store.mutations);
    assert.ok("testResetter" in store.mutations);
    
    assert.ok("testSetter" in store.actions);
    assert.ok("testAdder" in store.actions);
    assert.ok("testDeleter" in store.actions);
});

test("crudContainerFactory uses namespaced setting", ()=>{
    const userTrue = sample({namespaced: true});
    const userFalse = sample({namespaced: false});

    assert.equal(userTrue.namespaced, true);
    assert.equal(userFalse.namespaced, false);
});

test("crudContainerFactory uses expected getter function", ()=>{
    const store = sample();
    assert.equal(store.getters.getById.name, "generatedGetArrayElWIdxById");
});

test("crudContainerFactory uses expected getNextId function", ()=>{
    const store = sample();
    assert.equal(store.getters.getNextId.name, "generatedGetNextId");      
});

test("crudContainerFactory uses expected setter function", ()=>{
    const store = sample();
    assert.equal(store.mutations.set.name, "generatedSetArrayElPropsById");   
});

test("crudContainerFactory uses expected adder function", ()=>{
    const store = sample();
    assert.equal(store.mutations.add.name, "generatedAddArrayElement");      
});

test("crudContainerFactory uses expected deleter function", ()=>{
    const store = sample();
    assert.equal(store.mutations.delete.name, "generatedRemoveArrayElementById");       
});

test("crudContainerFactory uses expected resetter function", ()=>{
    const store = sample();
    assert.equal(store.mutations.reset.name, "generatedResetArray");       
});

test("crudContainerFactory uses extend setting", ()=>{
    const extend = {
        state: {a:2}, 
        getters: {b: function bn(){}},
        mutations: {c: function cn(){}},
        actions: {d: function dn(){}}
    };
    const store = sample({extend, namespaced: false});

    assert.equal(store.state.a, 2);
    assert.equal(store.getters.b.name, "bn");
    assert.equal(store.mutations.c.name, "cn");
    assert.equal(store.actions.d.name, "dn");
});

test("crudContainerFactory prioritises extend properties", ()=>{
    const extend = {
        state: {a:2}, 
        getters: {b: function bn(){}},
        mutations: {
            c1: function c1n(){},
            c2: function c2n(){},
            c3: function c3n(){}
        },
        actions: {d: function dn(){}}
    };

    const store = sample({extend, namespaced: false, container: "a", getterName: "b", setterName: "c1", adderName: "c2", deleterName: "c3"});

    assert.equal(store.state.a, 2);
    assert.equal(store.getters.b.name, "bn");
    assert.equal(store.mutations.c1.name, "c1n");
    assert.equal(store.mutations.c2.name, "c2n");
    assert.equal(store.mutations.c3.name, "c3n");
});

test("crudContainerFactory generates unique nextId state property", ()=>{
    const storeA = sample();
    const storeB = sample();

    const nextIdA = getUniqueProp(storeA.state, "nextId");
    const nextIdB = getUniqueProp(storeB.state, "nextId");

    assert.notEqual(nextIdA, nextIdB);
});

test("crudContainerFactory generates unique incrementId mutation", ()=>{
    const storeA = sample();
    const storeB = sample();

    const nextIdA = getUniqueProp(storeA.mutations, "incrementId");
    const nextIdB = getUniqueProp(storeB.mutations, "incrementId");

    assert.notEqual(nextIdA, nextIdB);    
});

test("getters.getNextId returns next free instance id", ()=>{
    const store = sample({getNextIdName: "testGetNextId"});
    const mutationName = getUniqueProp(store.mutations, "incrementId");
	const idName = getUniqueProp(store.state, "nextId");  

    const state = {};
    state[idName] = 1;
    store.mutations[mutationName](state);
    assert.equal(store.getters.testGetNextId(state), 2);	
});

test("mutations.incrementId increases nextId by 1", ()=>{
    const store = sample();
    const mutationName = getUniqueProp(store.mutations, "incrementId");
    const idName = getUniqueProp(store.state, "nextId");    
    
    const state = {};
    state[idName] = 1;
    store.mutations[mutationName](state);
    assert.equal(state[idName], 2);
});

test("mutations.incrementId sets optional base id before incrementing", ()=>{
    const store = sample();
    const mutationName = getUniqueProp(store.mutations, "incrementId");
    const idName = getUniqueProp(store.state, "nextId");   	
	
    const state = {};
    state[idName] = 1;	
    store.mutations[mutationName](state, {baseId: 123});
    assert.equal(state[idName], 124);	
});

test("actions.adder calls adder and increment mutations", ()=>{
    const store = sample();
    const commit = new sinon.fake();
    const data = {id:1};
    const incrementName = getUniqueProp(store.mutations, "incrementId");
    
    store.actions.add({commit, state: {}}, data);

    assert.equal(commit.callCount, 2);
    assert.equal(commit.firstCall.args[0], "add");
    assert.equal(commit.firstCall.args[1], data);
    assert.equal(commit.lastCall.args[0], incrementName);
});

test("actions.resetter calls incrementId mutation with max id of elements", ()=>{
    const store = sample();
    const commit = new sinon.fake();
    const data = {elements: [{id:5}, {id:1}]};
    const incrementName = getUniqueProp(store.mutations, "incrementId");
    
    store.actions.reset({commit, state: {}}, data);	
	
    assert.equal(commit.callCount, 2);
    assert.equal(commit.firstCall.args[0], incrementName);
    assert.equal(commit.firstCall.args[1].baseId, 5);

	store.actions.reset({commit, state: {}});
	assert.equal(commit.thirdCall.args[1].baseId, 0);	
});

test("actions.resetter calls resetter mutation with data", ()=>{
    const store = sample();
    const commit = new sinon.fake();
	const data = {elements: [{id:5}, {id:1}]};
    
    store.actions.reset({commit, state: {}}, data);
	assert.equal(commit.lastCall.args[0], "reset");
	assert.equal(commit.lastCall.args[1], data);
});