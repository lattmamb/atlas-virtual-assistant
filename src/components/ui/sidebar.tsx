
"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type SidebarContextValue = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
  ...props
}: SidebarProviderProps) {
  const [open, _setOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  const handleResize = React.useCallback(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") return

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  // Register keyboard shortcut
  React.useEffect(() => {
    if (typeof window === "undefined") return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT
      ) {
        e.preventDefault()
        setOpen((value) => !value)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // Set cookie
      if (typeof document !== "undefined") {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      }
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((value) => !value)
    } else {
      setOpen((value) => !value)
    }
  }, [isMobile, setOpen])

  // This is used to handle the controlled state
  React.useEffect(() => {
    if (openProp !== undefined) {
      _setOpen(openProp)
    }
  }, [openProp])

  const isControlled = openProp !== undefined

  const state = open ? "expanded" : "collapsed"

  return (
    <SidebarContext.Provider
      value={{
        state,
        open: isControlled ? openProp : open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }}
    >
      <div {...props} className={cn("flex w-full", props.className)}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

export function Sidebar({
  className,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  ...props
}: SidebarProps) {
  const {
    state,
    open,
    openMobile,
    isMobile,
    setOpenMobile,
  } = useSidebar()

  const onMobileClickOutside = () => {
    if (openMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <aside
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      data-state={state}
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
        } as React.CSSProperties
      }
      className={cn(
        "sidebar group relative z-30 flex h-full shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar-background text-sidebar-foreground",
        // Sidebar variants
        variant === "sidebar" && "left-0 h-full",
        variant === "floating" && "m-2 h-[calc(100%-1rem)] rounded-xl",
        variant === "inset" && "left-0 h-full",
        // Sidebar collapsible states
        collapsible === "icon" && [
          "duration-300",
          side === "left" && [
            "w-[var(--sidebar-width)]",
            "group-data-[state=collapsed]:w-16",
          ],
          side === "right" && [
            "w-[var(--sidebar-width)]",
            "group-data-[state=collapsed]:w-16",
          ],
        ],
        collapsible === "offcanvas" && [
          "duration-300 ease-out",
          side === "left" && [
            "group-data-[state=expanded]:translate-x-0",
            "group-data-[state=collapsed]:-translate-x-full",
          ],
          side === "right" && [
            "group-data-[state=expanded]:translate-x-0 right-0",
            "group-data-[state=collapsed]:translate-x-full",
          ],
        ],
        // Mobile sidebar
        isMobile && [
          "fixed inset-0 bottom-0 top-0 z-50 w-[var(--sidebar-width-mobile)]",
          openMobile
            ? "duration-300 ease-out translate-x-0"
            : "duration-300 ease-out -translate-x-full",
        ],
        className
      )}
      {...props}
    >
      {props.children}
    </aside>
  )
}

export function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn("sidebar-header border-b border-sidebar-border px-4 py-3", className)}
      {...props}
    />
  )
}

export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-content flex flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 pt-3 pb-6",
        className
      )}
      {...props}
    />
  )
}

export function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      className={cn("sidebar-footer border-t border-sidebar-border px-4 py-3", className)}
      {...props}
    />
  )
}

export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn("sidebar-trigger", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <Menu className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

export function SidebarRail({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { toggleSidebar, state } = useSidebar()

  return (
    <div
      data-state={state}
      className={cn(
        "sidebar-rail absolute inset-y-0 right-0 flex w-0 justify-center group-data-[state=expanded]:w-1 border-r border-sidebar-border",
        className
      )}
    >
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-6 h-6 w-6 -translate-x-1/2 rounded-full border bg-background p-0 opacity-0 hover:border-input focus-visible:opacity-100 group-hover:opacity-100 group-data-[state=collapsed]:opacity-0"
        onClick={toggleSidebar}
      >
        {state === "expanded" ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  )
}

export function SidebarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("sidebar-group mb-4 space-y-2", className)}
      {...props}
    />
  )
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "sidebar-group-label text-xs font-medium uppercase tracking-wider text-sidebar-foreground/70",
        className
      )}
      {...props}
    />
  )
}

export function SidebarGroupContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("sidebar-group-content space-y-1", className)}
      {...props}
    />
  )
}

export function SidebarGroupAction({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        "sidebar-group-action absolute right-4 top-1 h-4 w-4 shrink-0",
        className
      )}
      {...props}
    />
  )
}

const menuButtonVariants = cva(
  [
    "relative flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
    "focus-visible:bg-sidebar-accent focus-visible:text-sidebar-accent-foreground focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      isActive: {
        true: "bg-sidebar-accent text-sidebar-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
)

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuButton({
  className,
  isActive = false,
  asChild = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? React.Slot : "button"
  return (
    <Comp
      className={cn(
        menuButtonVariants({ isActive }),
        "sidebar-menu-button peer/menu-button",
        className
      )}
      role="menuitem"
      data-active={isActive}
      {...props}
    />
  )
}

export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("sidebar-menu", className)}
      role="menu"
      {...props}
    />
  )
}

export function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("sidebar-menu-item relative", className)}
      {...props}
    />
  )
}

interface SidebarMenuActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarMenuAction({
  className,
  ...props
}: SidebarMenuActionProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "sidebar-menu-action absolute right-1 top-1 h-6 w-6 scale-90 opacity-0 group-hover:opacity-100",
        className
      )}
      {...props}
    />
  )
}

export function SidebarMenuSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-menu-skeleton flex w-full items-center gap-2 rounded-md px-3 py-2",
        className
      )}
      {...props}
    >
      <div className="h-4 w-4 animate-pulse rounded bg-muted" />
      <div className="h-4 w-[60%] animate-pulse rounded bg-muted" />
    </div>
  )
}

export function SidebarSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-separator mx-3 my-3 h-px bg-sidebar-border",
        className
      )}
      {...props}
    />
  )
}
