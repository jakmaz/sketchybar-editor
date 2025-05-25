import React from "react";
import type { SketchybarItemComponentProps } from "@/lib/item-interface";
import type { Item } from "@/components/sketchybar-editor";
import * as items from "./items-imports";

export interface ItemDefinition {
  // Metadata
  type: string;
  displayName: string;
  description: string;
  authorGithubUsername: string;
  tags: string[];

  // Component
  component: React.ComponentType<SketchybarItemComponentProps>;

  // Configuration
  defaultIcon?: string;
  defaultLabel?: string;
  updateFrequency?: number;
  requiresPlugin: boolean;

  // Plugin info
  pluginScript?: string;

  // Validation
  validateConfig?: (config: Record<string, unknown>) => boolean;

  // Generation
  generateItemConfig: (itemName: string) => string;
}

const itemRegistry: Record<string, ItemDefinition> = {};

// Mark imported items as Record<string, ItemDefinition>
const importedItems: Record<string, ItemDefinition> = items;

for (const def of Object.values(importedItems)) {
  if (validateItemDefinition(def)) {
    itemRegistry[def.type] = def;
  }
}

function validateItemDefinition(def: Partial<ItemDefinition>): def is ItemDefinition {
  return (
    typeof def.type === "string" &&
    typeof def.displayName === "string" &&
    typeof def.component === "function" &&
    typeof def.generateItemConfig === "function" &&
    typeof def.requiresPlugin === "boolean"
  );
}

// Helper functions to work with the registry
export function getItemTypes(): string[] {
  return Object.keys(itemRegistry);
}

export function getItemDefinition(type: string): ItemDefinition | undefined {
  return itemRegistry[type];
}

export function getAllItemDefinitions(): ItemDefinition[] {
  return Object.values(itemRegistry);
}

export function getRequiredPlugins(items: Item[]): string[] {
  const uniqueTypes = new Set(items.map((item) => item.type));
  return Object.values(itemRegistry)
    .filter(
      (def) =>
        uniqueTypes.has(def.type) &&
        def.requiresPlugin &&
        def.pluginScript
    )
    .map((def) => def.type);
}

export function getItemsByTag(tag: string): ItemDefinition[] {
  return Object.values(itemRegistry).filter((item) =>
    item.tags?.includes(tag)
  );
}

export function searchItems(query: string): ItemDefinition[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(itemRegistry).filter(
    (item) =>
      item.displayName.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export default itemRegistry;
