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