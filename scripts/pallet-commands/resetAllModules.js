import CMDR_renderAllModuleSettings from "../util/CMDR_renderAllModulesSettings";
export default function() {
  const modules = [...document.querySelectorAll(".fl-module")];
  let i = 0;
  CMDR_renderAllModuleSettings(modules, CMDR_resetFn, i);
}
