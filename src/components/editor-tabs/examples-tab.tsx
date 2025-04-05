"use client";

import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import type { SketchybarConfig } from "@/components/sketchybar-editor";

interface ExamplesTabProps {
  config: SketchybarConfig;
  setConfig: Dispatch<SetStateAction<SketchybarConfig>>;
}

export function ExamplesTab({ config, setConfig }: ExamplesTabProps) {
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
      barColor: "0x282c34",
      backgroundColor: "0x282c34",
      iconColor: "0x61afef",
      labelColor: "0xabb2bf",
    },
    {
      name: "Dracula",
      barColor: "0x282a36",
      backgroundColor: "0x282a36",
      iconColor: "0xbd93f9",
      labelColor: "0xf8f8f2",
    },
    {
      name: "GitHub",
      barColor: "0x24292e",
      backgroundColor: "0x24292e",
      iconColor: "0x79b8ff",
      labelColor: "0xd1d5da",
    },
    {
      name: "Monokai Pro",
      barColor: "0x2d2a2e",
      backgroundColor: "0x2d2a2e",
      iconColor: "0xa9dc76",
      labelColor: "0xfcfcfa",
    },
    {
      name: "Night Owl",
      barColor: "0x011627",
      backgroundColor: "0x011627",
      iconColor: "0x82aaff",
      labelColor: "0xd6deeb",
    },
    {
      name: "Ayu",
      barColor: "0x0f1419",
      backgroundColor: "0x0f1419",
      iconColor: "0xe6b450",
      labelColor: "0xb3b1ad",
    },
    {
      name: "Catppuccin",
      barColor: "0x1e1e2e",
      backgroundColor: "0x1e1e2e",
      iconColor: "0xf5e0dc",
      labelColor: "0xcdd6f4",
    },
    {
      name: "Tokyo Night",
      barColor: "0x1a1b26",
      backgroundColor: "0x1a1b26",
      iconColor: "0x7aa2f7",
      labelColor: "0xc0caf5",
    },
    {
      name: "Kanagawa",
      barColor: "0x1f1f28",
      backgroundColor: "0x1f1f28",
      iconColor: "0xe6c384",
      labelColor: "0xdcd7ba",
    },
    {
      name: "Nord",
      barColor: "0x2e3440",
      backgroundColor: "0x2e3440",
      iconColor: "0x88c0d0",
      labelColor: "0xe5e9f0",
    },
  ];

  return (
    <div className="space-y-4">
      {themes.map((theme) => (
        <Button
          key={theme.name}
          onClick={() => applyTheme(theme)}
          className="w-full"
        >
          {theme.name}
        </Button>
      ))}
    </div>
  );
}
