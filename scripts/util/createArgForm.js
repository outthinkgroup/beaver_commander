import { cleanupPalette } from "../open-palette";

export default function createArgForm(
  inputNameClass,
  newValueClass,
  fnToListenFor
) {
  const container = document.createElement("div");
  const inputName = document.createElement("input");
  const inputValue = document.createElement("input");
  const submitButton = document.createElement("BUTTON");

  container.classList.add("args-container");
  inputName.classList.add(inputNameClass);
  inputValue.classList.add(newValueClass);
  submitButton.classList.add("submit-args-button");

  inputName.setAttribute("placeholder", "inputs name");
  inputName.setAttribute("type", "text");
  inputValue.setAttribute("placeholder", "new value");
  inputValue.setAttribute("type", "text");
  submitButton.setAttribute("type", "button");
  submitButton.innerText = "RUN";

  container.appendChild(inputName);
  container.appendChild(inputValue);
  container.appendChild(submitButton);

  const palette = document.querySelector(".bb_cmdr_palette");
  palette.appendChild(container);

  submitButton.addEventListener("click", () => {
    fnToListenFor();
    cleanupPalette();
  });
  return;
}
