"use client"

import type { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import type { SketchybarConfig } from "@/components/sketchybar-editor"

interface ExamplesTabProps {
  config: SketchybarConfig
  setConfig: Dispatch<SetStateAction<SketchybarConfig>>
}

export function ExamplesTab({ config, setConfig }: ExamplesTabProps) {
  const applyTokyoNight = () => {
    setConfig((prev) => ({
      ...prev,
      bar: {
        ...prev.bar,
        color: "#1d252c",
      },
      defaults: {
        ...prev.defaults,
        backgroundColor: "0xff1d252c",
        iconColor: "0xffa9b1d6",
        labelColor: "0xffa9b1d6",
        iconFont: "Hack Nerd Font:Bold:16.0",
        labelFont: "Hack Nerd Font:Bold:12.0",
      },
    }))
  }

  const applyCatppuccin = () => {
    setConfig((prev) => ({
      ...prev,
      bar: {
        ...prev.bar,
        color: "#303446",
      },
      defaults: {
        ...prev.defaults,
        backgroundColor: "0xff303446",
        iconColor: "0xffc6a0f6",
        labelColor: "0xffc6a0f6",
        iconFont: "Hack Nerd Font:Bold:16.0",
        labelFont: "Hack Nerd Font:Bold:12.0",
      },
    }))
  }

  const applyNord = () => {
    setConfig((prev) => ({
      ...prev,
      bar: {
        ...prev.bar,
        color: "#2e3440",
      },
      defaults: {
        ...prev.defaults,
        backgroundColor: "0xff2e3440",
        iconColor: "0xffd8dee9",
        labelColor: "0xffd8dee9",
        iconFont: "Hack Nerd Font:Bold:16.0",
        labelFont: "Hack Nerd Font:Bold:12.0",
      },
    }))
  }

  return (
    <div className="space-y-4">
      <Button onClick={applyTokyoNight} className="w-full">
        Tokyo Night
      </Button>
      <Button onClick={applyCatppuccin} className="w-full">
        Catppuccin
      </Button>
      <Button onClick={applyNord} className="w-full">
        Nord
      </Button>
    </div>
  )
}
