//! this dont work!!
export default function() {
  const iframe = document.querySelector(
    ".fl-builder-settings-section-content .mce-edit-area iframe"
  );
  iframe.contentWindow.document.body.innerHTML = "";
}
