import CMDR_renderAllModuleSettings from "../util/CMDR_renderAllModulesSettings";
import CMD_marginsZero from "./CMD_marginsZero";
export default function() {
  const modules = [...document.querySelectorAll(".fl-module")];
  let i = 0;
  CMDR_renderAllModuleSettings(modules, CMD_marginsZero, i);
}
