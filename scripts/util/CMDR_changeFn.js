export default function CMDR_changeFn(inputName, inputValue) {
  const form = document.querySelector(".fl-builder-settings-fields");
  form.querySelectorAll(`${inputName}`).forEach(input => {
    input.value = inputValue;
  });
  FLBuilder._saveSettings();
}
