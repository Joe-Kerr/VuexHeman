const {helper} = require("./common.js");

/// The mutation sets a state property.
/// @function setPropVal
/// @throws Throws for undefined properties - after all valid properties have been set.
/// @example <caption>Using the factory function</caption>
/// { state: {propA: 1, propB: 2},
///    mutations: {
///    set: setPropVal
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {prop: "propA", val: 3});
export const setPropVal = function setPropVal(state, data) {	
	if(typeof data === "undefined" || !("prop" in data) || !("val" in data)) {
		throw new Error("Missing property on data parameter: provide 'prop' and 'val'.");
	}
	
	if(!(data.prop in state)) {
		throw new Error("Tried to set non-existing property: "+data.prop);
	}
	
	state[data.prop] = data.val;
}

/// The mutation sets state properties by key/val pairs on the data parameter.
/// @function setProps
/// @throws Throws for undefined properties - after all valid properties have been set.
/// @example <caption>Using the factory function</caption>
/// { state: {propA: 1, propB: 2},
///    mutations: {
///    set: setProps
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {propA: 2, propB: 3});
export const setProps = function setProps(state, data) {
	const err = [];
	for(const prop in data) {
		if(!(prop in state)) {
			err.push(prop);
			continue;
		}
		state[prop] = data[prop];
	}

	if(err.length > 0) {
		throw new Error("Tried to set at least one non-existing property: "+err.join(","));
	}	
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation sets the properties of an object on the state.
/// @function setPropsOnObjectFactory
/// @param {object} settings - Configuration.
/// @param {string} settings.object - The name of the object on the state.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {someObject: {propA: 2, propB: 5}},
///    mutations: {
///    set: setPropsOnObjectFactory({object: "someObject"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {propA: 123, propB: 456});
export const setPropsOnObjectFactory = function setPropsOnObjectFactory(settings={}) {
	const object = settings.object;
	
	if(object === undefined) {
		throw new Error("Missing mandatory settings parameter 'setting.object'");
	}
	
	return function generatedSetPropsOnObject(state, data) {
		if(!(object in state)) {
			throw new Error("The object with the name on the state does not exist: "+object);
		}
		
		setProps(state[object], data);
	}
}

function setArrayElPropsById(container, index, props) {
	const id = props.id;
	if(typeof id === "undefined") {
		throw new Error("Missing id on data parameter.");
	}
	
	const idx = index[id]
	if(typeof idx === "undefined") {
		throw new Error("Id not found in index while setting prop/s on element: "+JSON.stringify(props));
	}

	const el = container[idx];
	delete props.id;
	
	setProps(el, props);
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation sets the properties of an element within an array to the given values.
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// Assumes that the update data provided to the mutation have an id property.
/// @function setArrayElPropsByIdFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element", data: 123}], nameOfIndex: {2:0}},
///    mutations: {
///    set: setArrayElPropsByIdFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {id: 2, name: "newName", data: 456});
export const setArrayElPropsByIdFactory = function setArrayElPropsByIdFactory(settings={}) {
	const container = settings.container || "container";
	const index = settings.index || "index";
	
	return function generatedSetArrayElPropsById(state, data) {			
		helper.verifyIndexAndContainer(state, index, container);	
		setArrayElPropsById(state[container], state[index], data);
	}	
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation adds an element to an array. 
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// Assumes that the element provided to the mutation has an id property.
/// @function addArrayElementFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element"}], nameOfIndex: {2:0}},
///    mutations: {
///    add: addArrayElementFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("add", {id: 3, name: "newElement"});
export const addArrayElementFactory = function addArrayElementFactory(settings={}) {
	const container = settings.container || "container";
    const index = settings.index || "index";

    return function generatedAddArrayElement(state, data) {
        helper.verifyIndexAndContainer(state, index, container);	
		
		if(!("id" in data)) {
			throw new Error("Failed to add element because it has no id: "+JSON.stringify(data));
		}

		const newIdx = state[container].push(data) - 1;
        state[index][data.id] = newIdx;
    }
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation removes an element from an array. 
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// @function removeArrayElementByIdFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element"}], nameOfIndex: {2:0}},
///    mutations: {
///    delete: removeArrayElementByIdFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("delete", {id: 2});
export const removeArrayElementByIdFactory = function removeArrayElementByIdFactory(settings={}) {
	const container = settings.container || "container";
    const index = settings.index || "index";
    
    return function generatedRemoveArrayElementById(state, data) {
        helper.verifyIndexAndContainer(state, index, container);
		
		const id = data.id;
		const theContainer = state[container];
		const i = state[index][id];

        if(theContainer[i] === undefined) {
            throw new Error("Delete failed. Tried to remove id from undefined index: "+i);
        }

		theContainer.splice(i, 1);
		delete state[index][id];

		for(let r=i, rr=theContainer.length; r<rr; r++) {
			state[index][theContainer[r].id] = r;
		}
    }
}

function resetArrayFast(state, containerName, elements) {
	state[containerName] = elements;
}

function resetArrayPreserving(container, elements) {
	container.splice(0, container.length);
	container.push(...elements);
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation empties or replaces the container array. 
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// Assumes that you do not use the index as reactive property.
/// @function resetArrayFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @param {bool} [settings.preserveReference=true] - Should the array be overridden (faster) or spliced (slower) to preserve references? Beware: overriding breaks reactivity.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element"}], nameOfIndex: {2:0}},
///    mutations: {
///    reset: resetArrayFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("reset", {elements: [{id: 3, name: "replacement"}]); //replace
/// store.commit("reset"); //empty
export const resetArrayFactory = function resetArrayFactory(settings={}) {
	const container = settings.container || "container";
	const index = settings.index || "index";
	const preserveReference = ("preserveReference" in settings) ? settings.preserveReference : true;
    
    return function generatedResetArray(state, data=[]) {
		helper.verifyIndexAndContainer(state, index, container);

		const theContainer = state[container];
		const elements = data.elements || [];

		(preserveReference) ? resetArrayPreserving(theContainer, elements) : resetArrayFast(state, container, elements);

		state[index] = {};
		for(let r=0, rr=theContainer.length; r<rr; r++) {
			state[index][theContainer[r].id] = r;
		}		
	}
}