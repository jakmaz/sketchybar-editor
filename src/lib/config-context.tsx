"use client"

import { createContext, Dispatch, SetStateAction, useContext, useState, type ReactNode } from "react"
import type { Config } from "@/components/sketchybar-editor"

// Define the context type
interface ConfigContextType {
	config: Config
	setConfig: Dispatch<SetStateAction<Config>>
}


// Create the context with a default value
const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

// Default configuration
const defaultConfig: Config = {
	bar: {
		color: "0xff121212",
		position: "top",
		height: 40,
		padding: 8,
		cornerRadius: 8,
	},
	defaults: {
		backgroundColor: "0xff3f3f3f",
		iconColor: "0xffffffff",
		labelColor: "0xffffffff",
		paddingLeft: 5,
		paddingRight: 5,
		iconFont: "Hack Nerd Font:Bold:17.0",
		labelFont: "Hack Nerd Font:Bold:14.0",
		backgroundCornerRadius: 5,
		backgroundHeight: 26,
		iconPaddingLeft: 10,
		iconPaddingRight: 4,
		labelPaddingLeft: 4,
		labelPaddingRight: 10,
	},
	items: [
		{
			id: "apple",
			type: "apple",
			position: "left",
			overrides: {
				iconPaddingRight: 10,
			},
		},
		{
			id: "media",
			type: "media",
			position: "center",
			overrides: {
				backgroundColor: "0xff121212",
			},
		},
		{
			id: "cpu",
			type: "cpu",
			position: "right",
		},
		{
			id: "battery",
			type: "battery",
			position: "right",
		},
		{
			id: "clock",
			type: "clock",
			position: "right",
		},
	],
}

// Create a provider component
export function ConfigProvider({ children }: { children: ReactNode }) {
	const [config, setConfig] = useState<Config>(defaultConfig)

	return <ConfigContext.Provider value={{ config, setConfig }}>{children}</ConfigContext.Provider>
}

// Create a custom hook to use the context
export function useConfig() {
	const context = useContext(ConfigContext)
	if (context === undefined) {
		throw new Error("useConfig must be used within a ConfigProvider")
	}
	return context
}
