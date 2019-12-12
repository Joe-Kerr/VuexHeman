const assert = require("assert");
const sinon = require("sinon");
const {storeVisitor} = require("../../src/actions.visitor.js");
const Vue = require("vue").default;
const Vuex = require("vuex");
Vue.use(Vuex);

suite("actions.visitor.js");

test("Vuex has the required interface", ()=>{
	const store = new Vuex.Store({
		state: {root: 1},
		modules: {
			child: {state: {child: 2}}
		}
	});
	
	assert.ok("_modules" in store);
	assert.ok("root" in store._modules);
	assert.ok("_rawModule" in store._modules.root);
	assert.ok("_children" in store._modules.root);	
	assert.ok("child" in store._modules.root._children);
	assert.ok("_rawModule" in store._modules.root._children.child);
	assert.ok("_children" in store._modules.root._children.child);
});

test("storeVisitor calls callback with namespace and current module", ()=>{
	const root = {namespaced: true, getters: {getLevel0() {}}};
	const level1 = {namespaced: false, getters: {getLevel1() {}}};
	const level2 = {namespaced: true, getters: {getLevel2() {}}};	
	root.modules = {level1, level2};
	
	const store = new Vuex.Store(root);	
	const calls = [];	
	
	storeVisitor(store, (module, namespace)=>{calls.push({module, namespace});});
	
	assert.equal(calls[0].namespace, "");
	assert.ok("getLevel0" in calls[0].module.getters);	
	
	assert.equal(calls[1].namespace, "");
	assert.ok("getLevel1" in calls[1].module.getters);	
	
	assert.equal(calls[2].namespace, "level2");
	assert.ok("getLevel2" in calls[2].module.getters);
});

test("storeVisitor builds correct namespaces", ()=>{
	const root = {namespaced: true, getters: {getLevel0() {}}};
	const level1 = {namespaced: false, getters: {getLevel1() {}}};
	const level2 = {namespaced: true, getters: {getLevel2() {}}};
	
	const level11 = {namespaced: false, getters: {getLevel11() {}}};
	const level21 = {namespaced: true, getters: {getLevel21() {}}};	
	
	const level111 = {namespaced: false, getters: {getLevel111() {}}};
	const level112 = {namespaced: false, getters: {getLevel112() {}}};
	const level211 = {namespaced: true, getters: {getLevel211() {}}};
	const level212 = {namespaced: false, getters: {getLevel212() {}}};
	
	root.modules = {level1, level2};
	level1.modules = {level11};
	level2.modules = {level21};
	level11.modules = {level111, level112};
	level21.modules = {level211, level212};
	
	const store = new Vuex.Store(root);	
	const calls = [];
	
	storeVisitor(store, (module, namespace, details)=>{calls.push({module, namespace});});
	
	const getters = calls.map((call)=>{
		if(call.namespace !== "") {
			return call.namespace+"/"+Object.keys(call.module.getters)[0];
		}
		else {
			return Object.keys(call.module.getters)[0];
		}
	})
	
	//console.log(calls);
	//console.log(getters)
	//console.log("------------");
	//console.log(Object.keys(store.getters));
	
	assert.equal(getters.length, Object.keys(store.getters).length);
	
	getters.forEach((getterName)=>{
		assert.ok(getterName in store.getters, "Produced a getter that does not exist in store.getters: "+getterName);
	});
	
	for(const getterName in store.getters) {
		assert.ok(getters.indexOf(getterName) > -1, "Failed to produce a getter that exists in store.getters: "+getterName);
	}
});