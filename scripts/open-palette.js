//COMMANDS
import CMDR_resetFn from "./pallet-commands/CMDR_resetFn";
import CMD_marginsZero from "./pallet-commands/CMD_marginsZero";
import resetOpenModule from "./pallet-commands/resetOpenModule";
import resetAllModules from "./pallet-commands/resetAllModules";
import marginsZeroOpenModule from "./pallet-commands/marginsZeroOpenModule";
import marginZeroAllModules from "./pallet-commands/marginZeroAllModules";
import resetAllRows from "./pallet-commands/resetAllRows";
import resetText from "./pallet-commands/resetText";
import resetAllColumns from "./pallet-commands/resetAllColumns";
import initChangeAllModulesWithArgs from "./pallet-commands/initChangeAllModulesWithArgs";

/**
 * function to create a form to add arguments to a function.
 * @param {STRING} inputNameClass class name of the input youll get the input name from
 * @param {STRING} newValueClass class name of the input you put your new value in
 */

//TODO add a remove argForm

function createPalette() {
  const el = document.createElement("div");
  const searchInput = document.createElement("input");
  const executeBtn = document.createElement("BUTTON");
  const datalist = document.createElement("DATALIST");

  el.classList.add("bb_cmdr_palette");
  executeBtn.setAttribute("type", "button");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("list", "commands");
  datalist.id = "commands";
  executeBtn.innerText = "Execute";
  const container = document.createElement("form");
  container.classList.add("bb_cmdr_container");

  container.appendChild(searchInput);
  container.appendChild(executeBtn);
  el.appendChild(container);
  el.appendChild(datalist);
  document.body.appendChild(el);
}

const BBCommander = {
  /**
   * resets the open settings form.
   * to my defaults {empty string or default text}
   * or the first
   * option in a select
   */
  resetOpenModule,

  /**
   * resets all modules on a page to empty string or the first
   * option in a select
   */
  resetAllModules,

  /*
   open modules will have 0 margins 
  */
  marginsZeroOpenModule,

  /**
   *  All modules will have 0 margins
   */
  marginZeroAllModules,

  resetText, //!this dont work

  resetAllColumns,

  /**
   * resets all rows on a page to empty string or the first
   * option in a select
   */
  resetAllRows,

  /**
   * start of 2 step functions
   * or
   * functions with arguments
   */
  initChangeAllModulesWithArgs
};

function executeCommand(e) {
  e.preventDefault();
  const input = document.querySelector(
    ".bb_cmdr_palette .bb_cmdr_container input"
  );
  BBCommander[input.value.toString()]();
}

const ALL_COMMANDS = Object.keys(BBCommander);

//this should eventually render select list like downshift
function showCommands() {
  const searchStr = this.value;
  const searchedCMDs = ALL_COMMANDS.filter(cmd => {
    return (
      searchStr === "" || cmd.toLowerCase().includes(searchStr.toLowerCase())
    );
  });

  const list = searchedCMDs
    .map(cmd => {
      const item = `<option value="${cmd}" >${cmd}</option>`;
      return item;
    })
    .join("");
  const datalist = document.querySelector(".bb_cmdr_palette datalist");
  datalist.innerHTML = list;
}

function removeList() {
  document.querySelector(".bb_cmdr_palette input").value = "";
}

function removeListOnClick(e) {
  if (
    e.target.closest(".bb_cmdr_palette") ||
    e.target.classList.contains(".bb_cmdr_palette")
  ) {
    return;
  }
  //removeList();
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
      const form = document.querySelector(
        ".bb_cmdr_palette .bb_cmdr_container"
      );

      input.addEventListener("focus", showCommands);
      input.addEventListener("input", showCommands);
      form.addEventListener("submit", executeCommand);
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
