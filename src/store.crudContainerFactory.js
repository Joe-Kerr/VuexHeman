import {getArrayElWIdxByIdFactory} from "./getters.js";
import {setArrayElPropsByIdFactory, addArrayElementFactory, removeArrayElementByIdFactory} from "./mutations";
import {passThruActionsFactory} from "./actions";


export default (settings={}) => {
    console.warn("Experimental. Do not use in production.");

    const namespaced = ("namespaced" in settings) ? settings.namespaced : true;

	const container = settings.container || "container";
    const index = settings.index || "index";
    const adderName = settings.adderName || "add";    
    const getterName = settings.getterName || "getById";    
    const setterName = settings.setterName || "set";  
    const deleterName = settings.deleterName || "delete"; 
    
    const extend = settings.extend || {};

    const actionsMap = {};
    actionsMap[setterName] = setterName;
    actionsMap[deleterName] = deleterName;

    const store = {namespaced, state: {}, getters: {}, mutations: {}, actions: {}};

    store.state[container] = [];
    store.state[index] = {};
    store.state.nextId = 1;

    store.getters[getterName] = getArrayElWIdxByIdFactory({container, index});

    store.mutations[adderName] = addArrayElementFactory({container, index});
    store.mutations[setterName] = setArrayElPropsByIdFactory({container, index});
    store.mutations[deleterName] = removeArrayElementByIdFactory({container, index});
    store.mutations.incrementId = function incrementId(state) {state.nextId++;};

    store.actions = {...passThruActionsFactory(actionsMap)};
    store.actions[adderName] = function generatedAdderAction(store, element) {
        element.id = store.state.nextId;

        store.commit(adderName, element);
        store.commit("incrementId");

        //return store.getters.getElementById(element.id);
        return element;
    } 

    if("state" in extend) {Object.assign(store.state, extend.state);}
    if("getters" in extend) {Object.assign(store.getters, extend.getters);}
    if("mutations" in extend) {Object.assign(store.mutations, extend.mutations);}
    if("actions" in extend) {Object.assign(store.actions, extend.actions);}

    return store;
}