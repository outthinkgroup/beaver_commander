export default function CMDR_resetFn() {
  document
    .querySelectorAll(
      ".fl-builder-settings-fields input, .fl-builder-settings-fields select"
    )
    .forEach(input => {
      if (input.style.display === "none") {
        return null;
      }
      if (input.name == "visibility_display") {
        return null;
      }

      if (input.tagName == "INPUT") {
        input.value = "";
        if (
          input.classList.contains("text-full") &&
          input.name !== "id" &&
          input.name !== "class"
        ) {
          input.value = "edit" + input.name;
        }
      } else if (input.tagName == "SELECT") {
        if (input.name === "tag") {
          return null;
        }
        if (input.name === "full_height") {
          input.value = "default";
          console.log(input.value);
        }
        var option = input.querySelector("option");

        input.value = option && option.value; //incase their are no options
      } else {
        return;
      }
    });

  FLBuilder._saveSettings();
}
