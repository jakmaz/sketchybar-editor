import { SketchybarEditor } from "@/components/sketchybar-editor"

export default function Home() {
  return (
    <main className="font-sans min-h-screen bg-slate-50 dark:bg-background">
      {/* Mobile message - only visible on small screens */}
      <div className="md:hidden flex flex-col items-center justify-center h-screen p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Desktop Only</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This application is designed for larger screens. Please access it on a desktop or tablet device.
        </p>
      </div>

      {/* Main app - hidden on small screens */}
      <div className="hidden md:block">
        <SketchybarEditor />
      </div>
    </main>
  )
}

