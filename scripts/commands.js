// OPEN SETTINGS COMMANDS
(function() {
  function openParentColumnSettings() {
    const module = document.querySelector(".fl-module-overlay");
    if (!module) {
      return null;
    }
    const col = module.closest(".fl-col");
    const parent = col.parentElement.closest(".fl-col");
    if (!parent) {
      return null;
    }
    const nodeId = parent.dataset.node;
    const global = module.closest(".fl-block-overlay-global") ? true : false;

    FLBuilderSettingsForms.render({
      id: "col",
      nodeId: nodeId,
      className: "fl-builder-col-settings",
      attrs: 'data-node="' + nodeId + '"',
      buttons:
        !global && !FLBuilderConfig.lite && !FLBuilderConfig.simpleUi
          ? ["save-as"]
          : [],
      badges: global ? [FLBuilderStrings.global] : [],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      preview: {
        type: "col"
      }
    });
  }
  function shortcutHook() {
    // Register a hook listener using the key that you registered
    // your shortcut with along with the function it should fire.
    FLBuilder.addHook("openParentColumnSettings", openParentColumnSettings);
  }
  window.addEventListener("load", shortcutHook);
})();

(function() {
  function openColumnSettings() {
    /* 
    1. set up hover listener
      - needs to grab:
         module that is hovered
         modules column node id = `fl-col.dataset.node
    2. excute FLBuilderSettingsForms.render(config, callback)
      - 2. pass settings (argument 1)
      - 3. pass callback (argrument 2)

    */
    const module = document.querySelector(".fl-module-overlay");
    if (!module) {
      return null;
    }
    const col = module.closest(".fl-col");
    const nodeId = col.dataset.node;
    const global = module.closest(".fl-block-overlay-global") ? true : false;

    FLBuilderSettingsForms.render({
      id: "col",
      nodeId: nodeId,
      className: "fl-builder-col-settings",
      attrs: 'data-node="' + nodeId + '"',
      buttons:
        !global && !FLBuilderConfig.lite && !FLBuilderConfig.simpleUi
          ? ["save-as"]
          : [],
      badges: global ? [FLBuilderStrings.global] : [],
      settings: FLBuilderSettingsConfig.nodes[nodeId],
      preview: {
        type: "col"
      }
    });
  }
  function shortcutHookColumn() {
    // Register a hook listener using the key that you registered
    // your shortcut with along with the function it should fire.
    FLBuilder.addHook("openColumnSettings", openColumnSettings);
  }
  window.addEventListener("load", shortcutHookColumn);
})();
(function() {
  function openModulesAdvancedTab() {
    const module = document
      .querySelector(".fl-module-overlay")
      .closest(".fl-module");
    console.log(module);
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
        //makes the advanced tab open
        const settings = document.querySelector(".fl-builder-module-settings");
        const tabBar = settings.querySelector(".fl-builder-settings-tabs");
        tabBar.querySelector(".fl-active").classList.remove("fl-active");

        const advancedTab = tabBar.querySelector(
          `[href = "#fl-builder-settings-tab-advanced"]`
        );
        advancedTab.classList.add("fl-active");
      }
    );
  }
  function shortcutHookColumn() {
    // Register a hook listener using the key that you registered
    // your shortcut with along with the function it should fire.
    FLBuilder.addHook("openModulesAdvancedTab", openModulesAdvancedTab);
  }
  window.addEventListener("load", shortcutHookColumn);
})();

(function() {
  function openColAdvancedTab() {
    const module = document.querySelector(".fl-module-overlay");
    if (!module) {
      return null;
    }
    const col = module.closest(".fl-col");
    const nodeId = col.dataset.node;
    const global = module.closest(".fl-block-overlay-global") ? true : false;

    FLBuilderSettingsForms.render(
      {
        id: "col",
        nodeId: nodeId,
        className: "fl-builder-col-settings",
        attrs: 'data-node="' + nodeId + '"',
        buttons:
          !global && !FLBuilderConfig.lite && !FLBuilderConfig.simpleUi
            ? ["save-as"]
            : [],
        badges: global ? [FLBuilderStrings.global] : [],
        settings: FLBuilderSettingsConfig.nodes[nodeId],
        preview: {
          type: "col"
        }
      },
      function() {
        //makes the advanced tab open
        const settings = document.querySelector(".fl-builder-module-settings");
        const tabBar = settings.querySelector(".fl-builder-settings-tabs");
        tabBar.querySelector(".fl-active").classList.remove("fl-active");

        const advancedTab = tabBar.querySelector(
          `[href = "#fl-builder-settings-tab-advanced"]`
        );
        advancedTab.classList.add("fl-active");
      }
    );
  }
  function shortcutHookColumn() {
    FLBuilder.addHook("openColAdvancedTab", openColAdvancedTab);
  }
  window.addEventListener("load", shortcutHookColumn);
})();
