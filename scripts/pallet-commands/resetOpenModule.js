export default function() {
  document
    .querySelectorAll(
      `.fl-builder-settings-fields input, 
        .fl-builder-settings-fields select`
    )
    .forEach(input => {
      if (input.tagName == "INPUT") {
        if (input.type == "hidden") {
          return;
        }
        input.value = " ";
        if (input.classList.contains("text-full")) {
          //looks for headings or small text
          input.value = "default text";
        }
      } else {
        if (input.name == "visibility_display") {
          return;
        }
        var option = input.querySelector("option");
        input.value = option.value;
      }
    });
  FLBuilder._saveSettings();
}
