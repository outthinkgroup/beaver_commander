import CMDR_resetFn from "./CMDR_resetFn";
import CMDR_renderAllColumnSettings from "../util/CMDR_renderAllColumnSettings";
export default function() {
  const columns = document.querySelectorAll(".fl-col");

  let i = 0;
  CMDR_renderAllColumnSettings(columns, CMDR_resetFn, i);
}
