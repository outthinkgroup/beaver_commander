export default function CMDR_renderAllRowSettings(modulesArray, cb, increment) {
  const module = modulesArray[increment];

  increment++;

  const nodeId = module.dataset.node;

  FLBuilderSettingsForms.render(
    {
      id: `row`,
      nodeId: nodeId,
      className: `fl-builder-col-settings`,
      attrs: 'data-node="' + nodeId + `" `,
      buttons: ["save"],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      preview: {
        type: `row`
      }
    },
    function() {
      //recursively calls itself to loop through all the array in order
      cb();

      if (modulesArray.length <= increment) {
        console.log("done");
        return;
      } else {
        CMDR_renderAllRowSettings(modulesArray, cb, increment);
      }
    }
  );
}
