import { useState } from "react"
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ConfigFile } from "@/lib/generate-config"

interface FileExplorerProps {
  files: ConfigFile[]
  onFileSelect: (file: ConfigFile) => void
}

export function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  return (
    <div className="border rounded-md p-2 bg-muted/30 h-full overflow-auto">
      <div className="text-sm font-medium mb-2">Files</div>
      <div className="space-y-1">
        {files.map((file) => (
          <FileTreeItem key={file.path} file={file} onFileSelect={onFileSelect} />
        ))}
      </div>
    </div>
  )
}

interface FileTreeItemProps {
  file: ConfigFile
  onFileSelect: (file: ConfigFile) => void
  level?: number
}

function FileTreeItem({ file, onFileSelect, level = 0 }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleOpen = () => {
    if (file.type === "directory") {
      setIsOpen(!isOpen)
    }
  }

  const handleFileClick = () => {
    if (file.type === "file") {
      onFileSelect(file)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1 px-2 rounded-md text-sm",
          file.type === "file" ? "hover:bg-muted cursor-pointer" : "",
          "transition-colors",
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={file.type === "directory" ? toggleOpen : handleFileClick}
      >
        {file.type === "directory" ? (
          <>
            <button
              className="mr-1 h-4 w-4 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                toggleOpen()
              }}
            >
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            <Folder className="h-4 w-4 mr-2 text-muted-foreground" />
          </>
        ) : (
          <>
            <div className="w-5 mr-1" />
            <File className="h-4 w-4 mr-2 text-muted-foreground" />
          </>
        )}
        <span>{file.name}</span>
      </div>

      {file.type === "directory" && isOpen && file.children && (
        <div>
          {file.children.map((child) => (
            <FileTreeItem key={child.path} file={child} onFileSelect={onFileSelect} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
