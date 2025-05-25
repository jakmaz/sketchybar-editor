import type { Config, Item, Overrides } from "@/components/sketchybar-editor";
import { getItemDefinition, getRequiredPlugins } from "./item-registry";

export interface ConfigFile {
  name: string;
  path: string;
  content: string;
  type: "file" | "directory";
  children?: ConfigFile[];
}

export function generateConfigFiles(config: Config): ConfigFile[] {
  const files: ConfigFile[] = [];

  // Main .sketchybarrc file
  files.push({
    name: ".sketchybarrc",
    path: ".sketchybarrc",
    content: generateMainConfig(config),
    type: "file",
  });

  // Create items directory
  const itemsDir: ConfigFile = {
    name: "items",
    path: "items",
    content: "",
    type: "directory",
    children: [],
  };

  // Create plugins directory
  const pluginsDir: ConfigFile = {
    name: "plugins",
    path: "plugins",
    content: "",
    type: "directory",
    children: [],
  };

  // Generate item files
  for (const item of config.items) {
    const itemFile: ConfigFile = {
      name: `${item.id}.sh`,
      path: `items/${item.id}.sh`,
      content: generateItemFile(item),
      type: "file",
    };
    itemsDir.children?.push(itemFile);
  }

  // Generate plugin files
  const requiredPlugins = getRequiredPlugins(config.items);

  for (const type of requiredPlugins) {
    const itemDef = getItemDefinition(type);
    if (itemDef && itemDef.pluginScript) {
      const pluginFile: ConfigFile = {
        name: `${type}.sh`,
        path: `plugins/${type}.sh`,
        content: "#!/bin/bash\n\n" + itemDef.pluginScript,
        type: "file",
      };
      pluginsDir.children?.push(pluginFile);
    }
  }

  files.push(itemsDir);
  files.push(pluginsDir);

  return files;
}

function generateMainConfig(config: Config): string {
  return `#!/bin/bash

# Define directories
PLUGIN_DIR="$CONFIG_DIR/plugins"
ITEM_DIR="$CONFIG_DIR/items"

# Colors
BAR_COLOR=${config.bar.color}
ITEM_BG_COLOR=${config.defaults.backgroundColor}
ITEM_LABEL_COLOR=${config.defaults.labelColor}
ITEM_ICON_COLOR=${config.defaults.iconColor}

# Bar Appearance
bar=(
  color=$BAR_COLOR
  position=${config.bar.position}
  height=${config.bar.height}
  padding_left=${config.bar.padding}
  padding_right=${config.bar.padding}
  corner_radius=${config.bar.cornerRadius}
)

sketchybar --bar "\${bar[@]}"

# Defaults
default=(
  background.color=$ITEM_BG_COLOR
  icon.color=$ITEM_ICON_COLOR
  label.color=$ITEM_LABEL_COLOR
  padding_left=${config.defaults.paddingLeft}
  padding_right=${config.defaults.paddingRight}
  icon.font="${config.defaults.iconFont}"
  label.font="${config.defaults.labelFont}"
  background.corner_radius=${config.defaults.backgroundCornerRadius}
  background.height=${config.defaults.backgroundHeight}
  icon.padding_left=${config.defaults.iconPaddingLeft}
  icon.padding_right=${config.defaults.iconPaddingRight}
  label.padding_left=${config.defaults.labelPaddingLeft}
  label.padding_right=${config.defaults.labelPaddingRight}
)

sketchybar --default "\${default[@]}"

# Source item configs in order
${config.items
  .map((item) => {
    return `source "$ITEM_DIR/${item.id}.sh"`;
  })
  .join("\n")}

# Finalizing setup
sketchybar --update

# Generated with Sketchybar Editor #
`;
}

function generateItemFile(item: Item): string {
  const itemDef = getItemDefinition(item.type);

  let content = "#!/bin/bash\n\n";

  content += `# Initialization
sketchybar --add item ${item.id} ${item.position}\n
`;

  if (itemDef && itemDef.generateItemConfig) {
    content += "# Config\n";
    content += itemDef.generateItemConfig(item.id);
  }

  // Overrides
  const overrideKeyMap: Record<keyof Overrides, string> = {
    backgroundColor: "background.color",
    iconColor: "icon.color",
    labelColor: "label.color",
    paddingLeft: "padding_left",
    paddingRight: "padding_right",
    iconPaddingLeft: "icon.padding_left",
    iconPaddingRight: "icon.padding_right",
    labelPaddingLeft: "label.padding_left",
    labelPaddingRight: "label.padding_right",
    backgroundCornerRadius: "background.corner_radius",
    backgroundHeight: "background.height",
    iconFont: "icon.font",
    labelFont: "label.font",
  };

  if (item.overrides) {
    const overrides: string[] = [];

    for (const [key, configKey] of Object.entries(overrideKeyMap) as [keyof Overrides, string][]) {
      const val = item.overrides[key];
      if (val !== undefined && val !== null && val !== "") {
        overrides.push(`${configKey}=${val}`);
      }
    }

    content += "\n\n# Overrides of default settings\n";
    if (overrides.length > 0) {
      content += `sketchybar --set ${item.id} ${overrides.join(" ")}\n`;
    }
  }

  return content;
}
