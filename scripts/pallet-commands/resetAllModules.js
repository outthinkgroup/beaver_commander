import CMDR_renderAllModuleSettings from "../util/CMDR_renderAllModulesSettings";
import CMDR_resetFn from "./CMDR_resetFn";
export default function() {
  const modules = [...document.querySelectorAll(".fl-module")];
  let i = 0;
  CMDR_renderAllModuleSettings(modules, CMDR_resetFn, i);
}
