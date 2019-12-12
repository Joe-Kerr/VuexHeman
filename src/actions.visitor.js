function recur(modules, callback, namespace) {
	for(const moduleName in modules) {		
		if(moduleName === "storeVisitor") { continue; }
		
		const moduleMeta = modules[moduleName];
		
		const moduleObject = moduleMeta._rawModule || {};
		const moduleChildren = moduleMeta._children;
		//const isDynamic = moduleMeta.runtime;

		/*
		const readOnlyModules = {
			namespaced: moduleObject.namespaced 
		};
		
		if("getters" in moduleObject) {
			readOnlyModules.getters = Object.keys(moduleObject.getters);
		}	
		
		if("mutations" in moduleObject) {
			readOnlyModules.mutations = Object.keys(moduleObject.mutations);
		}
		
		if("actions" in moduleObject) {
			readOnlyModules.actions = Object.keys(moduleObject.actions);
		}
		*/
		let NS = namespace;
		
		if(moduleName === "root") {
			NS = "";
		}
		else if(moduleObject.namespaced === true) {
			NS = namespace + "/" + moduleName;
		}
		
		if(NS[0] === "/") {
			NS = NS.substring(1, NS.length);
		}	

		//callback(readOnlyModules, namespace, {isDynamic});
		callback(moduleObject, NS);	
		
		recur(moduleChildren, callback, NS);
		
		//#todo iterates over root prototype methods, cannot use hasOwnProperty because _children dont have it wtf???
		if(moduleName === "root") {
			break;
		}
	}
}

function checkIsUserStoreObject(obj={}) {
	if("state" in obj || "getters" in obj || "mutations" in obj || "actions" in obj) {
		return true;
	}
	
	return false;
}

function checkIsVuexInstance(obj={}) {
	["state", "getters", "commit", "dispatch"].forEach((required)=>{
		if(!(required in obj)) {
			return false;
		}
	});
	
	if(!("_modules" in obj) && !("root" in obj._modules) && !("_children" in obj._modules.root)) {
		throw new Error("The Vuex instance provided has an incorrect interface to read store modules from. ");
	}
	return true;
}

function getStoreObject(rawObject) {
	if(checkIsVuexInstance(rawObject)) {
		return rawObject._modules.root._children;
	}
	
	else if(checkIsUserStoreObject(rawObject)) {
		return rawObject
	}
	
	throw new Error("The store visitor received an unknown store object: provide a Vuex instance or the raw store object.");
}

/// Store visitor recurs over each of your Vuex modules (including root) and allows you to build queries such as "call each init action on every module".
/// <strong>Experimental</strong>: Currently, maybe too high level and exposes stuff which it probably should not. Treat callback params read-only, expect interface changes.
/// @function storeVisitor
/// @param {object} storeObj - The Vuex instance. Make sure to call storeVisitor after all dynamic modules have been registered.
/// @param {function(object, string):undefined} callback - Callback(module, namespace) visiting each store module providing the current module and the namespace chain, if any.
/// @returns {undefined}
/// @example
/// const store = new Vuex.Store();
///	store.registerModule("storeVisitor", {actions: {
///	   storeVisitor: function(storeParams, callback) {
///     storeVisitor(store, callback);
///    }			
/// }});
///
/// //calls all init actions
/// store.dispatch("storeVisitor", function callback(module, namespace) { 
///   if("actions" in module && "init" in module.actions) { store.dispatch(namespace+"/"+init); } 
/// })
export function storeVisitor(storeObj, callback) {
	
	if(typeof callback !== "function") {
		throw new Error("The second parameter of the store visitor needs to be a function.");
	}
	
	const store = storeObj;//getStoreObject(storeObj);
	
	
	recur(store._modules, callback, "");
}