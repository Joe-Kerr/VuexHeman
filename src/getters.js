const {helper} = require("./common.js");

function getArrayElWIdxById(container, index, noResult) {
	return (id) => {
		const idx = index[id];
		
		if(typeof idx !== "number") {
			return noResult;
		}

		return container[idx];
	}
}

/// Factory function that can be adapted to your Vuex state and that returns a getter function. The getter returns the element with the id provided from the state's container.
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// @function getArrayElWIdxByIdFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @param {var} [settings.noResult=null] - Return this value if id is not found.
/// @returns {var} - Returns null or a user provided value.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element", data: 123}], nameOfIndex: {2:0}},
///    getters: {
///    getElementById: getArrayElWIdxByIdFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the getter</caption>
/// store.getters.getElementById(2);
export const getArrayElWIdxByIdFactory = function getArrayElWIdxByIdFactory(settings={}) {
	const container = settings.container || "container";
	const index = settings.index || "index";
	const noResult = ("noResult" in settings) ? settings.noResult : null;
	
	return function generatedGetArrayElWIdxById(state) {
		helper.verifyIndexAndContainer(state, index, container);
		return getArrayElWIdxById(state[container], state[index], noResult);
	}
}