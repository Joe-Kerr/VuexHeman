/** 
* @file
* @name vuex-heman
* @author Joe Kerr
* @description A collection of Vuex helper methods. You can import individual functions, import sets of functions by category (getters, mutations, actions) or the entire package (vuexHeman). There are two types of helper functions: factories and normal function. Factories take in some setup data and return a function or a set of functions. Normal function can just be assigned. 
* @example
import {crudContainer} from "vuex-heman"; 
import {getters, mutations, actions} from "vuex-heman"; 
import {vuexHeman} from "vuex-heman"; 
*/


import * as _getters from "./getters.js";
import * as _mutations from "./mutations.js";
import * as _actions from "./actions.js";

import _crudContainer from "./store.crudContainerFactory.js";

export const getters = _getters;
export const mutations = _mutations;
export const actions = _actions;

export const crudContainer = _crudContainer;

export const {getArrayElWIdxByIdFactory} = _getters;
export const {setPropVal, setProps, setArrayElPropsByIdFactory, addArrayElementFactory, removeArrayElementByIdFactory} = _mutations;
export const {passThruActionsFactory} = actions;

export const vuexHeman = {
	getters, 
	mutations,
	actions,

	crudContainer
}

export default vuexHeman;




