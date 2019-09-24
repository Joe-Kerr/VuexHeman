/// The factory returns simple 'passthrough' actions that only call mutations.
/// @function passThruActionsFactory
/// @param {(string|string[]|object)} names - A single name of an action/commit, an array of action/commit names or an object of action name/commit name pairs.
/// @returns {(function|object)} - Returns an action function (if param string) or an object of functions (if param object/array).
/// @example <caption>Using the factory function</caption>
/// { state: {propA: 1, propB: 2},
///    actions: {
///    anAction: passThruActionsFactory("doSth"),
///    ...passThruActionsFactory(["doA", "doB"]),
///    ...passThruActionsFactory({actionA: "commitB"})
/// }}
/// @example <caption>Equivalent - parameter string</caption>
/// passThruActionsFactory("doSth")
/// doSth(store, data, options) {store.commit("doSth", data, options);}
/// @example <caption>Equivalent - parameter array</caption>
/// passThruActionsFactory(["doA", "doB"])
/// doA(store, data, options) {store.commit("doA", data, options);},
/// doB(store, data, options) {store.commit("doB", data, options);}
/// @example <caption>Equivalent - parameter object</caption>
/// passThruActionsFactory({actionA: "commitA"})
/// actionA(store, data, options) {store.commit("commitA", data, options);}
export const passThruActionsFactory = function passThruActionsFactory(names) {
	
	if(typeof names === "string") {
		return function generatedPassThruAction(store, data, options) {
			store.commit(names, data, options);
		}
	}
	
	if(names instanceof Array) {
		const obj = {};
		names.forEach((name)=>{			
			if(typeof name !== "string") {
				throw new Error("Expected element of array to be of type string. Got: "+typeof name);
			}
			obj[name] = function generatedPassThruAction(store, data, options) {
				store.commit(name, data, options);
			}			
		});
		return obj;
	}
	
	if(typeof names === "object") {
		for(const name in names) {
			const methodName = name;
			const commandName = names[name];			
			names[methodName] = function generatedPassThruAction(store, data, options) {
				store.commit(commandName, data, options);
			}
		}	
		return names;
	}
	
	throw new Error("Expected parameter to be of type string, object or array. Got: "+typeof names);
}