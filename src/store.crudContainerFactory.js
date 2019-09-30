import {getArrayElWIdxByIdFactory} from "./getters.js";
import {setArrayElPropsByIdFactory, addArrayElementFactory, removeArrayElementByIdFactory, resetArrayFactory} from "./mutations";
import {passThruActionsFactory} from "./actions";

let id = 1;

/// The factory returns a store module preset. The preset contains a container array intended to hold elements as well as associated CRUD functions.
/// @function crudContainerFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @param {string} [settings.adderName="add"] - The name of the action/mutation that adds an element.
/// @param {string} [settings.getterName="getById"] - The name of the action/mutation that gets an element.
/// @param {string} [settings.setterName="set"] - The name of the action/mutation that sets a property of an element.
/// @param {string} [settings.deleterName="delete"] - The name of the action/mutation that deletes an element.
/// @param {string} [settings.resetterName="reset"] - The name of the action/mutation that resets the element container.
/// @param {bool} [settings.namespaced=true] - Vuex "namespaced" property.
/// @param {object} settings.extend - A Vuex store object (state, getters, mutations and/or actions) that extends the CRUD container. 
/// @returns {object} - A Vuex store object. 
export default function crudContainerFactory(settings={}) {
    console.warn("Experimental. Do not use in production.");

    const namespaced = ("namespaced" in settings) ? settings.namespaced : true;

	const container = settings.container || "container";
    const index = settings.index || "index";
    const adderName = settings.adderName || "add";    
    const getterName = settings.getterName || "getById";    
    const setterName = settings.setterName || "set";  
    const deleterName = settings.deleterName || "delete"; 
    const resetterName = settings.resetterName || "reset";

    const incrementIdName = "incrementId"+id;
    const nextIdName = "nextId"+id;
    id++;
    
    const extend = settings.extend || {};

    const actionsMap = {};
    actionsMap[setterName] = setterName;
    actionsMap[deleterName] = deleterName;

    const store = {namespaced, state: {}, getters: {}, mutations: {}, actions: {}};

    store.state[container] = [];
    store.state[index] = {};
    store.state[nextIdName] = 1;

    store.getters[getterName] = getArrayElWIdxByIdFactory({container, index});

    store.mutations[adderName] = addArrayElementFactory({container, index});
    store.mutations[setterName] = setArrayElPropsByIdFactory({container, index});
    store.mutations[deleterName] = removeArrayElementByIdFactory({container, index});
    store.mutations[resetterName] = resetArrayFactory({container, index});
    store.mutations[incrementIdName] = function incrementId(state) {state[nextIdName]++;};

    store.actions = {...passThruActionsFactory(actionsMap)};
    store.actions[adderName] = function generatedAdderAction(store, element) {
        element.id = store.state[nextIdName];

        store.commit(adderName, element);
        store.commit(incrementIdName);

        //return store.getters.getElementById(element.id);
        return element;
    } 

    if("state" in extend) {Object.assign(store.state, extend.state);}
    if("getters" in extend) {Object.assign(store.getters, extend.getters);}
    if("mutations" in extend) {Object.assign(store.mutations, extend.mutations);}
    if("actions" in extend) {Object.assign(store.actions, extend.actions);}

    return store;
}