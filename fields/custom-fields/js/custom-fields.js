window.addEventListener("click", function(e) {
  if (e.target.classList.contains("new-fields")) {
    const list = document.querySelector(".commander-custom-fields");
    const newPair = document.createElement("div");
    newPair.classList.add("pair");
    newPair.innerHTML = `
      <input type="text" class="field_name" value="" id="field-1">            
    `;
    list.appendChild(newPair);
    check();
  }
});

function saveField(e) {
  const { name, value } = e.target;
  if (value.trim() !== "") {
    const formData = e.target.closest(".pair").parentElement
      .previousElementSibling;
    const formDataVal =
      formData.value == "" || formData.value == '""""'
        ? []
        : JSON.parse(formData.value);
    console.log(formData);
    const updatedData = [
      ...formDataVal.filter(item => item !== name),
      value.trim()
    ];
    formData.value = JSON.stringify(updatedData);
  } else {
    console.log("fix");
  }
}
let checkTimes = 0;
function check() {
  if (
    document
      .querySelector(".fl-builder-settings")
      .classList.contains("fl-builder-custom-markup-settings")
  ) {
    setTimeout(() => {
      if (document.querySelector(".commander-custom-fields")) {
        inputs = document.querySelectorAll(" .commander-custom-fields input");
        [...inputs].forEach(input =>
          input.addEventListener("change", saveField)
        );
      } else if (checkTimes <= 70) {
        console.log("runninnnnnnng");
        check();
        checkTimes += 1;
      }
    }, 200);
  }
}

FLBuilder.addHook("didShowLightbox", check);
