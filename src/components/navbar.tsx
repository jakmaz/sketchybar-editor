"use client"

import { useState } from "react"

import Link from "next/link"
import { Download, Github, Info, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { generateSketchybarCode } from "@/lib/generate-config"
import { SketchybarConfig } from "./sketchybar-editor"

import { toast } from "sonner"

export default function Navbar({ config }: { config: SketchybarConfig }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleDownload = () => {
    // Generate sketchybarrc code based on config
    const code = generateSketchybarCode(config)

    // Create a blob and download it
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = ".sketchybarrc"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast("Configuration downloaded", {
      description: "Your sketchybar configuration has been downloaded.",
    })
  }
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sketchybar Editor</h1>
        <div className="flex gap-2">
          <Link href="https://github.com/jakmaz/sketchybar-editor" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="icon">
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Config
          </Button>
        </div>
      </div>
    </Card>

  )
}
