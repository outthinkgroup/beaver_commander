/* 
window listen for click on save-as button
  onClick:
    find:
      node id
      module type
      ??settings??
      name input
    add:
      checkbox to make linked parent
      listener to save btn to make linked parent
        if linked parent:
          send:
            node id
            module type

*/
function addCustomGlobalSettings(e) {
  if (e.target.classList.contains("fl-builder-settings-save-as")) {
    setTimeout(() => {
      const saveButton = document.querySelector(".fl-builder-settings-save");
      const form = saveButton.closest("[data-node]");
      const node = form.dataset.node;
      const editingElement = document.querySelector(
        `.fl-module.fl-node-${node}`
      );
      if (!editingElement) return;

      const type = editingElement.dataset.type;

      const tr = document.createElement("tr"); /*    */
      const th = document.createElement(
        "TH"
      ); /* .classList.add("fl-field-label"); */
      const td = document.createElement(
        "td"
      ); /* .classList.add("fl-field-control"); */
      const checkbox = document.createElement("INPUT");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("name", "isLinkedParent");

      const label = document.createElement("LABEL");
      label.innerText = "Make Linked Parent Style";
      tr.classList.add("fl-field");
      td.classList.add("fl-field-control");
      th.classList.add("fl-field-label");
      th.appendChild(label);
      td.appendChild(checkbox);
      tr.appendChild(th);
      tr.appendChild(td);

      form.querySelector("tbody").appendChild(tr);
      const isLinkedStyle = checkbox.checked;

      form.addEventListener("click", function(e) {
        if (!isLinkedStyle && e.target !== saveButton) return;
        const nameInput = form.querySelector('input[type="text"]');
        const name = nameInput.value;
        const settings = form.querySelector("input.fl-builder-settings-json")
          .value;
        const data = {
          name,
          type,
          node,
          settings,
          action: "create_linked_parent"
        };
        fetch(WP.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          credentials: "same-origin",
          body: toQueryString(data)
        }).then(res => console.log(res));
      });
    }, 1500);
  }
}

window.addEventListener("click", addCustomGlobalSettings);

const toQueryString = data => {
  const urlSearchParams = new URLSearchParams(data);
  const queryString = urlSearchParams.toString();
  return queryString;
};
