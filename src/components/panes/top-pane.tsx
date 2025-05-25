import { useState } from "react"

import Link from "next/link"
import { Github, Moon, PencilRuler, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { ConfigDialog } from "../config-dialog"
import { InfoDialog } from "../info-dialog"

export default function TopPane() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <Card className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-foreground p-1 rounded-md"><PencilRuler className="text-background h-6 w-6" /></div>
          <h1 className="text-2xl font-bold">Sketchybar Editor</h1>
        </div>
        <div className="flex gap-2">
          {/* Github */}
          <Link href="https://github.com/jakmaz/sketchybar-editor" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </Link>

          {/* Info */}
          <InfoDialog />

          {/* Dark Mode */}
          <Button variant="outline" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Download */}
          <ConfigDialog />
        </div>
      </div>

      {/* Config Dialog */}
    </Card >
  )
}
