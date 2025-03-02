
"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

interface WidgetDrawerProps {
  title: string;
  description?: string;
  triggerClassName?: string;
  triggerText?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function WidgetDrawer({
  title,
  description,
  triggerClassName,
  triggerText = "View More",
  children,
  footer,
}: WidgetDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`text-xs absolute bottom-2 right-2 opacity-70 hover:opacity-100 ${triggerClassName}`}
        >
          {triggerText}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <div className="p-4 pb-0">
            {children}
          </div>
          <DrawerFooter>
            {footer || (
              <>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
