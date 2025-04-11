import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileExplorer } from "@/components/file-explorer"
import { Textarea } from "@/components/ui/textarea"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Download, Clipboard, Import } from "lucide-react"
import { useState } from "react"
import { ConfigFile, generateConfigFiles } from "@/lib/generate-config"
import { useConfig } from "@/lib/config-context"
import { toast } from "sonner"


export function ConfigDialog() {
  const { config, setConfig } = useConfig()

  const [, setIsConfigDialogOpen] = useState(false)
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleShowConfig}>
          <Download className="h-4 w-4" />
          View Config
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-7xl max-h-[80vh] flex flex-col h-[900px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Sketchybar Configuration</DialogTitle>
          <DialogDescription>View, export, or import your sketchybar configuration.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4 flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="import">Import</TabsTrigger>
          </TabsList>

          {/* Files Tab */}
          <TabsContent value="files" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex gap-4 flex-1 overflow-hidden">
              {/* File Explorer */}
              <div className="w-1/4 overflow-auto">
                <FileExplorer files={configFiles} onFileSelect={handleFileSelect} />
              </div>

              {/* File Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {selectedFile && (
                  <>
                    <div className="text-sm font-medium mb-2 px-2">{selectedFile.path}</div>
                    <pre className="flex-1 p-4 bg-muted rounded-md text-sm font-hack-mono whitespace-pre overflow-auto">
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
          <TabsContent value="export" className="flex-1 flex flex-col overflow-hidden">
            <pre className="p-4 bg-muted rounded-md text-sm font-mono whitespace-pre overflow-auto flex-1">
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
          <TabsContent value="import" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <Textarea
                className="h-full font-mono text-sm w-full resize-none"
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

  )
}
