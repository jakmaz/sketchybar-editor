"use client";

import type { SketchybarItemComponentProps } from "./item-interface";
import { BaseItem } from "./base-item";
import { useState, useEffect } from "react";

export function CpuItem({ config }: SketchybarItemComponentProps) {
  const [cpuUsage, setCpuUsage] = useState<number>(20); // Start at 20%

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a random change between -5 and +5
      const randomChange = Math.floor(Math.random() * 11) - 5; // -5 to 5

      // Calculate the new CPU usage, ensuring it stays within 0-100
      const newCpuUsage = Math.max(
        0,
        Math.min(100, cpuUsage + randomChange)
      );

      setCpuUsage(newCpuUsage);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [cpuUsage]); // Add cpuUsage as a dependency
  // so the interval restarts when cpuUsage changes.

  return <BaseItem config={config} icon={""} label={`${cpuUsage}%`} />;
}
