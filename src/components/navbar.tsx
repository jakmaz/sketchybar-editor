"use client"

import { useState } from "react"

import Link from "next/link"
import { Clipboard, Download, Github, Info, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { generateConfigFiles } from "@/lib/generate-config"
import type { Config } from "./sketchybar-editor"
import type { ConfigFile } from "@/lib/generate-config"
import { FileExplorer } from "./file-explorer"

import { toast } from "sonner"

export default function Navbar({ config }: { config: Config }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [configFiles, setConfigFiles] = useState<ConfigFile[]>([])
  const [selectedFile, setSelectedFile] = useState<ConfigFile | null>(null)

  const handleShowConfig = () => {
    // Generate sketchybar config files
    const files = generateConfigFiles(config)
    setConfigFiles(files)

    // Select the main file by default
    const mainFile = files.find((file) => file.name === ".sketchybarrc")
    setSelectedFile(mainFile || null)

    setIsConfigDialogOpen(true)
  }

  const handleFileSelect = (file: ConfigFile) => {
    setSelectedFile(file)
  }

  const handleDownload = () => {
    if (!selectedFile) return

    // Create a blob and download it
    const blob = new Blob([selectedFile.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = selectedFile.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast(`${selectedFile.name} downloaded`, {
      description: `Your file has been downloaded.`,
    })
  }

  const handleCopyToClipboard = () => {
    if (!selectedFile) return

    navigator.clipboard.writeText(selectedFile.content)
    toast("File content copied", {
      description: `${selectedFile.name} has been copied to clipboard.`,
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
          {/* Github */}
          <Link href="https://github.com/jakmaz/sketchybar-editor" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </Link>

          {/* Info */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sketchybar Editor</DialogTitle>
                <DialogDescription>
                  Sketchybar Editor is a simple web interface to get you started with configuring your very own rice!
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Dark Mode */}
          <Button variant="outline" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Download */}
          <Button onClick={handleShowConfig}>
            <Download className="h-4 w-4" />
            View Config
          </Button>
        </div>
      </div>

      {/* Config Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="min-w-7xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Sketchybar Configuration</DialogTitle>
            <DialogDescription>
              Here&apos;s your generated sketchybar configuration files. Select a file to view its content.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-4 h-[60vh] mt-4 mb-6">
            {/* File Explorer */}
            <div className="w-1/4 h-full">
              <FileExplorer files={configFiles} onFileSelect={handleFileSelect} />
            </div>

            {/* File Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {selectedFile && (
                <>
                  <div className="text-sm font-medium mb-2 px-2">{selectedFile.path}</div>
                  <pre className="flex-1 p-4 bg-muted rounded-md text-sm overflow-auto whitespace-pre">
                    {selectedFile.content}
                  </pre>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCopyToClipboard} disabled={!selectedFile}>
              <Clipboard className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
            <Button onClick={handleDownload} disabled={!selectedFile}>
              <Download className="mr-2 h-4 w-4" />
              Download File
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
