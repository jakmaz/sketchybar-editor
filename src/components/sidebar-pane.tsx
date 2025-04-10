import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { BarTab } from "./editor-tabs/bar-tab"
import { DefaultsTab } from "./editor-tabs/defaults-tab"
import { ExamplesTab } from "./editor-tabs/examples-tab"



export function SidebarPane() {
  return (
    <Card className="lg:w-80 p-4">
      <Tabs defaultValue="bar">
        <TabsList className="grid grid-cols-3 mb-4 w-full">
          <TabsTrigger value="bar">Bar</TabsTrigger>
          <TabsTrigger value="defaults">Defaults</TabsTrigger>
          <TabsTrigger value="examples">Configs</TabsTrigger>
        </TabsList>

        <TabsContent value="bar">
          <BarTab />
        </TabsContent>

        <TabsContent value="defaults">
          <DefaultsTab />
        </TabsContent>

        <TabsContent value="examples">
          <ExamplesTab />
        </TabsContent>
      </Tabs>
    </Card>

  )
}
