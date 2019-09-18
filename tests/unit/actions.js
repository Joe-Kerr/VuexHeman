const assert = require("assert");
const sinon = require("sinon");
const {passThruActionsFactory} = require("../../src/actions.js");

const commit = new sinon.fake();
const data = 1;

suite("actions.js");

beforeEach(()=>{
	commit.resetHistory();
});

test("passThruActionsFactory returns a single function with the command name provided", ()=>{
	const generatedAction = passThruActionsFactory("someCommand");
	assert.equal(typeof generatedAction, "function");
	
	generatedAction({commit}, data);
	assert.equal(commit.lastCall.args[0], "someCommand");
	assert.equal(commit.lastCall.args[1], data);
});

test("passThruActionsFactory returns an object of functions with same command and method names", ()=>{
	const generatedAction = passThruActionsFactory(["one", "two", "three"]);
	assert.equal(typeof generatedAction, "object");	
	assert.ok("one" in generatedAction);
	assert.ok("two" in generatedAction);
	assert.ok("three" in generatedAction);
	
	generatedAction.one({commit}, data);
	generatedAction.two({commit}, data);
	generatedAction.three({commit}, data);
	assert.equal(commit.firstCall.args[0], "one");	
	assert.equal(commit.firstCall.args[1], data);
	assert.equal(commit.secondCall.args[0], "two");	
	assert.equal(commit.secondCall.args[1], data);
	assert.equal(commit.lastCall.args[0], "three");
	assert.equal(commit.lastCall.args[1], data);	
});

test("passThruActionsFactory returns an object of functions with different command and method names", ()=>{
	const generatedAction = passThruActionsFactory({prop1: "cmd1", prop2: "cmd2", prop3: "cmd3"});
	assert.equal(typeof generatedAction, "object");
	assert.ok("prop1" in generatedAction);
	assert.ok("prop2" in generatedAction);
	assert.ok("prop3" in generatedAction);
	
	generatedAction.prop1({commit}, data);
	generatedAction.prop2({commit}, data);
	generatedAction.prop3({commit}, data);
	assert.equal(commit.firstCall.args[0], "cmd1");	
	assert.equal(commit.firstCall.args[1], data);	
	assert.equal(commit.secondCall.args[0], "cmd2");
	assert.equal(commit.secondCall.args[1], data);		
	assert.equal(commit.lastCall.args[0], "cmd3");	
	assert.equal(commit.lastCall.args[1], data);		
});

test("passThruActionsFactory throws if parameter not string, array or object", ()=>{
	assert.throws(()=>{ passThruActionsFactory(123); }, {message: /type string, object or array/});
	assert.throws(()=>{ passThruActionsFactory(()=>"123"); }, {message: /type string, object or array/});
});

test("passThruActionsFactory throws if element of array not of type string", ()=>{
	assert.throws(()=>{ passThruActionsFactory([123]); }, {message: /element of array to be of type string/});
	assert.throws(()=>{ passThruActionsFactory([()=>"123"]); }, {message: /element of array to be of type string/});
});