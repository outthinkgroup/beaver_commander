//on edit form
function edit_form(e) {
  if (e.target.classList.contains("fl-form-field-edit")) {
    const parentData = document.querySelector(
      ".fl-builder-module-settings > .fl-builder-settings-json"
    ).value;

    function check() {
      setTimeout(() => {
        if (document.querySelector(".custom-fields-data-wrapper")) {
          addFields();
        } else {
          console.log("running");
          check();
        }
      }, 200);
    }
    check();
    function addFields() {
      const fieldsContainer = document.querySelector(
        ".custom-fields-data-wrapper"
      );
      const parentDataParsed = JSON.parse(parentData);
      const { custom_field } = parentDataParsed;
      const formData = fieldsContainer.previousElementSibling.value;
      const formDataParsed = formData === "" ? [] : JSON.parse(formData);
      custom_field.forEach(field => {
        const container = document.createElement("DIV");
        container.classList.add("field");
        const input = document.createElement("INPUT");
        if (formDataParsed.length <= 0) {
          input.value = "";
        } else {
          const fields = formDataParsed.map(item => item.field);
          if (fields.includes(field)) {
            input.value = formDataParsed.find(
              item => item.field == field
            ).value;
          }
        }
        input.setAttribute("name", field);
        input.setAttribute("type", "text");
        const fieldLabel = document.createElement("LABEL");
        fieldLabel.innerHTML = `
        <span class="field-name">${field}</span>
      `;
        fieldLabel.appendChild(input);
        container.appendChild(fieldLabel);
        fieldsContainer.appendChild(container);
        input.addEventListener("change", save_form);
      });
    }
  }
}

function save_form(e) {
  const { name, value } = e.target;
  const formData = e.target.closest(".field").parentElement
    .previousElementSibling;

  const formDataVal = formData.value === "" ? [] : JSON.parse(formData.value);

  const updatedData = [
    ...formDataVal.filter(item => item.field !== name),
    { field: name, value: value == "" ? "&nbsp" : value }
  ];
  formData.value = JSON.stringify(updatedData);
}

window.addEventListener("click", edit_form);
