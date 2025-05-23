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
      barColor: "0xff21252b",
      backgroundColor: "0xff282c34",
      iconColor: "0xff61afef",
      labelColor: "0xffabb2bf",
    },
    {
      name: "Dracula",
      barColor: "0xff44475a",
      backgroundColor: "0xff282a36",
      iconColor: "0xffbd93f9",
      labelColor: "0xfff8f8f2",
    },
    {
      name: "GitHub",
      barColor: "0xff161b22",
      backgroundColor: "0xff24292e",
      iconColor: "0xff79b8ff",
      labelColor: "0xffd1d5da",
    },
    {
      name: "Monokai Pro",
      barColor: "0xff3e3d39",
      backgroundColor: "0xff2d2a2e",
      iconColor: "0xffa9dc76",
      labelColor: "0xfffcfcfa",
    },
    {
      name: "Night Owl",
      barColor: "0xff0b2a4b",
      backgroundColor: "0xff011627",
      iconColor: "0xff82aaff",
      labelColor: "0xffd6deeb",
    },
    {
      name: "Ayu",
      barColor: "0xff090e11",
      backgroundColor: "0xff0f1419",
      iconColor: "0xffe6b450",
      labelColor: "0xffb3b1ad",
    },
    {
      name: "Catppuccin",
      barColor: "0xff302d41",
      backgroundColor: "0xff1e1e2e",
      iconColor: "0xfff5e0dc",
      labelColor: "0xffcdd6f4",
    },
    {
      name: "Tokyo Night",
      barColor: "0xff161821",
      backgroundColor: "0xff1a1b26",
      iconColor: "0xff7aa2f7",
      labelColor: "0xffc0caf5",
    },
    {
      name: "Kanagawa",
      barColor: "0xff2a2a37",
      backgroundColor: "0xff1f1f28",
      iconColor: "0xffe6c384",
      labelColor: "0xffdcd7ba",
    },
    {
      name: "Nord",
      barColor: "0xff3b4252",
      backgroundColor: "0xff2e3440",
      iconColor: "0xff88c0d0",
      labelColor: "0xffe5e9f0",
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
