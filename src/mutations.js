const {helper} = require("./common.js");

export const setPropVal = function setPropVal(state, data) {	
	if(typeof data === "undefined" || !("prop" in data) || !("val" in data)) {
		throw new Error("Missing property on data parameter: provide 'prop' and 'val'.");
	}
	
	if(!(data.prop in state)) {
		throw new Error("Tried to set non-existing property: "+data.prop);
	}
	
	state[data.prop] = data.val;
}

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

export const setArrayElPropsByIdFactory = function setArrayElPropsByIdFactory(settings={}) {
	const container = settings.container || "container";
	const index = settings.index || "index";
	
	return function generatedSetArrayElPropsById(state, data) {			
		helper.verifyIndexAndContainer(state, index, container);	
		setArrayElPropsById(state[container], state[index], data);
	}	
}

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

export const removeArrayElementByIdFactory = function removeArrayElementByIdFactory(settings={}) {
	const container = settings.container || "container";
    const index = settings.index || "index";
    
    return function generatedRemoveArrayElementById(state, id) {
        helper.verifyIndexAndContainer(state, index, container);
		
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