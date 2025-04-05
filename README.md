# Sketchybar Editor

## Description

The Sketchybar Editor is a user-friendly, web-based tool designed to simplify the creation of basic Sketchybar configurations.  It provides a visual interface to customize your status bar, making it easier for both new and experienced users to generate `.sketchybarrc` files without needing to write code directly. This editor allows you to quickly adjust and preview common settings, streamlining the process of setting up your Sketchybar.

## Features

*   **Visual Configuration:** Easily adjust Sketchybar settings using sliders, color pickers, and dropdown menus, eliminating the need to manually edit configuration files.
*   **Real-time Preview:** See your changes instantly reflected in a live preview, ensuring you get the exact look and feel you desire.
*   **Downloadable Config:** Generate and download a ready-to-use `.sketchybarrc` file with your customized settings.
*   **Basic Customization Options:**  Customize fundamental bar properties, including:
    *   Color: Set the bar's background color using a color picker.
    *   Position: Choose whether the bar appears at the top or bottom of the screen.
    *   Height: Adjust the bar's height to fit your content.
    *   Padding: Control the spacing around the bar's elements.
    *   Corner Radius:  Round the corners of the bar for a softer appearance.
    *   Font Size: Set the default font size for text elements in the bar.
    *   Font Family: Select from a range of font families to match your system.

## How to Use

1.  Use the editor to customize your Sketchybar.
2.  Click the "Download Config" button to download the generated `.sketchybarrc` file.
3.  Move the downloaded `.sketchybarrc` file to your Sketchybar configuration directory (usually `~/.sketchybarrc`).
4.  Restart Sketchybar to apply the new configuration:

    ```bash
    sketchybar --restart
    ```

## Contributing

This project is open source, and contributions are highly appreciated! If you have suggestions, bug reports, or would like to contribute code, please visit the [GitHub repository](<repository_url>).

## License

[MIT License](LICENSE)

## Acknowledgments

*   This project is inspired by and built for use with [Sketchybar](https://github.com/FelixKratz/SketchyBar), a customizable status bar for macOS.

