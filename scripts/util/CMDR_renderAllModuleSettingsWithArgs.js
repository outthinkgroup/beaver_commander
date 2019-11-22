/**
 *
 * @param {NODELIST} modulesArray list of nodes that will be looped through
 * @param {FUNCTION} cb that is called after form is rendered
 * @param {INT} increment always zero
 * @param {STRING} inputName name of input that should be changed
 * @param {STRING} newValue new value of input
 */
export default function CMDR_renderAllModuleSettingsWithArgs(
  modulesArray,
  cb,
  increment,
  inputName,
  newValue
) {
  const module = modulesArray[increment];

  increment++;

  const nodeId = module.dataset.node;
  FLBuilderSettingsForms.render(
    {
      id: `${module.dataset.type}`,
      nodeId: nodeId,
      className: `fl-builder-module-settings  fl-builder-${
        module.dataset.type
      }-settings`,
      attrs:
        'data-node="' +
        nodeId +
        `" data-type=${module.dataset.type} novalidate="novalidate" `,
      buttons: ["save"],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      type: "module",
      preview: {
        type: `${module.dataset.type}`
      }
    },
    function() {
      //recursively calls itself to loop through all the array in order
      cb(inputName, newValue);

      if (modulesArray.length <= increment) {
        console.log("done");
        return;
      } else {
        CMDR_renderAllModuleSettingsWithArgs(
          modulesArray,
          cb,
          increment,
          inputName,
          newValue
        );
      }
    }
  );
}
