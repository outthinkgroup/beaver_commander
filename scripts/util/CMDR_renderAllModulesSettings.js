export default function CMDR_renderAllModuleSettings(
  modulesArray,
  cb,
  increment
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
      cb();

      if (modulesArray.length <= increment) {
        console.log("done");
        return;
      } else {
        CMDR_renderAllModuleSettings(modulesArray, cb, increment);
      }
    }
  );
}
