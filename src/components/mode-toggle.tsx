"use client"

import * as React from "react"
import { Moon, Sun, Flower, CloudSun, Sunrise, Sunset } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 rose-pine:rotate-90 rose-pine:scale-0 rose-pine-dawn:rotate-90 rose-pine-dawn:scale-0 ayu-light:rotate-90 ayu-light:scale-0 ayu-dark:rotate-90 ayu-dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <Flower className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all rose-pine:rotate-0 rose-pine:scale-100" />
          <CloudSun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all rose-pine-dawn:rotate-0 rose-pine-dawn:scale-100" />
          <Sunrise className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ayu-light:rotate-0 ayu-light:scale-100" />
          <Sunset className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ayu-dark:rotate-0 ayu-dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Standard</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Rosé Pine</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("rose-pine")}>
          <Flower className="mr-2 h-4 w-4" />
          Rosé Pine
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("rose-pine-dawn")}>
          <CloudSun className="mr-2 h-4 w-4" />
          Rosé Pine Dawn
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Ayu</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("ayu-light")}>
          <Sunrise className="mr-2 h-4 w-4" />
          Ayu Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("ayu-dark")}>
          <Sunset className="mr-2 h-4 w-4" />
          Ayu Dark
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
