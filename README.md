# Sketchybar Editor

## Description

A web-based tool for creating Sketchybar configurations visually. This editor provides an intuitive interface to customize your macOS status
bar without writing code directly.

## Features

- **Visual Configuration:** Adjust settings using interactive controls instead of editing files manually
- **Real-time Preview:** See changes instantly in a live preview
- **Downloadable Config:** Generate and download a ready-to-use `.sketchybarrc` file
- **Customization Options:** Modify bar properties including:
  - Color, position, height, padding
  - Corner radius, font size, font family
  - Add and configure various items

## How to Use

1. Use the editor to customize your Sketchybar
2. Click the "Download Config" button to get your `.sketchybarrc` file
3. Move the file to your Sketchybar configuration directory (usually `~/.sketchybarrc`)
4. Restart Sketchybar to apply the configuration:
   ```bash
   sketchybar --restart
   ```

## Contributing

Contributions to improve Sketchybar Editor are welcome! Here's how you can contribute:

### Adding New Items

The most common contribution is adding new item types:

1. Create a new item definition file in `/src/items/` directory
2. Follow the existing item structure (see examples like `apple.tsx` or `battery.tsx`)
3. Register your item in `src/lib/items-imports.tsx` by adding a named export

Example of a basic item structure:

```ts
function AppleItem({ itemSettings }: SketchybarItemComponentProps) {
  return <BaseItem itemSettings={itemSettings} icon={"󰀵"} />;
}

export const appleItemDefinition: ItemDefinition = {
  type: 'apple',
  displayName: 'Apple Logo',
  description: 'Shows the Apple logo',
  tags: ['logo', 'system'],
  component: AppleItem,
  requiresPlugin: false,
  defaultIcon: "󰀵",
  generateItemConfig: (itemName) => `sketchybar --set ${itemName} icon=󰀵\n`
}
```

### Other Contributions

We also welcome contributions in these areas:

- UI/UX improvements
- Performance optimizations
- Bug fixes
- New features and functionality
- Documentation improvements

To contribute, fork the repository, make your changes, and submit a pull request with a clear description of your modifications.

## License

[MIT License](LICENSE)

## Acknowledgments

This project is built for use with [Sketchybar](https://github.com/FelixKratz/SketchyBar), a customizable status bar for macOS.
