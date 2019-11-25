import CMDR_renderAllModuleSettingsWithArgs from "../util/CMDR_renderAllModuleSettingsWithArgs";
import CMDR_changeFn from "../util/CMDR_changeFn";

export default function() {
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
