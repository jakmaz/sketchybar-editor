"use client";

import { Button } from "@/components/ui/button";
import { useConfig } from "@/lib/config-context";

export function ExamplesTab() {
  const { setConfig } = useConfig()

  const applyTheme = (theme: {

    barColor: string;
    backgroundColor: string;
    iconColor: string;
    labelColor: string;
  }) => {
    setConfig((prev) => ({
      ...prev,
      bar: {
        ...prev.bar,
        color: theme.barColor,
      },
      defaults: {
        ...prev.defaults,
        backgroundColor: theme.backgroundColor,
        iconColor: theme.iconColor,
        labelColor: theme.labelColor,
      },
    }));
  };

  const themes = [
    {
      name: "One Dark Pro",
      barColor: "#21252b",
      backgroundColor: "#282c34",
      iconColor: "#61afef",
      labelColor: "#abb2bf",
    },
    {
      name: "Dracula",
      barColor: "#44475a",
      backgroundColor: "#282a36",
      iconColor: "#bd93f9",
      labelColor: "#f8f8f2",
    },
    {
      name: "GitHub",
      barColor: "#161b22",
      backgroundColor: "#24292e",
      iconColor: "#79b8ff",
      labelColor: "#d1d5da",
    },
    {
      name: "Monokai Pro",
      barColor: "#3e3d39",
      backgroundColor: "#2d2a2e",
      iconColor: "#a9dc76",
      labelColor: "#fcfcfa",
    },
    {
      name: "Night Owl",
      barColor: "#0b2a4b",
      backgroundColor: "#011627",
      iconColor: "#82aaff",
      labelColor: "#d6deeb",
    },
    {
      name: "Ayu",
      barColor: "#090e11",
      backgroundColor: "#0f1419",
      iconColor: "#e6b450",
      labelColor: "#b3b1ad",
    },
    {
      name: "Catppuccin",
      barColor: "#302d41",
      backgroundColor: "#1e1e2e",
      iconColor: "#f5e0dc",
      labelColor: "#cdd6f4",
    },
    {
      name: "Tokyo Night",
      barColor: "#161821",
      backgroundColor: "#1a1b26",
      iconColor: "#7aa2f7",
      labelColor: "#c0caf5",
    },
    {
      name: "Kanagawa",
      barColor: "#2a2a37",
      backgroundColor: "#1f1f28",
      iconColor: "#e6c384",
      labelColor: "#dcd7ba",
    },
    {
      name: "Nord",
      barColor: "#3b4252",
      backgroundColor: "#2e3440",
      iconColor: "#88c0d0",
      labelColor: "#e5e9f0",
    },
  ];

  return (
    <div className="space-y-4">
      {themes.map((theme) => (
        <Button
          key={theme.name}
          onClick={() => applyTheme(theme)}
          className="w-full"
          style={{
            backgroundColor: theme.barColor,
            color: theme.iconColor,
          }}
        >
          {theme.name}
        </Button>
      ))}
    </div>
  );
}
