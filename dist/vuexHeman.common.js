module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "89b0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helper", function() { return helper; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var helper = {
  verifyIndexAndContainer: function verifyIndexAndContainer(state, indexName, containerName) {
    if (_typeof(state[indexName]) !== "object") {
      throw new Error("Index with name " + indexName + " is not an object in state.");
    }

    if (!(state[containerName] instanceof Array)) {
      throw new Error("Container with name " + containerName + " is not an array in state.");
    }
  }
};

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var getters_namespaceObject = {};
__webpack_require__.r(getters_namespaceObject);
__webpack_require__.d(getters_namespaceObject, "getArrayElWIdxByIdFactory", function() { return getArrayElWIdxByIdFactory; });
var mutations_namespaceObject = {};
__webpack_require__.r(mutations_namespaceObject);
__webpack_require__.d(mutations_namespaceObject, "setPropVal", function() { return setPropVal; });
__webpack_require__.d(mutations_namespaceObject, "setProps", function() { return setProps; });
__webpack_require__.d(mutations_namespaceObject, "setPropsOnObjectFactory", function() { return setPropsOnObjectFactory; });
__webpack_require__.d(mutations_namespaceObject, "setArrayElPropsByIdFactory", function() { return setArrayElPropsByIdFactory; });
__webpack_require__.d(mutations_namespaceObject, "addArrayElementFactory", function() { return addArrayElementFactory; });
__webpack_require__.d(mutations_namespaceObject, "removeArrayElementByIdFactory", function() { return removeArrayElementByIdFactory; });
__webpack_require__.d(mutations_namespaceObject, "resetArrayFactory", function() { return resetArrayFactory; });
var actions_namespaceObject = {};
__webpack_require__.r(actions_namespaceObject);
__webpack_require__.d(actions_namespaceObject, "passThruActionsFactory", function() { return passThruActionsFactory; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./projects/common/vuexHeman/src/getters.js
var _require = __webpack_require__("89b0"),
    helper = _require.helper;

function getArrayElWIdxById(container, index, noResult) {
  return function (id) {
    var idx = index[id];

    if (typeof idx !== "number") {
      return noResult;
    }

    return container[idx];
  };
} /// Factory function that can be adapted to your Vuex state and that returns a getter function. The getter returns the element with the id provided from the state's container.
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


var getArrayElWIdxByIdFactory = function getArrayElWIdxByIdFactory() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = settings.container || "container";
  var index = settings.index || "index";
  var noResult = "noResult" in settings ? settings.noResult : null;
  return function generatedGetArrayElWIdxById(state) {
    helper.verifyIndexAndContainer(state, index, container);
    return getArrayElWIdxById(state[container], state[index], noResult);
  };
};
// CONCATENATED MODULE: ./projects/common/vuexHeman/src/mutations.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var mutations_require = __webpack_require__("89b0"),
    mutations_helper = mutations_require.helper; /// The mutation sets a state property.
/// @function setPropVal
/// @throws Throws for undefined properties - after all valid properties have been set.
/// @example <caption>Using the factory function</caption>
/// { state: {propA: 1, propB: 2},
///    mutations: {
///    set: setPropVal
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {prop: "propA", val: 3});


var setPropVal = function setPropVal(state, data) {
  if (typeof data === "undefined" || !("prop" in data) || !("val" in data)) {
    throw new Error("Missing property on data parameter: provide 'prop' and 'val'.");
  }

  if (!(data.prop in state)) {
    throw new Error("Tried to set non-existing property: " + data.prop);
  }

  state[data.prop] = data.val;
}; /// Private function used by {@link setProps}, {@link setPropsOnObjectFactory}, {@link setArrayElPropsByIdFactory} to handle object (nested) and array property values.
/// @function setPropsHandleObject
/// @param {object} state - Vuex state object of mutation.
/// @param {object} data - Your data passed to the mutation.
/// @param {string} [data.arrOp=undefined] - The operation that should happen when a property value is an array. Available:<br>
/// - push: same as array.push<br>
/// - pop: same as array.pop<br>
/// - shift: same as array.shift<br>
/// - unshift: same as array.unshift<br>
/// - insert: value needs to be an object {value, element|index} where value is the actual value to insert and index or element the location to insert to<br>
/// - delete:  deletes value of array property<br>
/// @param {string} [data.objOp=undefined] - The operation that should happen when a property value is an object. Available: "recur" which sets object recursively.
/// @param {string} propName - Interal helper
/// @example
/// { state: {propA: 1, propB: {subPropC: 2, subPropD: 3}, propE: [1,2,3]},
///   mutations: { set: setProps
/// }
/// //...
/// store.commit("set", {propE: ["a", "b", "c"]} // replaces array of propE
/// store.commit("set", {propE: "four", arrOp: "push"}) // appends "four" to propE
/// store.commit("set", {propB: {subPropD: 4}, objOp: "recur"}) // sets subPropD to 4
/// store.commit("set", {propE: {value: 1.5, element: 2}, arrOp: "insert"}) // inserts 1.5 before 2 in propE array

function setPropsHandleObject(state, data, propName) {
  if (state[propName] instanceof Array && "arrOp" in data) {
    switch (data.arrOp) {
      case "push":
        state[propName].push(data[propName]);
        break;

      case "unshift":
        state[propName].unshift(data[propName]);
        break;

      case "pop":
        state[propName].pop();
        break;

      case "shift":
        state[propName].shift();
        break;

      case "insert":
        var insertDetails = data[propName];
        var array = state[propName];

        if (_typeof(insertDetails) !== "object") {
          throw new Error("Failed to insert: the property value must be an object with properties value and index or element.");
        }

        var value = insertDetails.value,
            index = insertDetails.index,
            element = insertDetails.element;

        if (typeof index !== "number" && element === undefined) {
          throw new Error("Failed to insert: either provide on the property value an index property (number) or an element to insert at.");
        }

        var i = typeof index === "number" ? index : array.indexOf(element);

        if (i > -1) {
          array.splice(i, 0, value);
        } else {
          throw new Error("Failed to insert: the element property to insert at does not exist in the array.");
        }

        break;

      case "delete":
        var i2 = state[propName].indexOf(data[propName]);

        if (i2 > -1) {
          state[propName].splice(i2, 1);
        } else {
          throw new Error("Failed to delete: the element to delete does not exist in the array.");
        }

        break;

      default:
        throw new Error("Unknown array operation provided: " + data.arrOp);
        break;
    }
  } else if (data.objOp === "recur") {
    setProps(state[propName], data[propName]);
  } else {
    state[propName] = data[propName];
  }
} /// The mutation sets state properties by key/val pairs on the data parameter. See {@link setPropsHandleObject} how object/array values can be handled.
/// @function setProps
/// @throws Throws for undefined properties - after all valid properties have been set.
/// @example <caption>Using the factory function</caption>
/// { state: {propA: 1, propB: 2},
///    mutations: {
///    set: setProps
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {propA: 2, propB: 3});


var setProps = function setProps(state, data) {
  var err = [];

  for (var prop in data) {
    if (prop === "arrOp" || prop === "objOp") {
      continue;
    }

    ;

    if (!(prop in state)) {
      err.push(prop);
      continue;
    }

    if (_typeof(state[prop]) !== "object") {
      state[prop] = data[prop];
    } else {
      setPropsHandleObject(state, data, prop);
    }
  }

  if (err.length > 0) {
    throw new Error("Tried to set at least one non-existing property: " + err.join(","));
  }
}; /// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation sets the properties of an object on the state. See {@link setPropsHandleObject} how object/array values can be handled.
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

var setPropsOnObjectFactory = function setPropsOnObjectFactory() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var object = settings.object;

  if (object === undefined) {
    throw new Error("Missing mandatory settings parameter 'setting.object'");
  }

  return function generatedSetPropsOnObject(state, data) {
    if (!(object in state)) {
      throw new Error("The object with the name on the state does not exist: " + object);
    }

    setProps(state[object], data);
  };
};

function setArrayElPropsById(container, index, props) {
  var id = props.id;

  if (typeof id === "undefined") {
    throw new Error("Missing id on data parameter.");
  }

  var idx = index[id];

  if (typeof idx === "undefined") {
    throw new Error("Id not found in index while setting prop/s on element: " + JSON.stringify(props));
  }

  var el = container[idx];
  delete props.id;
  setProps(el, props);
} /// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation sets the properties of an element within an array to the given values. See {@link setPropsHandleObject} how object/array values can be handled.
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


var setArrayElPropsByIdFactory = function setArrayElPropsByIdFactory() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = settings.container || "container";
  var index = settings.index || "index";
  return function generatedSetArrayElPropsById(state, data) {
    mutations_helper.verifyIndexAndContainer(state, index, container);
    setArrayElPropsById(state[container], state[index], data);
  };
}; /// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation adds an element to an array. 
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

var addArrayElementFactory = function addArrayElementFactory() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = settings.container || "container";
  var index = settings.index || "index";
  return function generatedAddArrayElement(state, data) {
    mutations_helper.verifyIndexAndContainer(state, index, container);

    if (!("id" in data)) {
      throw new Error("Failed to add element because it has no id: " + JSON.stringify(data));
    }

    var newIdx = state[container].push(data) - 1;
    state[index][data.id] = newIdx;
  };
}; /// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation removes an element from an array. 
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

var removeArrayElementByIdFactory = function removeArrayElementByIdFactory() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = settings.container || "container";
  var index = settings.index || "index";
  return function generatedRemoveArrayElementById(state, data) {
    mutations_helper.verifyIndexAndContainer(state, index, container);
    var id = data.id;
    var theContainer = state[container];
    var i = state[index][id];

    if (theContainer[i] === undefined) {
      throw new Error("Delete failed. Tried to remove id from undefined index: " + i);
    }

    theContainer.splice(i, 1);
    delete state[index][id];

    for (var r = i, rr = theContainer.length; r < rr; r++) {
      state[index][theContainer[r].id] = r;
    }
  };
};

function resetArrayFast(state, containerName, elements) {
  state[containerName] = elements;
}

function resetArrayPreserving(container, elements) {
  container.splice(0, container.length);
  container.push.apply(container, _toConsumableArray(elements));
} /// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation empties or replaces the container array. 
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


var resetArrayFactory = function resetArrayFactory() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var container = settings.container || "container";
  var index = settings.index || "index";
  var preserveReference = "preserveReference" in settings ? settings.preserveReference : true;
  return function generatedResetArray(state) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    mutations_helper.verifyIndexAndContainer(state, index, container);
    var theContainer = state[container];
    var elements = data.elements || [];
    preserveReference ? resetArrayPreserving(theContainer, elements) : resetArrayFast(state, container, elements);
    state[index] = {};

    for (var r = 0, rr = theContainer.length; r < rr; r++) {
      state[index][theContainer[r].id] = r;
    }
  };
};
// CONCATENATED MODULE: ./projects/common/vuexHeman/src/actions.js
function actions_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { actions_typeof = function _typeof(obj) { return typeof obj; }; } else { actions_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return actions_typeof(obj); }

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
var passThruActionsFactory = function passThruActionsFactory(names) {
  if (typeof names === "string") {
    return function generatedPassThruAction(store, data, options) {
      store.commit(names, data, options);
    };
  }

  if (names instanceof Array) {
    var obj = {};
    names.forEach(function (name) {
      if (typeof name !== "string") {
        throw new Error("Expected element of array to be of type string. Got: " + actions_typeof(name));
      }

      obj[name] = function generatedPassThruAction(store, data, options) {
        store.commit(name, data, options);
      };
    });
    return obj;
  }

  if (actions_typeof(names) === "object") {
    var _loop = function _loop(name) {
      var methodName = name;
      var commandName = names[name];

      names[methodName] = function generatedPassThruAction(store, data, options) {
        store.commit(commandName, data, options);
      };
    };

    for (var name in names) {
      _loop(name);
    }

    return names;
  }

  throw new Error("Expected parameter to be of type string, object or array. Got: " + actions_typeof(names));
};
// CONCATENATED MODULE: ./projects/common/vuexHeman/src/store.crudContainerFactory.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var id = 1; /// The factory returns a store module preset. The preset contains a container array intended to hold elements as well as associated CRUD functions.
/// Notice that keeping the default names of store components for non-namespaced containers will result in duplicate commit/dispatch calls. Make sure to provide unique names to non-namespaced modules.
/// @function crudContainerFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @param {string} [settings.adderName="add"] - The name of the action/mutation that adds an element.
/// @param {string} [settings.getterName="getById"] - The name of the action/mutation that gets an element.
/// @param {string} [settings.setterName="set"] - The name of the action/mutation that sets a property of an element.
/// @param {string} [settings.deleterName="delete"] - The name of the action/mutation that deletes an element.
/// @param {string} [settings.resetterName="reset"] - The name of the action/mutation that resets the element container.
/// @param {string} [settings.getNextIdName="getNextId"] - The name of the getter that returns the next free id.
/// @param {bool} [settings.namespaced=true] - Vuex "namespaced" property.
/// @param {object} settings.extend - A Vuex store object (state, getters, mutations and/or actions) that extends the CRUD container. 
/// @returns {object} - A Vuex store object. 

function crudContainerFactory() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  console.warn("Experimental. Do not use in production.");
  var namespaced = "namespaced" in settings ? settings.namespaced : true;
  var container = settings.container || "container";
  var index = settings.index || "index";
  var adderName = settings.adderName || "add";
  var getterName = settings.getterName || "getById";
  var setterName = settings.setterName || "set";
  var deleterName = settings.deleterName || "delete";
  var resetterName = settings.resetterName || "reset";
  var getNextIdName = settings.getNextIdName || "getNextId";
  var incrementIdName = "incrementId" + id;
  var nextIdName = "nextId" + id;
  id++;
  var extend = settings.extend || {};
  var actionsMap = {};
  actionsMap[setterName] = setterName;
  actionsMap[deleterName] = deleterName;
  var store = {
    namespaced: namespaced,
    state: {},
    getters: {},
    mutations: {},
    actions: {}
  };
  store.state[container] = [];
  store.state[index] = {};
  store.state[nextIdName] = 1;
  store.getters[getterName] = getArrayElWIdxByIdFactory({
    container: container,
    index: index
  });

  store.getters[getNextIdName] = function generatedGetNextId(state) {
    return state[nextIdName];
  };

  store.mutations[adderName] = addArrayElementFactory({
    container: container,
    index: index
  });
  store.mutations[setterName] = setArrayElPropsByIdFactory({
    container: container,
    index: index
  });
  store.mutations[deleterName] = removeArrayElementByIdFactory({
    container: container,
    index: index
  });
  store.mutations[resetterName] = resetArrayFactory({
    container: container,
    index: index
  });

  store.mutations[incrementIdName] = function incrementId(state, data) {
    if (typeof data !== "undefined" && "baseId" in data) {
      state[nextIdName] = data.baseId;
    }

    state[nextIdName]++;
  };

  store.actions = _objectSpread({}, passThruActionsFactory(actionsMap));

  store.actions[adderName] = function generatedAdderAction(store, element) {
    element.id = store.state[nextIdName];
    store.commit(adderName, element);
    store.commit(incrementIdName); //return store.getters.getElementById(element.id);

    return element;
  };

  store.actions[resetterName] = function generatedResetterAction(store) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var maxId = 0;

    if ("elements" in data) {
      data.elements.forEach(function (el) {
        if (el.id > maxId) {
          maxId = el.id;
        }
      });

      if (typeof maxId !== "number" || isNaN(maxId)) {
        maxId = 0;
      }
    }

    store.commit(incrementIdName, {
      baseId: maxId
    });
    store.commit(resetterName, data);
  };

  if ("state" in extend) {
    Object.assign(store.state, extend.state);
  }

  if ("getters" in extend) {
    Object.assign(store.getters, extend.getters);
  }

  if ("mutations" in extend) {
    Object.assign(store.mutations, extend.mutations);
  }

  if ("actions" in extend) {
    Object.assign(store.actions, extend.actions);
  }

  return store;
}
// CONCATENATED MODULE: ./projects/common/vuexHeman/src/actions.visitor.js
function recur(modules, callback, namespace) {
  for (var moduleName in modules) {
    if (moduleName === "storeVisitor") {
      continue;
    }

    var moduleMeta = modules[moduleName];
    var moduleObject = moduleMeta._rawModule || {};
    var moduleChildren = moduleMeta._children; //const isDynamic = moduleMeta.runtime;

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

    var NS = namespace;

    if (moduleName === "root") {
      NS = "";
    } else if (moduleObject.namespaced === true) {
      NS = namespace + "/" + moduleName;
    }

    if (NS[0] === "/") {
      NS = NS.substring(1, NS.length);
    } //callback(readOnlyModules, namespace, {isDynamic});


    callback(moduleObject, NS);
    recur(moduleChildren, callback, NS); //#todo iterates over root prototype methods, cannot use hasOwnProperty because _children dont have it wtf???

    if (moduleName === "root") {
      break;
    }
  }
}

function checkIsUserStoreObject() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if ("state" in obj || "getters" in obj || "mutations" in obj || "actions" in obj) {
    return true;
  }

  return false;
}

function checkIsVuexInstance() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  ["state", "getters", "commit", "dispatch"].forEach(function (required) {
    if (!(required in obj)) {
      return false;
    }
  });

  if (!("_modules" in obj) && !("root" in obj._modules) && !("_children" in obj._modules.root)) {
    throw new Error("The Vuex instance provided has an incorrect interface to read store modules from. ");
  }

  return true;
}

function getStoreObject(rawObject) {
  if (checkIsVuexInstance(rawObject)) {
    return rawObject._modules.root._children;
  } else if (checkIsUserStoreObject(rawObject)) {
    return rawObject;
  }

  throw new Error("The store visitor received an unknown store object: provide a Vuex instance or the raw store object.");
} /// Store visitor recurs over each of your Vuex modules (including root) and allows you to build queries such as "call each init action on every module".
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


function storeVisitor(storeObj, callback) {
  if (typeof callback !== "function") {
    throw new Error("The second parameter of the store visitor needs to be a function.");
  }

  var store = storeObj; //getStoreObject(storeObj);

  recur(store._modules, callback, "");
}
// CONCATENATED MODULE: ./projects/common/vuexHeman/src/index.js
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





var getters = getters_namespaceObject;
var mutations = mutations_namespaceObject;
var actions = actions_namespaceObject;
actions.storeVisitor = storeVisitor;
var crudContainer = crudContainerFactory;
var src_getArrayElWIdxByIdFactory = getArrayElWIdxByIdFactory;

var src_setPropVal = setPropVal,
    src_setProps = setProps,
    src_setArrayElPropsByIdFactory = setArrayElPropsByIdFactory,
    src_setPropsOnObjectFactory = setPropsOnObjectFactory,
    src_addArrayElementFactory = addArrayElementFactory,
    src_removeArrayElementByIdFactory = removeArrayElementByIdFactory,
    src_resetArrayFactory = resetArrayFactory;

var src_passThruActionsFactory = actions.passThruActionsFactory,
    src_storeVisitor = actions.storeVisitor;

var vuexHeman = {
  getters: getters,
  mutations: mutations,
  actions: actions,
  crudContainer: crudContainer
};
/* harmony default export */ var src = (vuexHeman);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport getters */__webpack_require__.d(__webpack_exports__, "getters", function() { return getters; });
/* concated harmony reexport mutations */__webpack_require__.d(__webpack_exports__, "mutations", function() { return mutations; });
/* concated harmony reexport actions */__webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* concated harmony reexport crudContainer */__webpack_require__.d(__webpack_exports__, "crudContainer", function() { return crudContainer; });
/* concated harmony reexport getArrayElWIdxByIdFactory */__webpack_require__.d(__webpack_exports__, "getArrayElWIdxByIdFactory", function() { return src_getArrayElWIdxByIdFactory; });
/* concated harmony reexport setPropVal */__webpack_require__.d(__webpack_exports__, "setPropVal", function() { return src_setPropVal; });
/* concated harmony reexport setProps */__webpack_require__.d(__webpack_exports__, "setProps", function() { return src_setProps; });
/* concated harmony reexport setArrayElPropsByIdFactory */__webpack_require__.d(__webpack_exports__, "setArrayElPropsByIdFactory", function() { return src_setArrayElPropsByIdFactory; });
/* concated harmony reexport setPropsOnObjectFactory */__webpack_require__.d(__webpack_exports__, "setPropsOnObjectFactory", function() { return src_setPropsOnObjectFactory; });
/* concated harmony reexport addArrayElementFactory */__webpack_require__.d(__webpack_exports__, "addArrayElementFactory", function() { return src_addArrayElementFactory; });
/* concated harmony reexport removeArrayElementByIdFactory */__webpack_require__.d(__webpack_exports__, "removeArrayElementByIdFactory", function() { return src_removeArrayElementByIdFactory; });
/* concated harmony reexport resetArrayFactory */__webpack_require__.d(__webpack_exports__, "resetArrayFactory", function() { return src_resetArrayFactory; });
/* concated harmony reexport passThruActionsFactory */__webpack_require__.d(__webpack_exports__, "passThruActionsFactory", function() { return src_passThruActionsFactory; });
/* concated harmony reexport storeVisitor */__webpack_require__.d(__webpack_exports__, "storeVisitor", function() { return src_storeVisitor; });
/* concated harmony reexport vuexHeman */__webpack_require__.d(__webpack_exports__, "vuexHeman", function() { return vuexHeman; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });