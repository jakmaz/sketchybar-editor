import { useState } from "react"

import Link from "next/link"
import { Clipboard, Download, Github, Import, Info, Moon, Sun } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Textarea } from "./ui/textarea"

export default function Navbar({ config, setConfig }: { config: Config, setConfig: any }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [configFiles, setConfigFiles] = useState<ConfigFile[]>([])
  const [selectedFile, setSelectedFile] = useState<ConfigFile | null>(null)
  const [importValue, setImportValue] = useState("")
  const [importError, setImportError] = useState("")
  const [activeTab, setActiveTab] = useState("files")
  const handleShowConfig = () => {
    // Generate sketchybar config files
    const files = generateConfigFiles(config)
    setConfigFiles(files)

    // Select the main file by default
    const mainFile = files.find((file) => file.name === ".sketchybarrc")
    setSelectedFile(mainFile || null)

    // Reset import state
    setImportValue("")
    setImportError("")

    // Set active tab to files by default
    setActiveTab("files")

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
    if (activeTab === "files" && selectedFile) {
      navigator.clipboard.writeText(selectedFile.content)
      toast("File content copied", {
        description: `${selectedFile.name} has been copied to clipboard.`,
      })
    } else if (activeTab === "export") {
      const configJson = JSON.stringify(config, null, 2)
      navigator.clipboard.writeText(configJson)
      toast("Configuration exported", {
        description: "Your configuration has been copied to clipboard.",
      })
    }
  }

  const handleImportChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImportValue(e.target.value)
    setImportError("")
  }

  const handleImportSubmit = () => {
    try {
      // Parse the JSON
      const importedConfig = JSON.parse(importValue)

      // Basic validation
      if (!importedConfig.bar || !importedConfig.defaults || !importedConfig.items) {
        throw new Error("Invalid configuration format. Missing required sections.")
      }

      // More detailed validation could be added here

      // Apply the imported config
      setConfig(importedConfig)

      // Close the dialog and show success message
      setIsConfigDialogOpen(false)
      toast("Configuration imported", {
        description: "Your configuration has been successfully imported.",
      })
    } catch (error) {
      // Show error message
      setImportError(error instanceof Error ? error.message : "Invalid JSON format")
    }
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
            <DialogDescription>View, export, or import your sketchybar configuration.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
              <TabsTrigger value="import">Import</TabsTrigger>
            </TabsList>

            {/* Files Tab */}
            <TabsContent value="files" className="h-[60vh] flex flex-col">
              <div className="flex gap-4 flex-1">
                {/* File Explorer */}
                <div className="w-1/4 h-full">
                  <FileExplorer files={configFiles} onFileSelect={handleFileSelect} />
                </div>

                {/* File Content */}
                <div className="flex-1 flex flex-col">
                  {selectedFile && (
                    <>
                      <div className="text-sm font-medium mb-2 px-2">{selectedFile.path}</div>
                      <pre className="flex-1 p-4 bg-muted rounded-md text-sm font-mono whitespace-pre">
                        {selectedFile.content}
                      </pre>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handleCopyToClipboard} disabled={!selectedFile}>
                  <Clipboard className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
                <Button onClick={handleDownload} disabled={!selectedFile}>
                  <Download className="mr-2 h-4 w-4" />
                  Download File
                </Button>
              </div>
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export">
              <pre className="p-4 bg-muted rounded-md text-sm font-mono whitespace-pre">
                {JSON.stringify(config, null, 2)}
              </pre>

              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={handleCopyToClipboard}>
                  <Clipboard className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
              </div>
            </TabsContent>

            {/* Import Tab */}
            <TabsContent value="import" className="h-[60vh] flex flex-col">
              <div className="flex-1">
                <Textarea
                  className="min-h-[calc(60vh-80px)] font-mono text-sm w-full"
                  placeholder="Paste your configuration JSON here..."
                  value={importValue}
                  onChange={handleImportChange}
                />
                {importError && <p className="text-destructive mt-2 text-sm">{importError}</p>}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={handleImportSubmit} disabled={!importValue.trim()}>
                  <Import className="mr-2 h-4 w-4" />
                  Import Configuration
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
