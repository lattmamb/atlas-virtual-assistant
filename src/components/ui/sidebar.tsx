
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

// Configuration
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_ICON_WIDTH = "4rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 1 week

// Context
type SidebarState = "expanded" | "collapsed"

interface SidebarContextValue {
  state: SidebarState
  open: boolean
  openMobile: boolean
  setOpen: (open: boolean) => void
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
)

// SidebarProvider props
interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// Sidebar props
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

// Inset props
interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

// useSidebar hook
function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

// SidebarProvider
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
  className,
  ...props
}: SidebarProviderProps) {
  const [open, _setOpen] = React.useState(openProp ?? defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  // Update the state when the controlled prop changes
  React.useEffect(() => {
    if (openProp !== undefined) {
      _setOpen(openProp)
    }
  }, [openProp])

  // This is for the keyboard shortcut
  React.useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (
        (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) ||
        e.key === "k"
      ) {
        e.preventDefault()
        if (setOpenProp) {
          setOpenProp(!open)
        } else {
          _setOpen(!open)
        }
      }
    }

    window.addEventListener("keydown", handleKeydown)
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [open, setOpenProp])

  // Mobile detection
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Set open/close state
  const setOpen = React.useCallback(
    (value: boolean) => {
      if (setOpenProp) {
        setOpenProp(value)
      } else {
        _setOpen(value)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile(!openMobile)
    } else {
      setOpen(!open)
    }
  }, [isMobile, open, openMobile, setOpen])

  const state: SidebarState = React.useMemo(
    () => (open ? "expanded" : "collapsed"),
    [open]
  )

  const value = React.useMemo(
    () => ({
      state,
      open,
      openMobile,
      setOpen,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [state, open, openMobile, setOpen, isMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div
        className={cn(
          "sidebar-container h-full w-full grid",
          "text-sidebar-foreground",
          className
        )}
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
          "--sidebar-icon-width": SIDEBAR_ICON_WIDTH,
          ...props.style,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: SidebarProps) {
  const { state, open, openMobile, isMobile } = useSidebar()

  return (
    <aside
      data-state={state}
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      data-open-mobile={openMobile}
      className={cn(
        "sidebar group fixed z-50 flex h-full flex-col overflow-hidden border-r",
        "bg-sidebar text-sidebar-foreground",
        "transition-[width,transform] duration-300 ease-in-out",
        "data-[state=expanded]:w-[--sidebar-width]",
        "data-[state=collapsed]:w-0",
        "data-[collapsible=icon]:data-[state=collapsed]:w-[--sidebar-icon-width]",
        "data-[side=left]:top-0 data-[side=left]:left-0",
        "data-[side=right]:top-0 data-[side=right]:right-0 data-[side=right]:border-l data-[side=right]:border-r-0",
        "data-[variant=floating]:my-2 data-[variant=floating]:rounded-lg data-[variant=floating]:border data-[variant=floating]:data-[side=left]:ml-2 data-[variant=floating]:data-[side=right]:mr-2",
        "data-[variant=inset]:my-2 data-[variant=inset]:rounded-md data-[variant=inset]:border data-[variant=inset]:data-[side=left]:ml-2 data-[variant=inset]:data-[side=right]:mr-2",
        "data-[variant=sidebar]:bottom-0 data-[variant=sidebar]:h-screen",
        "data-[open-mobile=true]:translate-x-0",
        "md:data-[open-mobile=false]:translate-x-0",
        "data-[side=left]:data-[open-mobile=false]:-translate-x-full",
        "data-[side=right]:data-[open-mobile=false]:translate-x-full",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("sidebar-trigger shrink-0", className)}
      onClick={() => toggleSidebar()}
      aria-label={state === "expanded" ? "Close sidebar" : "Open sidebar"}
      {...props}
    >
      <Menu className="size-4" />
    </Button>
  )
}

function SidebarHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        "sidebar-header flex h-14 items-center gap-2 border-b px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}

function SidebarHeaderTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-header-title flex items-center gap-2 font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarHeaderAction({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("sidebar-header-action ml-auto flex items-center", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-content flex-1 overflow-y-auto overflow-x-hidden px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      className={cn(
        "sidebar-footer flex h-14 items-center border-t px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </footer>
  )
}

function SidebarGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-group relative pb-4 pt-2 group-data-[collapsible=icon]:data-[state=collapsed]:items-center group-data-[collapsible=icon]:data-[state=collapsed]:justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarGroupLabel({
  className,
  children,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean
}) {
  const Comp = asChild ? "div" : "h4"

  return (
    <Comp
      className={cn(
        "sidebar-group-label mb-2 px-2 text-xs font-medium text-sidebar-foreground/60 group-data-[collapsible=icon]:data-[state=collapsed]:hidden",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

function SidebarGroupAction({
  className,
  children,
  title,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  title?: string
}) {
  return (
    <button
      type="button"
      className={cn(
        "sidebar-group-action absolute right-0 top-2 flex h-6 w-6 items-center justify-center rounded-full text-sidebar-foreground/60 opacity-0 transition-opacity hover:text-sidebar-foreground focus-visible:opacity-100 group-hover:opacity-100 group-data-[collapsible=icon]:data-[state=collapsed]:hidden",
        className
      )}
      title={title}
      {...props}
    >
      {children}
    </button>
  )
}

function SidebarGroupContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-group-content",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarMenu({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-menu -mx-2 flex flex-col gap-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarMenuItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-menu-item relative flex items-center gap-1 group-data-[collapsible=icon]:data-[state=collapsed]:justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarMenuButton({
  className,
  children,
  isActive,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean
  asChild?: boolean
}) {
  const Comp = asChild ? React.Fragment : "button"
  const childProps = asChild ? { children, className: undefined } : {}

  if (asChild) {
    return (
      <Comp>
        <div
          data-active={isActive}
          className={cn(
            "sidebar-menu-button group peer/menu-button relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 outline-none transition-colors",
            "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            "focus-visible:bg-sidebar-accent focus-visible:text-sidebar-foreground",
            "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground",
            "group-data-[collapsible=icon]:data-[state=collapsed]:px-2 group-data-[collapsible=icon]:data-[state=collapsed]:py-2",
            className
          )}
        >
          {children}
        </div>
      </Comp>
    )
  }

  return (
    <button
      type="button"
      data-active={isActive}
      className={cn(
        "sidebar-menu-button group peer/menu-button relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 outline-none transition-colors",
        "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        "focus-visible:bg-sidebar-accent focus-visible:text-sidebar-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground",
        "group-data-[collapsible=icon]:data-[state=collapsed]:px-2 group-data-[collapsible=icon]:data-[state=collapsed]:py-2",
        className
      )}
      {...props}
    >
      {children}
      <span className="absolute inset-0" />
    </button>
  )
}

function SidebarMenuAction({
  className,
  children,
  title,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string
}) {
  return (
    <button
      type="button"
      className={cn(
        "sidebar-menu-action z-10 ml-auto flex h-8 w-8 items-center justify-center rounded-md opacity-0 outline-none transition-all hover:bg-sidebar-accent focus-visible:opacity-100 peer-hover/menu-button:opacity-100 group-data-[collapsible=icon]:data-[state=collapsed]:hidden",
        className
      )}
      title={title}
      {...props}
    >
      {children}
    </button>
  )
}

function SidebarMenuSub({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-menu-sub ml-4 mt-1 flex flex-col gap-1 group-data-[collapsible=icon]:data-[state=collapsed]:ml-0 group-data-[collapsible=icon]:data-[state=collapsed]:items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarMenuSubItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-menu-sub-item relative flex items-center group-data-[collapsible=icon]:data-[state=collapsed]:w-full group-data-[collapsible=icon]:data-[state=collapsed]:justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarMenuSubButton({
  className,
  children,
  isActive,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean
  asChild?: boolean
}) {
  const Comp = asChild ? React.Fragment : "button"
  const childProps = asChild ? { children, className: undefined } : {}

  if (asChild) {
    return (
      <Comp>
        <div
          data-active={isActive}
          className={cn(
            "sidebar-menu-sub-button group/submenu-button relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-1.5 outline-none transition-colors",
            "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            "focus-visible:bg-sidebar-accent focus-visible:text-sidebar-foreground",
            "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground",
            "group-data-[collapsible=icon]:data-[state=collapsed]:h-8 group-data-[collapsible=icon]:data-[state=collapsed]:w-8 group-data-[collapsible=icon]:data-[state=collapsed]:justify-center group-data-[collapsible=icon]:data-[state=collapsed]:px-0 group-data-[collapsible=icon]:data-[state=collapsed]:py-0",
            className
          )}
        >
          {children}
        </div>
      </Comp>
    )
  }

  return (
    <button
      type="button"
      data-active={isActive}
      className={cn(
        "sidebar-menu-sub-button group/submenu-button relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-1.5 outline-none transition-colors",
        "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        "focus-visible:bg-sidebar-accent focus-visible:text-sidebar-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground",
        "group-data-[collapsible=icon]:data-[state=collapsed]:h-8 group-data-[collapsible=icon]:data-[state=collapsed]:w-8 group-data-[collapsible=icon]:data-[state=collapsed]:justify-center group-data-[collapsible=icon]:data-[state=collapsed]:px-0 group-data-[collapsible=icon]:data-[state=collapsed]:py-0",
        className
      )}
      {...props}
    >
      {children}
      <span className="absolute inset-0" />
    </button>
  )
}

function SidebarMenuBadge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sidebar-menu-badge z-10 mr-2 flex items-center justify-center rounded-md border bg-sidebar-accent/50 px-1.5 text-xs font-semibold text-sidebar-accent-foreground/90 group-data-[collapsible=icon]:data-[state=collapsed]:mr-0 group-data-[collapsible=icon]:data-[state=collapsed]:rounded-full group-data-[collapsible=icon]:data-[state=collapsed]:border-0 group-data-[collapsible=icon]:data-[state=collapsed]:px-0 group-data-[collapsible=icon]:data-[state=collapsed]:py-0 group-data-[collapsible=icon]:data-[state=collapsed]:min-h-5 group-data-[collapsible=icon]:data-[state=collapsed]:min-w-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showIcon?: boolean
}) {
  return (
    <div
      className={cn(
        "sidebar-menu-skeleton flex w-full items-center gap-2 px-3 py-2",
        className
      )}
      {...props}
    >
      {showIcon && <div className="h-4 w-4 rounded bg-sidebar-accent/30" />}
      <div className="h-4 w-[60%] rounded bg-sidebar-accent/30" />
    </div>
  )
}

function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Separator
      className={cn("sidebar-separator my-2 bg-sidebar-border/50", className)}
      {...props}
    />
  )
}

function SidebarCollapseToggle({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { state, toggleSidebar } = useSidebar()

  return (
    <button
      type="button"
      className={cn(
        "sidebar-collapse-toggle absolute right-0 top-1/2 -mr-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-md outline-none",
        className
      )}
      onClick={toggleSidebar}
      {...props}
    >
      {state === "expanded" ? (
        <ChevronLeft className="h-3 w-3" />
      ) : (
        <ChevronRight className="h-3 w-3" />
      )}
    </button>
  )
}

function SidebarFooterButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "sidebar-footer-button flex h-9 w-full items-center justify-center gap-2 rounded-md border px-3 text-sm outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:bg-sidebar-accent focus-visible:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function SidebarInset({
  className,
  children,
  ...props
}: SidebarInsetProps) {
  const { state, open } = useSidebar()

  return (
    <div
      data-state={state}
      data-sidebar-open={open}
      className={cn(
        "sidebar-inset ml-0 transition-[margin]",
        "data-[sidebar-open=true]:ml-[--sidebar-width]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  // Provider
  SidebarProvider,
  useSidebar,
  // Sidebar
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarHeaderAction,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarCollapseToggle,
  SidebarFooterButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
}
