const assert = require("assert");
const sinon = require("sinon");
const {setPropVal, setProps, setArrayElPropsByIdFactory, addArrayElementFactory, removeArrayElementByIdFactory, resetArrayFactory, setPropsOnObjectFactory} = require("../../src/mutations.js");
const {helper} = require("../../src/common.js");

suite("mutations.js");

before(()=>{
    sinon.spy(helper, "verifyIndexAndContainer");
});

after(()=>{
    helper.verifyIndexAndContainer.restore();
});

afterEach(()=>{
    helper.verifyIndexAndContainer.resetHistory();
});

const setArrayElById = setArrayElPropsByIdFactory();

test("setPropVal sets 'val' on state by 'prop'", ()=>{
	const state = {a: 1};
	
	setPropVal(state, {prop: "a", val: 2});
	assert.deepEqual(state, {a:2});
});

test("setPropVal throws if prop and val not provided", ()=>{
	assert.throws(()=>{ setPropVal(null); }, {message: /property on data/});
	assert.throws(()=>{ setPropVal({prop: 1}); }, {message: /property on data/});
	assert.throws(()=>{ setPropVal({val: 1}); }, {message: /property on data/});
});

test("setPropVal throws if prop not on state", ()=>{
	const state = {a: 1};
	assert.throws(()=>{ setPropVal(state, {prop: "b", val: 2});; }, {message: /non-existing property/});
});


test("setProps sets valid properties", ()=>{
	const state = {a:1, b:2, c:3};	
	setProps(state, {a:3, c:1})
	assert.deepEqual(state, {a:3, b:2, c:1});
});

test("setProps throws if undefined property", ()=>{
	assert.throws(()=>{ setProps({}, {d:4}); }, {message: /non-existing property/});
});

test("setProps sets all valid properties before it throws for invalid ones", ()=>{
	const state = {a:1, b:2, c:3};	
	assert.throws(()=>{ setProps(state, {a:10, b:20, c:30, d:4}); }, {message: /non-existing property/});	
	assert.deepEqual(state, {a:10, b:20, c:30});
});

test("setProps sets objects as-is by default", ()=>{
	const state = {a: [1,2], b: {c:4}};	
	setProps(state, {a: [3,4], b: {d:5}})
	assert.deepEqual(state, {a: [3,4], b: {d:5}});	
});

test("setProps sets an object property recursively if parameter set", ()=>{
	const state = {a: {b: {c: 3}, d:4}};
	setProps(state, {a: {b: {c: 4}}, objOp: "recur"});
	assert.deepEqual(state, {a: {b: {c: 4}, d:4}});
});

test("setProps uses push on array property if parameter set", ()=>{
	const state = {array: [1]};
	setProps(state, {array: 2, arrOp: "push"});
	assert.deepEqual(state, {array: [1,2]});
});

test("setProps uses unshift on array property if parameter set", ()=>{
	const state = {array: [1]};
	setProps(state, {array: 2, arrOp: "unshift"});
	assert.deepEqual(state, {array: [2,1]});	
});

test("setProps uses pop on array property if parameter set", ()=>{
	const state = {array: [1,2]};
	setProps(state, {array: null, arrOp: "pop"});
	assert.deepEqual(state, {array: [1]});	
});

test("setProps uses shift on array property if parameter set", ()=>{
	const state = {array: [1,2]};
	setProps(state, {array: null, arrOp: "shift"});
	assert.deepEqual(state, {array: [2]});	
});

test("setProps uses insert on array property if parameter set", ()=>{
	const state = {array: [1]};
	
	setProps(state, {array: {value: "two", index: 0}, arrOp: "insert"});
	assert.deepEqual(state, {array: ["two", 1]});		
	
	setProps(state, {array: {value: 3, element: "two"}, arrOp: "insert"});
	assert.deepEqual(state, {array: [3, "two", 1]});		
});

test("setProps uses delete on array property if parameter set", ()=>{
	const state = {array: [1]};
	
	setProps(state, {array: 1, arrOp: "delete"});
	assert.deepEqual(state, {array: []});		
});

test("setProps throws if inserting when property value is not an object", ()=>{
	const state = {array: [1]};
	assert.throws(()=>{ setProps(state, {array: "notAnObject", arrOp: "insert"}); }, {message: /the property value must be an object/});
});

test("setProps throws if inserting when neither an index or an element is provided on property value", ()=>{
	const state = {array: [1]};
	assert.throws(()=>{ setProps(state, {array: {value: 2}, arrOp: "insert"}); }, {message: /index property \(number\) or an element to insert at./});
});

test("setProps throws if inserting when the element to insert at is not found in the array", ()=>{
	const state = {array: [1]};
	assert.throws(()=>{ setProps(state, {array: {value: 2, element: 123}, arrOp: "insert"}); }, {message: /the element property to insert at does not exist/});
});

test("setProps throws if deleting when the element to delete is not found in the array", ()=>{
	const state = {array: [1]};
	assert.throws(()=>{ setProps(state, {array:123, arrOp: "delete"}); }, {message: /the element to delete does not exist/});
});

test("setProps throws for unknown array operation command", ()=>{
	const state = {array: []};
	assert.throws(()=>{ setProps(state, {array:1, arrOp: "bollocks"}); }, {message: /Unknown array operation/});
});

test("setProps applies object property commands to all objects on data parameter", ()=>{
	const state = {obj1: {a:2,d:4}, obj2: {b:3,d:4}, arr1: [1], arr2: [2]};
	
	setProps(state, {
		obj1: {a:3},
		obj2: {b:4},
		objOp: "recur",
		
		arr1: 2,
		arr2: 3,
		arrOp: "push"
	});
	
	assert.deepEqual(state, {obj1: {a:3,d:4}, obj2: {b:4,d:4}, arr1: [1,2], arr2: [2,3]});
});


test("setPropsOnObjectFactory returns a function", ()=>{
	assert.equal(typeof setPropsOnObjectFactory({object: "dontThrow"}), "function");
});

test("setPropsOnObjectFactory throws if 'object' setting missing", ()=>{
	assert.throws(()=>{setPropsOnObjectFactory();}, {message: /setting\.object/});
});

test("setPropsOnObject throws if object name not on state", ()=>{
	const state = {testObj: {a:2}};
	const mutation = setPropsOnObjectFactory({object: "anythingButTestObj"});
	
	assert.throws(()=>{mutation(state);}, {message: /object with the name on the state does not exist/});
});

test("setPropsOnObject calls setProps (inference)", ()=>{
	const state = {testObj: {a:2, b:3}};
	const mutation = setPropsOnObjectFactory({object: "testObj"});	
	const update = {a: 123, b: 456};
	
	mutation(state, update);
	assert.deepEqual(state, {testObj: {a: 123, b: 456}});
});


test("setArrayElPropsByIdFactory returns a function", ()=>{
	assert.equal(typeof setArrayElPropsByIdFactory(), "function");
});

test("setArrayElPropsByIdFactory sets name and index prop of state", ()=>{
	const state = {custEls: [{id:1, a:456}], custIdx: {1:0}};
	const rightParams = setArrayElPropsByIdFactory({container: "custEls", index: "custIdx"});
	
	rightParams(state, {id:1, a: 123});	
	assert.equal(state.custEls[0].a, 123);	
});

test("setArrayElPropsByIdFactory calls verification helper", ()=>{
	const state = {custEls: [{id:1, a:456}], custIdx: {1:0}};
	const rightParams = setArrayElPropsByIdFactory({container: "custEls", index: "custIdx"});
	rightParams(state, {id:1, a: 123});	
	
	assert.equal(helper.verifyIndexAndContainer.callCount, 1);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[0], state);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[1], "custIdx");
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[2], "custEls");
});

test("setArrayElById sets prop/val pairs on element in container by id", ()=>{
	const state = {
		container: [{id: 2, a:1, b:2}, {id: 1, a:10, b:20}],
		index: {2:0, 1:1}
	};
	
	setArrayElById(state, {id: 1, a: 11, b: 22});
	assert.deepEqual(state.container, [{id: 2, a:1, b:2}, {id: 1, a:11, b:22}]);
	assert.deepEqual(state.index, {2:0, 1:1}, "index untouched");
});

test("setArrayElById throws if id is missing on data", ()=>{
	const state = {container: [], index: {}};
	assert.throws(()=>{ setArrayElById(state, {anythingBut: "id"}); }, {message: /Missing id/});
});

test("setArrayElById throws if id not found in index", ()=>{
	const state = {container: [], index: {}};
	assert.throws(()=>{ setArrayElById(state, {id: 123}); }, {message: /Id not found in index/});
});

test("setArrayElById throws if a prop does not exist on element", ()=>{
	const state = {container: [{id:1, propE: 123}], index: {1:0}};
	assert.throws(()=>{ setArrayElById(state, {id: 1, bollocks: 456}); }, {message: /non-existing property/});
});

test("setArrayElById sets all valid props before it throws", ()=>{
	const state = {container: [{id:1, propE: 123}], index: {1:0}};	
	assert.throws(()=>{ setArrayElById(state, {id: 1, bollocks: 456, propE: 789}); });
	assert.equal(state.container[0].propE, 789);
});


test("addArrayElementFactory returns a function", ()=>{
	assert.equal(typeof addArrayElementFactory(), "function");
});

test("addArrayElement adds an element to the state's array container", ()=>{
	const state = {custEls: [{id:2}], custIdx: {2:0}};
	const mutation = addArrayElementFactory({container: "custEls", index: "custIdx"});
	const newEl = {id: 123};

	mutation(state, newEl);
	assert.equal(state.custEls[1], newEl);
	assert.deepEqual(state.custIdx, {2:0, 123:1});
});

test("addArrayElement calls verification helper", ()=>{
	const state = {custEls: [], custIdx: {}};
	const mutation = addArrayElementFactory({container: "custEls", index: "custIdx"});

	mutation(state, {id: 123});
	assert.equal(helper.verifyIndexAndContainer.callCount, 1);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[0], state);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[1], "custIdx");
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[2], "custEls");
});

test("addArrayElement throws if element does not have id property", ()=>{
	const state = {custEls: [], custIdx: {}};
	const mutation = addArrayElementFactory({container: "custEls", index: "custIdx"});

	assert.throws(()=>{ mutation(state, {noId: 123}); }, {message: /has no id/});
});


test("removeArrayElementByIdFactory returns a function", ()=>{
	assert.equal(typeof removeArrayElementByIdFactory(), "function");
});

test("removeArrayElement removes an element from the state's array container", ()=>{
	const state = {custEls: [{id:2}], custIdx: {2:0}};
	const mutation = removeArrayElementByIdFactory({container: "custEls", index: "custIdx"});	

	mutation(state, {id: 2});
	assert.equal(state.custEls.length, 0);
	assert.deepEqual(state.custIdx, {});
});

test("removeArrayElement rebuilds index", ()=>{
	const state = {
		container: [{id:2}, {id:1}, {id:3}, {id: 0}, {id: 8}],
		index: {2:0, 1:1, 3:2, 0:3, 8:4}
	};
	const mutation = removeArrayElementByIdFactory();	
	
	mutation(state, {id:3});
	assert.deepEqual(state.index, {2:0, 1:1, 0:2, 8:3});
});

test("removeArrayElement calls verification helper", ()=>{
	const state = {container: [{id:1}], index: {1:0}};
	const mutation = removeArrayElementByIdFactory();	
	
	mutation(state, {id:1});	
	assert.equal(helper.verifyIndexAndContainer.callCount, 1);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[0], state);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[1], "index");
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[2], "container");	
});

test("removeArrayElement throws if trying to delete non-existing id", ()=>{
	const state = {container: [{id:1}], index: {1:0}};
	const mutation = removeArrayElementByIdFactory();	
	
	assert.throws(()=>{ mutation(state, {id:2}); }, {message: /id from undefined index/});		
	assert.throws(()=>{ mutation(state, {noIdAtAll:2}); }, {message: /id from undefined index/});		
});


test("resetArrayFactory returns a function", ()=>{
	assert.equal(typeof resetArrayFactory(), "function");
});

test("resetArray replaces container with elements provided", ()=>{
	const state = {container: [{id:1}], index: {1:0}};
	const mutation = resetArrayFactory();
	const replace = {id:9};	
	mutation(state, {elements: [replace]});

	assert.equal(state.container.length, 1);
	assert.equal(state.container[0], replace);
	assert.deepEqual(state.index, {9:0});
});

test("resetArray empties container if no elements provided", ()=>{
	const state = {container: [{id:1}], index: {1:0}};
	const mutation = resetArrayFactory();
	mutation(state);

	assert.equal(state.container.length, 0);
	assert.deepEqual(state.index, {});	
});

test("resetArray does not preserve container references if set", ()=>{
	const state = {container: [{id:1}], index: {1:0}};
	const replace = {id:9};	
	const preserving = resetArrayFactory({preserveReference: true});
	const nonPreserving = resetArrayFactory({preserveReference: false});
	let reference;

	reference = state.container;
	preserving(state, {elements: [replace]});
	assert.equal(state.container, reference);

	reference = state.container;
	nonPreserving(state, {elements: [replace]});
	assert.notEqual(state.container, reference);
});

test("resetArray rebuilds index", ()=>{
	const state = {container: [], index: {1:0, 2:1, 3:2, 4:3}};
	const mutation = resetArrayFactory();
	const replace = [{id:9}, {id:8}, {id:7}, {id:6}];	
	mutation(state, {elements: replace});

	assert.deepEqual(state.index, {9:0, 8:1, 7:2, 6:3});	
});

test("resetArray calls verification helper", ()=>{
	const state = {container: [{id:1}], index: {1:0}};
	const mutation = resetArrayFactory();	
	
	mutation(state, {id:1});	
	assert.equal(helper.verifyIndexAndContainer.callCount, 1);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[0], state);
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[1], "index");
	assert.equal(helper.verifyIndexAndContainer.lastCall.args[2], "container");	
});