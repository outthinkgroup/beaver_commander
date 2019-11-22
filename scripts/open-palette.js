import CMDR_resetFn from "./pallet-commands/CMDR_resetFn";

function CMD_marginsZero() {
  document
    .querySelectorAll(
      ".fl-builder-settings-fields #fl-field-margin input[type=number]"
    )
    .forEach(input => {
      input.value = "0";
    });
  FLBuilder._saveSettings();
}

function CMDR_renderAllModuleSettings(modulesArray, cb, increment) {
  const module = modulesArray[increment];

  increment++;

  const nodeId = module.dataset.node;
  FLBuilderSettingsForms.render(
    {
      id: `${module.dataset.type}`,
      nodeId: nodeId,
      className: `fl-builder-module-settings  fl-builder-${
        module.dataset.type
      }-settings`,
      attrs:
        'data-node="' +
        nodeId +
        `" data-type=${module.dataset.type} novalidate="novalidate" `,
      buttons: ["save"],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      type: "module",
      preview: {
        type: `${module.dataset.type}`
      }
    },
    function() {
      //recursively calls itself to loop through all the array in order
      cb();

      if (modulesArray.length <= increment) {
        console.log("done");
        return;
      } else {
        CMDR_renderAllModuleSettings(modulesArray, cb, increment);
      }
    }
  );
}

function CMDR_renderAllColumnSettings(modulesArray, cb, increment) {
  const module = modulesArray[increment];

  increment++;

  const nodeId = module.dataset.node;

  FLBuilderSettingsForms.render(
    {
      id: `col`,
      nodeId: nodeId,
      className: `fl-builder-col-settings`,
      attrs: 'data-node="' + nodeId + `" `,
      buttons: ["save"],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      preview: {
        type: `col`
      }
    },
    function() {
      //recursively calls itself to loop through all the array in order
      cb();

      if (modulesArray.length <= increment) {
        console.log("done");
        return;
      } else {
        CMDR_renderAllColumnSettings(modulesArray, cb, increment);
      }
    }
  );
}

function CMDR_renderAllRowSettings(modulesArray, cb, increment) {
  const module = modulesArray[increment];

  increment++;

  const nodeId = module.dataset.node;

  FLBuilderSettingsForms.render(
    {
      id: `row`,
      nodeId: nodeId,
      className: `fl-builder-col-settings`,
      attrs: 'data-node="' + nodeId + `" `,
      buttons: ["save"],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      preview: {
        type: `row`
      }
    },
    function() {
      //recursively calls itself to loop through all the array in order
      cb();

      if (modulesArray.length <= increment) {
        console.log("done");
        return;
      } else {
        CMDR_renderAllRowSettings(modulesArray, cb, increment);
      }
    }
  );
}

function CMDR_changeFn(inputName, inputValue) {
  const form = document.querySelector(".fl-builder-settings-fields");
  form.querySelectorAll(`${inputName}`).forEach(input => {
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
function CMDR_renderAllModuleSettingsWithArgs(
  modulesArray,
  cb,
  increment,
  inputName,
  newValue
) {
  const module = modulesArray[increment];

  increment++;

  const nodeId = module.dataset.node;
  FLBuilderSettingsForms.render(
    {
      id: `${module.dataset.type}`,
      nodeId: nodeId,
      className: `fl-builder-module-settings  fl-builder-${
        module.dataset.type
      }-settings`,
      attrs:
        'data-node="' +
        nodeId +
        `" data-type=${module.dataset.type} novalidate="novalidate" `,
      buttons: ["save"],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      type: "module",
      preview: {
        type: `${module.dataset.type}`
      }
    },
    function() {
      //recursively calls itself to loop through all the array in order
      cb(inputName, newValue);

      if (modulesArray.length <= increment) {
        console.log("done");
        return;
      } else {
        CMDR_renderAllModuleSettingsWithArgs(
          modulesArray,
          cb,
          increment,
          inputName,
          newValue
        );
      }
    }
  );
}

/**
 * function to create a form to add arguments to a function.
 * @param {STRING} inputNameClass class name of the input youll get the input name from
 * @param {STRING} newValueClass class name of the input you put your new value in
 */
function createArgForm(inputNameClass, newValueClass, fnToListenFor) {
  const container = document.createElement("div");
  const inputName = document.createElement("input");
  const inputValue = document.createElement("input");
  const submitButton = document.createElement("BUTTON");

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

  const palette = document.querySelector(".bb_cmdr_palette");
  palette.appendChild(container);

  submitButton.addEventListener("click", fnToListenFor);
  return;
}

function createPalette() {
  const el = document.createElement("div");
  const searchInput = document.createElement("input");
  const executeBtn = document.createElement("BUTTON");
  const ul = document.createElement("UL");

  el.classList.add("bb_cmdr_palette");
  executeBtn.setAttribute("type", "button");
  searchInput.setAttribute("type", "text");
  executeBtn.innerText = "Execute";
  const container = document.createElement("div");
  container.classList.add("bb_cmdr_container");

  container.appendChild(searchInput);
  container.appendChild(executeBtn);
  el.appendChild(container);
  el.appendChild(ul);
  document.body.appendChild(el);
}

const BBComander = {
  hello: function() {
    console.log("hello world");
  },
  /**
   * resets the open settings form.
   * to my defaults {empty string or default text}
   * or the first
   * option in a select
   */
  resetOpenModule: function() {
    document
      .querySelectorAll(
        `.fl-builder-settings-fields input, 
        .fl-builder-settings-fields select `
      )
      .forEach(input => {
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
  },
  /**
   * resets all modules on a page to empty string or the first
   * option in a select
   */
  resetAllModules: function() {
    const modules = [...document.querySelectorAll(".fl-module")];
    let i = 0;
    CMDR_renderAllModuleSettings(modules, CMDR_resetFn, i);
  },
  marginsZeroOpenModule: function() {
    document
      .querySelectorAll(
        ".fl-builder-settings-fields #fl-field-margin input[type=number]"
      )
      .forEach(input => {
        console.log(input);
        input.value = "0";
      });

    FLBuilder._saveSettings();
  },

  marginZeroAllModules: function() {
    const modules = [...document.querySelectorAll(".fl-module")];
    let i = 0;
    CMDR_renderAllModuleSettings(modules, CMD_marginsZero, i);
  },

  resetText: function() {
    const iframe = document.querySelector(
      ".fl-builder-settings-section-content .mce-edit-area iframe"
    );
    iframe.contentWindow.document.body.innerHTML = "";
  },

  resetAllColumns: function() {
    const columns = document.querySelectorAll(".fl-col");

    let i = 0;
    CMDR_renderAllColumnSettings(columns, CMDR_resetFn, i);
  },
  resetAllRows: function() {
    const rows = document.querySelectorAll(".fl-row");

    let i = 0;
    CMDR_renderAllRowSettings(rows, CMDR_resetFn, i);
  },

  /**
   * start of 2 step functions
   * or
   * functions with arguments
   */
  initChangeAllModulesWithArgs: function() {
    createArgForm("inputName", "toValue", changeAllModulesWithArgs);
    function changeAllModulesWithArgs() {
      const inputName = document.querySelector(".inputName").value;
      const newValue = document.querySelector(".toValue").value;
      const modules = document.querySelectorAll(".fl-module");
      let i = 0;
      CMDR_renderAllModuleSettingsWithArgs(
        modules,
        CMDR_changeFn,
        i,
        inputName,
        newValue
      );
    }
  }
};

function executeCommand() {
  const input = document.querySelector(
    ".bb_cmdr_palette .bb_cmdr_container input"
  );
  BBComander[input.value.toString()]();
}

const ALL_COMMANDS = [
  "thisNotACommand",
  "hello",
  "resetText",
  "marginZeroAllModules",
  "marginsZeroOpenModule",
  "resetAllModules",
  "resetOpenModule",
  "resetAllColumns",
  "resetAllRows",
  "initChangeAllModulesWithArgs"
];

//this should eventually render select list like downshift
function showCommands() {
  const searchStr = this.value;
  const searchedCMDs = ALL_COMMANDS.filter(cmd =>
    cmd.toLowerCase().includes(searchStr.toLowerCase())
  );

  const list = searchedCMDs
    .map(cmd => {
      const item = `<li data-command="${cmd}" >${cmd}</li>`;
      return item;
    })
    .join("");
  const ul = document.querySelector(".bb_cmdr_palette ul");
  ul.innerHTML = list;
}

function removeList() {
  const list = document.querySelectorAll(".bb_cmdr_palette li");
  list.forEach(li => li.parentNode.removeChild(li));
  document.querySelector(".bb_cmdr_palette input").value = "";
}

function removeListOnClick(e) {
  if (
    e.target.closest(".bb_cmdr_palette") ||
    e.target.classList.contains(".bb_cmdr_palette")
  ) {
    return;
  }
  removeList();
}
document.body.setAttribute("data-commanderstate", "closed");

function cleanupPalette(e) {
  if (e.target.classList.contains("fl-builder-button-primary")) {
    if (
      e.target.dataset.action === "publish" ||
      e.target.dataset.action === "draft" ||
      e.target.dataset.action === "discard"
    ) {
      document.body.dataset.commanderstate = "closed";
      const palette = document.querySelector(".bb_cmdr_palette");
      if (palette) {
        palette.parentElement.removeChild(palette);
      }
    }
  }
}

/* 
this is the parent function that calls everything
*/
(function() {
  function openCommandPalette() {
    if (document.body.dataset.commanderstate === "closed") {
      createPalette();
      document.body.dataset.commanderstate = "open";
      const executeBtn = document.querySelector(
        ".bb_cmdr_palette .bb_cmdr_container button"
      );
      const input = document.querySelector(
        ".bb_cmdr_palette .bb_cmdr_container input"
      );
      const ul = document.querySelector(".bb_cmdr_palette ul");
      ul.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
          const command = e.target.dataset.command;
          const input = document.querySelector(".bb_cmdr_palette input");
          input.value = command;
          executeCommand();
          removeList();
          return;
        }
      });

      input.addEventListener("input", showCommands);
      window.addEventListener("click", e => removeListOnClick(e));
      executeBtn.addEventListener("click", executeCommand);
    } else {
      const palette = document.querySelector(".bb_cmdr_palette");
      if (palette) {
        palette.parentElement.removeChild(palette);
        document.body.dataset.commanderstate = "closed";
      }
    }
  }
  //this allows beaverbuilder to use the function
  function startCommander() {
    // Register a hook listener using the key that you registered
    // your shortcut with along with the function it should fire.
    FLBuilder.addHook("openCommandPalette", openCommandPalette);
  }
  window.addEventListener("load", startCommander);
  window.addEventListener("click", e => cleanupPalette(e));
})();
