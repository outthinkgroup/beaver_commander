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
function addSaveAsLinkedStyleBtn(e) {
  console.log("heool");
  console.log(e.target.classList);
  if (e.target.classList.contains("fl-module-overlay")) {
    setTimeout(() => {
      console.log(document.querySelector(".fl-builder-settings"));
      /* 
      

      
      const form = saveButton.closest("[data-node]");
      const node = form.dataset.node;
      const editingElement = document.querySelector(
        `.fl-module.fl-node-${node}`
      );
      if (!editingElement) return;

      const type = editingElement.dataset.type;

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
      }); */
    }, 1500);
  }
}

window.addEventListener("click", addSaveAsLinkedStyleBtn);

const toQueryString = data => {
  const urlSearchParams = new URLSearchParams(data);
  const queryString = urlSearchParams.toString();
  return queryString;
};
