import CMDR_renderAllModuleSettingsWithArgs from "../util/CMDR_renderAllModuleSettingsWithArgs";
import CMDR_changeFn from "../util/CMDR_changeFn";
import createArgForm from "../util/createArgForm";
export default function() {
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
