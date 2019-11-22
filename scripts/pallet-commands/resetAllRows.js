export default function() {
  const rows = document.querySelectorAll(".fl-row");

  let i = 0;
  CMDR_renderAllRowSettings(rows, CMDR_resetFn, i);
}
