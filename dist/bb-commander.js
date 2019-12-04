// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/pallet-commands/CMDR_resetFn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CMDR_resetFn;

function CMDR_resetFn() {
  document.querySelectorAll(".fl-builder-settings-fields input, .fl-builder-settings-fields select").forEach(function (input) {
    if (input.style.display === "none") {
      return null;
    }

    if (input.name == "visibility_display") {
      return null;
    }

    if (input.tagName == "INPUT") {
      input.value = "";

      if (input.classList.contains("text-full") && input.name !== "id" && input.name !== "class") {
        input.value = "edit" + input.name;
      }
    } else if (input.tagName == "SELECT") {
      if (input.name === "tag") {
        return null;
      }

      if (input.name === "full_height") {
        input.value = "default";
        console.log(input.value);
      }

      var option = input.querySelector("option");
      input.value = option && option.value; //incase their are no options
    } else {
      return;
    }
  });

  FLBuilder._saveSettings();
}
},{}],"scripts/pallet-commands/CMD_marginsZero.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CMD_marginsZero;

function CMD_marginsZero() {
  document.querySelectorAll(".fl-builder-settings-fields #fl-field-margin input[type=number]").forEach(function (input) {
    input.value = "0";
  });

  FLBuilder._saveSettings();
}
},{}],"scripts/pallet-commands/resetOpenModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  document.querySelectorAll(".fl-builder-settings-fields input, \n        .fl-builder-settings-fields select").forEach(function (input) {
    if (input.tagName == "INPUT") {
      if (input.type == "hidden") {
        return;
      }

      input.value = " ";

      if (input.classList.contains("text-full")) {
        //looks for headings or small text
        input.value = "default text";
      }
    } else {
      if (input.name == "visibility_display") {
        return;
      }

      var option = input.querySelector("option");
      input.value = option.value;
    }
  });

  FLBuilder._saveSettings();
}
},{}],"scripts/util/CMDR_renderAllModulesSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CMDR_renderAllModuleSettings;

function CMDR_renderAllModuleSettings(modulesArray, cb, increment) {
  var module = modulesArray[increment];
  increment++;
  var nodeId = module.dataset.node;
  FLBuilderSettingsForms.render({
    id: "".concat(module.dataset.type),
    nodeId: nodeId,
    className: "fl-builder-module-settings  fl-builder-".concat(module.dataset.type, "-settings"),
    attrs: 'data-node="' + nodeId + "\" data-type=".concat(module.dataset.type, " novalidate=\"novalidate\" "),
    buttons: ["save"],
    settings: FLBuilderSettingsConfig.nodes[nodeId],
    type: "module",
    preview: {
      type: "".concat(module.dataset.type)
    }
  }, function () {
    //recursively calls itself to loop through all the array in order
    cb();

    if (modulesArray.length <= increment) {
      console.log("done");
      return;
    } else {
      CMDR_renderAllModuleSettings(modulesArray, cb, increment);
    }
  });
}
},{}],"scripts/pallet-commands/resetAllModules.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _CMDR_renderAllModulesSettings = _interopRequireDefault(require("../util/CMDR_renderAllModulesSettings"));

var _CMDR_resetFn = _interopRequireDefault(require("./CMDR_resetFn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _default() {
  var modules = _toConsumableArray(document.querySelectorAll(".fl-module"));

  var i = 0;
  (0, _CMDR_renderAllModulesSettings.default)(modules, _CMDR_resetFn.default, i);
}
},{"../util/CMDR_renderAllModulesSettings":"scripts/util/CMDR_renderAllModulesSettings.js","./CMDR_resetFn":"scripts/pallet-commands/CMDR_resetFn.js"}],"scripts/pallet-commands/marginsZeroOpenModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  document.querySelectorAll(".fl-builder-settings-fields #fl-field-margin input[type=number]").forEach(function (input) {
    input.value = "0";
  });

  FLBuilder._saveSettings();
}
},{}],"scripts/pallet-commands/marginZeroAllModules.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _CMDR_renderAllModulesSettings = _interopRequireDefault(require("../util/CMDR_renderAllModulesSettings"));

var _CMD_marginsZero = _interopRequireDefault(require("./CMD_marginsZero"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _default() {
  var modules = _toConsumableArray(document.querySelectorAll(".fl-module"));

  var i = 0;
  (0, _CMDR_renderAllModulesSettings.default)(modules, _CMD_marginsZero.default, i);
}
},{"../util/CMDR_renderAllModulesSettings":"scripts/util/CMDR_renderAllModulesSettings.js","./CMD_marginsZero":"scripts/pallet-commands/CMD_marginsZero.js"}],"scripts/util/CMDR_renderAllRowSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CMDR_renderAllRowSettings;

function CMDR_renderAllRowSettings(modulesArray, cb, increment) {
  var module = modulesArray[increment];
  increment++;
  var nodeId = module.dataset.node;
  FLBuilderSettingsForms.render({
    id: "row",
    nodeId: nodeId,
    className: "fl-builder-col-settings",
    attrs: 'data-node="' + nodeId + "\" ",
    buttons: ["save"],
    settings: FLBuilderSettingsConfig.nodes[nodeId],
    preview: {
      type: "row"
    }
  }, function () {
    //recursively calls itself to loop through all the array in order
    cb();

    if (modulesArray.length <= increment) {
      console.log("done");
      return;
    } else {
      CMDR_renderAllRowSettings(modulesArray, cb, increment);
    }
  });
}
},{}],"scripts/pallet-commands/resetAllRows.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _CMDR_resetFn = _interopRequireDefault(require("./CMDR_resetFn"));

var _CMDR_renderAllRowSettings = _interopRequireDefault(require("../util/CMDR_renderAllRowSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  var rows = document.querySelectorAll(".fl-row");
  var i = 0;
  (0, _CMDR_renderAllRowSettings.default)(rows, _CMDR_resetFn.default, i);
}
},{"./CMDR_resetFn":"scripts/pallet-commands/CMDR_resetFn.js","../util/CMDR_renderAllRowSettings":"scripts/util/CMDR_renderAllRowSettings.js"}],"scripts/pallet-commands/resetText.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

//! this dont work!!
function _default() {
  var iframe = document.querySelector(".fl-builder-settings-section-content .mce-edit-area iframe");
  iframe.contentWindow.document.body.innerHTML = "";
}
},{}],"scripts/util/CMDR_renderAllColumnSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CMDR_renderAllColumnSettings;

function CMDR_renderAllColumnSettings(modulesArray, cb, increment) {
  var module = modulesArray[increment];
  increment++;
  var nodeId = module.dataset.node;
  FLBuilderSettingsForms.render({
    id: "col",
    nodeId: nodeId,
    className: "fl-builder-col-settings",
    attrs: 'data-node="' + nodeId + "\" ",
    buttons: ["save"],
    settings: FLBuilderSettingsConfig.nodes[nodeId],
    preview: {
      type: "col"
    }
  }, function () {
    //recursively calls itself to loop through all the array in order
    cb();

    if (modulesArray.length <= increment) {
      console.log("done");
      return;
    } else {
      CMDR_renderAllColumnSettings(modulesArray, cb, increment);
    }
  });
}
},{}],"scripts/pallet-commands/resetAllColumns.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _CMDR_resetFn = _interopRequireDefault(require("./CMDR_resetFn"));

var _CMDR_renderAllColumnSettings = _interopRequireDefault(require("../util/CMDR_renderAllColumnSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  var columns = document.querySelectorAll(".fl-col");
  var i = 0;
  (0, _CMDR_renderAllColumnSettings.default)(columns, _CMDR_resetFn.default, i);
}
},{"./CMDR_resetFn":"scripts/pallet-commands/CMDR_resetFn.js","../util/CMDR_renderAllColumnSettings":"scripts/util/CMDR_renderAllColumnSettings.js"}],"scripts/util/CMDR_renderAllModuleSettingsWithArgs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CMDR_renderAllModuleSettingsWithArgs;

/**
 *
 * @param {NODELIST} modulesArray list of nodes that will be looped through
 * @param {FUNCTION} cb that is called after form is rendered
 * @param {INT} increment always zero
 * @param {STRING} inputName name of input that should be changed
 * @param {STRING} newValue new value of input
 */
function CMDR_renderAllModuleSettingsWithArgs(modulesArray, cb, increment, inputName, newValue) {
  var module = modulesArray[increment];
  increment++;
  var nodeId = module.dataset.node;
  FLBuilderSettingsForms.render({
    id: "".concat(module.dataset.type),
    nodeId: nodeId,
    className: "fl-builder-module-settings  fl-builder-".concat(module.dataset.type, "-settings"),
    attrs: 'data-node="' + nodeId + "\" data-type=".concat(module.dataset.type, " novalidate=\"novalidate\" "),
    buttons: ["save"],
    settings: FLBuilderSettingsConfig.nodes[nodeId],
    type: "module",
    preview: {
      type: "".concat(module.dataset.type)
    }
  }, function () {
    //recursively calls itself to loop through all the array in order
    cb(inputName, newValue);

    if (modulesArray.length <= increment) {
      console.log("done");
      return;
    } else {
      CMDR_renderAllModuleSettingsWithArgs(modulesArray, cb, increment, inputName, newValue);
    }
  });
}
},{}],"scripts/util/CMDR_changeFn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CMDR_changeFn;

function CMDR_changeFn(inputName, inputValue) {
  var form = document.querySelector(".fl-builder-settings-fields");
  form.querySelectorAll("".concat(inputName)).forEach(function (input) {
    input.value = inputValue;
  });

  FLBuilder._saveSettings();
}
},{}],"scripts/pallet-commands/initChangeAllModulesWithArgs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _CMDR_renderAllModuleSettingsWithArgs = _interopRequireDefault(require("../util/CMDR_renderAllModuleSettingsWithArgs"));

var _CMDR_changeFn = _interopRequireDefault(require("../util/CMDR_changeFn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  var inputName = document.querySelector(".inputName").value;
  var newValue = document.querySelector(".toValue").value;
  var modules = document.querySelectorAll(".fl-module");
  var i = 0;
  (0, _CMDR_renderAllModuleSettingsWithArgs.default)(modules, _CMDR_changeFn.default, i, inputName, newValue);
}
},{"../util/CMDR_renderAllModuleSettingsWithArgs":"scripts/util/CMDR_renderAllModuleSettingsWithArgs.js","../util/CMDR_changeFn":"scripts/util/CMDR_changeFn.js"}],"scripts/util/createArgForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createArgForm;

var _openPalette = require("../open-palette");

function createArgForm(inputNameClass, newValueClass, fnToListenFor) {
  var container = document.createElement("div");
  var inputName = document.createElement("input");
  var inputValue = document.createElement("input");
  var submitButton = document.createElement("BUTTON");
  container.classList.add("args-container");
  inputName.classList.add(inputNameClass);
  inputValue.classList.add(newValueClass);
  submitButton.classList.add("submit-args-button");
  inputName.setAttribute("placeholder", "inputs name");
  inputName.setAttribute("type", "text");
  inputValue.setAttribute("placeholder", "new value");
  inputValue.setAttribute("type", "text");
  submitButton.setAttribute("type", "button");
  submitButton.innerText = "RUN";
  container.appendChild(inputName);
  container.appendChild(inputValue);
  container.appendChild(submitButton);
  var palette = document.querySelector(".bb_cmdr_palette");
  palette.appendChild(container);
  submitButton.addEventListener("click", function () {
    fnToListenFor();
    (0, _openPalette.cleanupPalette)();
  });
  return;
}
},{"../open-palette":"scripts/open-palette.js"}],"scripts/open-palette.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanupPalette = cleanupPalette;

var _CMDR_resetFn = _interopRequireDefault(require("./pallet-commands/CMDR_resetFn"));

var _CMD_marginsZero = _interopRequireDefault(require("./pallet-commands/CMD_marginsZero"));

var _resetOpenModule = _interopRequireDefault(require("./pallet-commands/resetOpenModule"));

var _resetAllModules = _interopRequireDefault(require("./pallet-commands/resetAllModules"));

var _marginsZeroOpenModule = _interopRequireDefault(require("./pallet-commands/marginsZeroOpenModule"));

var _marginZeroAllModules = _interopRequireDefault(require("./pallet-commands/marginZeroAllModules"));

var _resetAllRows = _interopRequireDefault(require("./pallet-commands/resetAllRows"));

var _resetText = _interopRequireDefault(require("./pallet-commands/resetText"));

var _resetAllColumns = _interopRequireDefault(require("./pallet-commands/resetAllColumns"));

var _initChangeAllModulesWithArgs = _interopRequireDefault(require("./pallet-commands/initChangeAllModulesWithArgs"));

var _createArgForm = _interopRequireDefault(require("./util/createArgForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * function to create a form to add arguments to a function.
 * @param {STRING} inputNameClass class name of the input youll get the input name from
 * @param {STRING} newValueClass class name of the input you put your new value in
 */
function createPalette() {
  var el = document.createElement("div");
  var searchInput = document.createElement("input");
  var executeBtn = document.createElement("BUTTON");
  var datalist = document.createElement("DATALIST");
  el.classList.add("bb_cmdr_palette");
  executeBtn.setAttribute("type", "button");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("list", "commands");
  datalist.id = "commands";
  executeBtn.innerText = "Execute";
  var container = document.createElement("form");
  container.classList.add("bb_cmdr_container");
  container.appendChild(searchInput);
  container.appendChild(executeBtn);
  el.appendChild(container);
  el.appendChild(datalist);
  document.body.appendChild(el);
}

function hideCommandsSearch() {
  //hides the command search and execute button
  document.querySelector(".bb_cmdr_container").style.setProperty("display", "none");
}

var BBCommander = {
  /**
   * resets the open settings form.
   * to my defaults {empty string or default text}
   * or the first
   * option in a select
   */
  reset_Open_Module: {
    title: "reset Open Modules",
    fn: _resetOpenModule.default,
    description: "the open module settings input put will be set to a default",
    hasArgs: false
  },

  /**
   * resets all modules on a page to empty string or the first
   * option in a select
   */
  reset_All_Modules: {
    title: "Reset All Modules",
    description: "every module settings input put will be set to a default",
    fn: _resetAllModules.default,
    hasArgs: false
  },

  /*
   open modules will have 0 margins 
  */
  margins_Zero_Open_Module: {
    title: "Zero Margin Open Module",
    description: "the open module margins will be set to zero",
    fn: _marginsZeroOpenModule.default,
    hasArgs: false
  },

  /**
   *  All modules will have 0 margins
   */
  marginZeroAllModules: {
    title: "Zero Margin All Modules",
    fn: _marginZeroAllModules.default,
    description: "all modules margins will be set to zero",
    hasArgs: false
  },
  // resetText, //!this dont work */
  resetAllColumns: {
    title: "Reset All Columns",
    fn: _resetAllColumns.default,
    description: "every column settings input put will be set to a default",
    hasArgs: false
  },

  /**
   * resets all rows on a page to empty string or the first
   * option in a select
   */
  resetAllRows: {
    title: "Reset All Rows",
    fn: _resetAllRows.default,
    description: "every rows settings input put will be set to a default",
    hasArgs: false
  },

  /**
   * start of 2 step functions
   * or
   * functions with arguments
   */
  initChangeAllModulesWithArgs: {
    title: "Change All Modules with Custom Args",
    description: "give a selector and what value the input you select should have",
    fn: _initChangeAllModulesWithArgs.default,
    hasArgs: true
  }
};

function executeCommand(e) {
  e.preventDefault();
  var input = document.querySelector(".bb_cmdr_palette .bb_cmdr_container input");
  var commands = Object.keys(BBCommander);
  var selectedCommand = commands.find(function (cmd) {
    return BBCommander[cmd].title === input.value;
  });

  if (BBCommander[selectedCommand].hasArgs) {
    hideCommandsSearch();
    (0, _createArgForm.default)("inputName", "toValue", BBCommander[selectedCommand].fn);
  } else {
    BBCommander[selectedCommand].fn();
    cleanupPalette();
  }
}

var ALL_COMMANDS = Object.keys(BBCommander).map(function (key) {
  return _objectSpread({}, BBCommander[key]);
}); //this should eventually render select list like downshift

function showCommands() {
  var searchStr = this.value;
  var searchedCMDs = ALL_COMMANDS.filter(function (_ref) {
    var title = _ref.title,
        description = _ref.description;
    return searchStr === "" || title.toLowerCase().includes(searchStr.toLowerCase()) || description.toLowerCase().includes(searchStr.toLowerCase());
  });
  var list = searchedCMDs.map(function (cmd) {
    var item = "<option value=\"".concat(cmd.title, "\" >").concat(cmd.description, "</option>");
    return item;
  }).join("");
  var datalist = document.querySelector(".bb_cmdr_palette datalist");
  datalist.innerHTML = list;
}

function removeList() {
  document.querySelector(".bb_cmdr_palette input").value = "";
}

function removeListOnClick(e) {
  if (e.target.closest(".bb_cmdr_palette") || e.target.classList.contains(".bb_cmdr_palette")) {
    return;
  } //removeList();

}

document.body.setAttribute("data-commanderstate", "closed");

function cleanupPalette() {
  var palette = document.querySelector(".bb_cmdr_palette");

  if (palette) {
    palette.parentElement.removeChild(palette);
  }

  document.body.setAttribute("data-commanderstate", "closed");
}

function cleanupPaletteOnExit(e) {
  if (e.target.classList.contains("fl-builder-button-primary")) {
    if (e.target.dataset.action === "publish" || e.target.dataset.action === "draft" || e.target.dataset.action === "discard") {
      cleanupPalette();
    }
  }
}
/* 
this is the parent function that calls everything
*/


(function () {
  function openCommandPalette() {
    if (document.body.dataset.commanderstate === "closed") {
      createPalette();
      document.body.dataset.commanderstate = "open";
      var executeBtn = document.querySelector(".bb_cmdr_palette .bb_cmdr_container button");
      var input = document.querySelector(".bb_cmdr_palette .bb_cmdr_container input");
      var form = document.querySelector(".bb_cmdr_palette .bb_cmdr_container");
      input.addEventListener("focus", showCommands);
      input.addEventListener("input", showCommands);
      form.addEventListener("submit", executeCommand);
      executeBtn.addEventListener("click", executeCommand);
    } else {
      var palette = document.querySelector(".bb_cmdr_palette");

      if (palette) {
        palette.parentElement.removeChild(palette);
        document.body.dataset.commanderstate = "closed";
      }
    }
  } //this allows beaverbuilder to use the function


  function startCommander() {
    // Register a hook listener using the key that you registered
    // your shortcut with along with the function it should fire.
    FLBuilder.addHook("openCommandPalette", openCommandPalette);
  }

  window.addEventListener("load", startCommander);
  window.addEventListener("click", function (e) {
    return cleanupPaletteOnExit(e);
  });
})();
},{"./pallet-commands/CMDR_resetFn":"scripts/pallet-commands/CMDR_resetFn.js","./pallet-commands/CMD_marginsZero":"scripts/pallet-commands/CMD_marginsZero.js","./pallet-commands/resetOpenModule":"scripts/pallet-commands/resetOpenModule.js","./pallet-commands/resetAllModules":"scripts/pallet-commands/resetAllModules.js","./pallet-commands/marginsZeroOpenModule":"scripts/pallet-commands/marginsZeroOpenModule.js","./pallet-commands/marginZeroAllModules":"scripts/pallet-commands/marginZeroAllModules.js","./pallet-commands/resetAllRows":"scripts/pallet-commands/resetAllRows.js","./pallet-commands/resetText":"scripts/pallet-commands/resetText.js","./pallet-commands/resetAllColumns":"scripts/pallet-commands/resetAllColumns.js","./pallet-commands/initChangeAllModulesWithArgs":"scripts/pallet-commands/initChangeAllModulesWithArgs.js","./util/createArgForm":"scripts/util/createArgForm.js"}],"scripts/commands.js":[function(require,module,exports) {
var global = arguments[3];
// OPEN SETTINGS COMMANDS
(function () {
  function openParentColumnSettings() {
    var module = document.querySelector(".fl-module-overlay");

    if (!module) {
      return null;
    }

    var col = module.closest(".fl-col");
    var parent = col.parentElement.closest(".fl-col");

    if (!parent) {
      return null;
    }

    var nodeId = parent.dataset.node;
    var global = module.closest(".fl-block-overlay-global") ? true : false;
    FLBuilderSettingsForms.render({
      id: "col",
      nodeId: nodeId,
      className: "fl-builder-col-settings",
      attrs: 'data-node="' + nodeId + '"',
      buttons: !global && !FLBuilderConfig.lite && !FLBuilderConfig.simpleUi ? ["save-as"] : [],
      badges: global ? [FLBuilderStrings.global] : [],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      preview: {
        type: "col"
      }
    });
  }

  function shortcutHook() {
    // Register a hook listener using the key that you registered
    // your shortcut with along with the function it should fire.
    FLBuilder.addHook("openParentColumnSettings", openParentColumnSettings);
  }

  window.addEventListener("load", shortcutHook);
})();

(function () {
  function openColumnSettings() {
    /* 
    1. set up hover listener
      - needs to grab:
         module that is hovered
         modules column node id = `fl-col.dataset.node
    2. excute FLBuilderSettingsForms.render(config, callback)
      - 2. pass settings (argument 1)
      - 3. pass callback (argrument 2)
     */
    var module = document.querySelector(".fl-module-overlay");

    if (!module) {
      return null;
    }

    var col = module.closest(".fl-col");
    var nodeId = col.dataset.node;
    var global = module.closest(".fl-block-overlay-global") ? true : false;
    FLBuilderSettingsForms.render({
      id: "col",
      nodeId: nodeId,
      className: "fl-builder-col-settings",
      attrs: 'data-node="' + nodeId + '"',
      buttons: !global && !FLBuilderConfig.lite && !FLBuilderConfig.simpleUi ? ["save-as"] : [],
      badges: global ? [FLBuilderStrings.global] : [],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      preview: {
        type: "col"
      }
    });
  }

  function shortcutHookColumn() {
    // Register a hook listener using the key that you registered
    // your shortcut with along with the function it should fire.
    FLBuilder.addHook("openColumnSettings", openColumnSettings);
  }

  window.addEventListener("load", shortcutHookColumn);
})();

(function () {
  function openModulesAdvancedTab() {
    var module = document.querySelector(".fl-module-overlay").closest(".fl-module");
    console.log(module);
    var nodeId = module.dataset.node;
    FLBuilderSettingsForms.render({
      id: "".concat(module.dataset.type),
      nodeId: nodeId,
      className: "fl-builder-module-settings  fl-builder-".concat(module.dataset.type, "-settings"),
      attrs: 'data-node="' + nodeId + "\" data-type=".concat(module.dataset.type, " novalidate=\"novalidate\" "),
      buttons: ["save"],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      type: "module",
      preview: {
        type: "".concat(module.dataset.type)
      }
    }, function () {
      //makes the advanced tab open
      var settings = document.querySelector(".fl-builder-module-settings");
      var tabBar = settings.querySelector(".fl-builder-settings-tabs");
      tabBar.querySelector(".fl-active").classList.remove("fl-active");
      var advancedTab = tabBar.querySelector("[href = \"#fl-builder-settings-tab-advanced\"]");
      advancedTab.classList.add("fl-active");
    });
  }

  function shortcutHookColumn() {
    // Register a hook listener using the key that you registered
    // your shortcut with along with the function it should fire.
    FLBuilder.addHook("openModulesAdvancedTab", openModulesAdvancedTab);
  }

  window.addEventListener("load", shortcutHookColumn);
})();

(function () {
  function openColAdvancedTab() {
    var module = document.querySelector(".fl-module-overlay");

    if (!module) {
      return null;
    }

    var col = module.closest(".fl-col");
    var nodeId = col.dataset.node;
    var global = module.closest(".fl-block-overlay-global") ? true : false;
    FLBuilderSettingsForms.render({
      id: "col",
      nodeId: nodeId,
      className: "fl-builder-col-settings",
      attrs: 'data-node="' + nodeId + '"',
      buttons: !global && !FLBuilderConfig.lite && !FLBuilderConfig.simpleUi ? ["save-as"] : [],
      badges: global ? [FLBuilderStrings.global] : [],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      preview: {
        type: "col"
      }
    }, function () {
      //makes the advanced tab open
      var settings = document.querySelector(".fl-builder-module-settings");
      var tabBar = settings.querySelector(".fl-builder-settings-tabs");
      tabBar.querySelector(".fl-active").classList.remove("fl-active");
      var advancedTab = tabBar.querySelector("[href = \"#fl-builder-settings-tab-advanced\"]");
      advancedTab.classList.add("fl-active");
    });
  }

  function shortcutHookColumn() {
    FLBuilder.addHook("openColAdvancedTab", openColAdvancedTab);
  }

  window.addEventListener("load", shortcutHookColumn);
})();
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/palette.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"bb-commander.js":[function(require,module,exports) {
"use strict";

require("./scripts/open-palette");

require("./scripts/commands");

require("./styles/palette.scss");
},{"./scripts/open-palette":"scripts/open-palette.js","./scripts/commands":"scripts/commands.js","./styles/palette.scss":"styles/palette.scss"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56633" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","bb-commander.js"], null)
//# sourceMappingURL=/bb-commander.js.map