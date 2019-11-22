export default function() {
  document
    .querySelectorAll(
      ".fl-builder-settings-fields #fl-field-margin input[type=number]"
    )
    .forEach(input => {
      input.value = "0";
    });

  FLBuilder._saveSettings();
}
