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
})({"scripts/open-palette.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

function CMD_marginsZero() {
  document.querySelectorAll(".fl-builder-settings-fields #fl-field-margin input[type=number]").forEach(function (input) {
    input.value = "0";
  });

  FLBuilder._saveSettings();
}

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

function CMDR_changeFn(inputName, inputValue) {
  var form = document.querySelector(".fl-builder-settings-fields");
  form.querySelectorAll("".concat(inputName)).forEach(function (input) {
    input.value = inputValue;
  });

  FLBuilder._saveSettings();
}
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
/**
 * function to create a form to add arguments to a function.
 * @param {STRING} inputNameClass class name of the input youll get the input name from
 * @param {STRING} newValueClass class name of the input you put your new value in
 */


function createArgForm(inputNameClass, newValueClass, fnToListenFor) {
  var container = document.createElement("div");
  var inputName = document.createElement("input");
  var inputValue = document.createElement("input");
  var submitButton = document.createElement("BUTTON");
  inputName.classList.add(inputNameClass);
  inputValue.classList.add(newValueClass);
  submitButton.classList.add("submit-args-button");
  inputName.setAttribute("placeholder", "inputs name");
  inputValue.setAttribute("placeholder", "new value");
  submitButton.setAttribute("type", "button");
  submitButton.innerText = "RUN";
  container.appendChild(inputName);
  container.appendChild(inputValue);
  container.appendChild(submitButton);
  var palette = document.querySelector(".bb_cmdr_palette");
  palette.appendChild(container);
  submitButton.addEventListener("click", fnToListenFor);
  return;
}

function createPalette() {
  var el = document.createElement("div");
  var searchInput = document.createElement("input");
  var executeBtn = document.createElement("BUTTON");
  var ul = document.createElement("UL");
  el.classList.add("bb_cmdr_palette");
  executeBtn.setAttribute("type", "button");
  searchInput.setAttribute("type", "text");
  executeBtn.innerText = "Execute";
  var container = document.createElement("div");
  container.classList.add("bb_cmdr_container");
  container.appendChild(searchInput);
  container.appendChild(executeBtn);
  el.appendChild(container);
  el.appendChild(ul);
  document.body.appendChild(el);
}

var BBComander = {
  hello: function hello() {
    console.log("hello world");
  },
  resetOpenModule: function resetOpenModule() {
    document.querySelectorAll(".fl-builder-settings-fields input, .fl-builder-settings-fields select ").forEach(function (input) {
      if (input.tagName == "INPUT") {
        if (input.type == "hidden") {
          return;
        }

        input.value = " ";

        if (input.classList.contains("text-full")) {
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
  },

  /**
   * resets all modules on a page to empty string or the first
   * option in a select
   */
  resetAllModules: function resetAllModules() {
    var modules = _toConsumableArray(document.querySelectorAll(".fl-module"));

    var i = 0;
    CMDR_renderAllModuleSettings(modules, CMDR_resetFn, i);
  },
  marginsZeroOpenModule: function marginsZeroOpenModule() {
    document.querySelectorAll(".fl-builder-settings-fields #fl-field-margin input[type=number]").forEach(function (input) {
      console.log(input);
      input.value = "0";
    });

    FLBuilder._saveSettings();
  },
  marginZeroAllModules: function marginZeroAllModules() {
    var modules = _toConsumableArray(document.querySelectorAll(".fl-module"));

    var i = 0;
    CMDR_renderAllModuleSettings(modules, CMD_marginsZero, i);
  },
  resetText: function resetText() {
    var iframe = document.querySelector(".fl-builder-settings-section-content .mce-edit-area iframe");
    iframe.contentWindow.document.body.innerHTML = "";
  },
  resetAllColumns: function resetAllColumns() {
    var columns = document.querySelectorAll(".fl-col");
    var i = 0;
    CMDR_renderAllColumnSettings(columns, CMDR_resetFn, i);
  },
  resetAllRows: function resetAllRows() {
    var rows = document.querySelectorAll(".fl-row");
    var i = 0;
    CMDR_renderAllRowSettings(rows, CMDR_resetFn, i);
  },

  /**
   * start of 2 step functions
   * or
   * functions with arguments
   */
  initChangeAllModulesWithArgs: function initChangeAllModulesWithArgs() {
    createArgForm("inputName", "toValue", changeAllModulesWithArgs);

    function changeAllModulesWithArgs() {
      var inputName = document.querySelector(".inputName").value;
      var newValue = document.querySelector(".toValue").value;
      var modules = document.querySelectorAll(".fl-module");
      var i = 0;
      CMDR_renderAllModuleSettingsWithArgs(modules, CMDR_changeFn, i, inputName, newValue);
    }
  }
};

function executeCommand() {
  var input = document.querySelector(".bb_cmdr_palette .bb_cmdr_container input");
  BBComander[input.value.toString()]();
}

var ALL_COMMANDS = ["resetText", "marginZeroAllModules", "marginsZeroOpenModule", "resetAllModules", "resetOpenModule", "resetAllColumns", "resetAllRows", "initChangeAllModulesWithArgs"];

function showCommands() {
  searchStr = this.value;
  var searchedCMDs = ALL_COMMANDS.filter(function (cmd) {
    return cmd.toLowerCase().includes(searchStr.toLowerCase());
  });
  var list = searchedCMDs.map(function (cmd) {
    var item = "<li data-command=\"".concat(cmd, "\" >").concat(cmd, "</li>");
    return item;
  }).join("");
  var ul = document.querySelector(".bb_cmdr_palette ul");
  ul.innerHTML = list;
}

function removeList() {
  var list = document.querySelectorAll(".bb_cmdr_palette li");
  list.forEach(function (li) {
    return li.parentNode.removeChild(li);
  });
  document.querySelector(".bb_cmdr_palette input").value = "";
}

function removeListOnClick(e) {
  if (e.target.closest(".bb_cmdr_palette") || e.target.classList.contains(".bb_cmdr_palette")) {
    return;
  }

  removeList();
}

document.body.setAttribute("data-commanderstate", "closed");

function cleanupPalette(e) {
  if (e.target.classList.contains("fl-builder-button-primary")) {
    if (e.target.dataset.action === "publish" || e.target.dataset.action === "draft" || e.target.dataset.action === "discard") {
      document.body.dataset.commanderstate = "closed";
      var palette = document.querySelector(".bb_cmdr_palette");

      if (palette) {
        palette.parentElement.removeChild(palette);
      }
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
      var ul = document.querySelector(".bb_cmdr_palette ul");
      ul.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
          var command = e.target.dataset.command;

          var _input = document.querySelector(".bb_cmdr_palette input");

          _input.value = command;
          executeCommand();
          removeList();
          return;
        }
      });
      input.addEventListener("keydown", showCommands);
      window.addEventListener("click", function (e) {
        return removeListOnClick(e);
      });
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
    return cleanupPalette(e);
  });
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

require("./styles/palette.scss");
},{"./scripts/open-palette":"scripts/open-palette.js","./styles/palette.scss":"styles/palette.scss"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61735" + '/');

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