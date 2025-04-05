import type { Dispatch, SetStateAction } from "react"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { BarTab } from "./editor-tabs/bar-tab"
import { DefaultsTab } from "./editor-tabs/defaults-tab"
import { ExamplesTab } from "./editor-tabs/examples-tab"

import { Config } from "./sketchybar-editor"

interface SidebarProps {
  config: Config
  setConfig: Dispatch<SetStateAction<Config>>
}

export function SidebarPane({ config, setConfig }: SidebarProps) {
  return (
    <Card className="lg:w-80 p-4">
      <Tabs defaultValue="bar">
        <TabsList className="grid grid-cols-3 mb-4 w-full">
          <TabsTrigger value="bar">Bar</TabsTrigger>
          <TabsTrigger value="defaults">Defaults</TabsTrigger>
          <TabsTrigger value="examples">Configs</TabsTrigger>
        </TabsList>

        <TabsContent value="bar">
          <BarTab config={config} setConfig={setConfig} />
        </TabsContent>

        <TabsContent value="defaults">
          <DefaultsTab config={config} setConfig={setConfig} />
        </TabsContent>

        <TabsContent value="examples">
          <ExamplesTab config={config} setConfig={setConfig} />
        </TabsContent>
      </Tabs>
    </Card>

  )
}
