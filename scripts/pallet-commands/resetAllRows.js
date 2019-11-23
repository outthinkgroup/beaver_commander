import CMDR_resetFn from "./CMDR_resetFn";
export default function() {
  const rows = document.querySelectorAll(".fl-row");

  let i = 0;
  CMDR_renderAllRowSettings(rows, CMDR_resetFn, i);
}
