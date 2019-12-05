import CMDR_renderAllModuleSettingsWithArgs from "../util/CMDR_renderAllModuleSettingsWithArgs";
import CMDR_changeFn from "../util/CMDR_changeFn";

export default function() {
  const inputName = document.querySelector(".inputName").value;
  const newValue = document.querySelector(".toValue").value;
  const types = document.querySelector(".modules-type-select").value;
  const modules = document.querySelectorAll(`.fl-module[data-type="${types}"]`);
  let i = 0;
  CMDR_renderAllModuleSettingsWithArgs(
    modules,
    CMDR_changeFn,
    i,
    inputName,
    newValue
  );
}
