export default function getAllModuleTypes() {
  const allModules = document.querySelectorAll(".fl-module");
  return [...allModules].map(bbModule => bbModule.dataset.type);
}
