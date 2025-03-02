"use client"

import * as React from "react"
import { createContext, useContext } from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

// Configuration
// You can change these values to customize the sidebar.
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

// Context to manage the sidebar state.
interface SidebarContextProps {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (value: boolean | ((value: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: (value: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

// Hook to access the sidebar state.
function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  style?: React.CSSProperties
}

function SidebarProvider({
  children,
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  style,
}: SidebarProviderProps) {
  const [open, _setOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  // Check if the openProp is controlled.
  const isOpenControlled = openProp !== undefined

  // Update the hook state when the prop changes.
  React.useEffect(() => {
    if (isOpenControlled) {
      _setOpen(openProp)
    }
  }, [isOpenControlled, openProp])

  // Callback to set the open state.
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
    } else {
      setOpen((prev) => !prev)
    }
  }, [isMobile, setOpen])

  // Handle keyboard shortcuts.
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // Handle resize to know if we're on mobile.
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate the state.
  const state = open ? "expanded" : "collapsed"

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }}
    >
      <div
        className="flex min-h-screen w-full"
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
          ...style,
        } as React.CSSProperties}
      >
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

function Sidebar({
  children,
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  ...props
}: SidebarProps) {
  const { state, open, openMobile, isMobile } = useSidebar()

  return (
    <div
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      data-state={state}
      data-mobile={isMobile}
      data-open-mobile={openMobile}
      className={cn(
        "fixed bottom-0 top-0 z-20 flex h-full flex-col border-r bg-sidebar text-sidebar-foreground",
        // Side
        side === "left" && "left-0",
        side === "right" && "right-0 border-l border-r-0",
        // Variant
        variant === "sidebar" && "group/sidebar max-h-screen",
        variant === "floating" &&
          "mb-8 mt-8 min-h-[calc(100%-4rem)] rounded-lg border shadow-xl",
        variant === "inset" &&
          "mb-8 mt-8 min-h-[calc(100%-4rem)] rounded-lg border shadow-xl",
        // Collapsible
        collapsible === "offcanvas" &&
          isMobile &&
          "w-[--sidebar-width-mobile]",
        collapsible === "offcanvas" && !isMobile && "w-[--sidebar-width]",
        collapsible === "offcanvas" &&
          isMobile &&
          !openMobile &&
          "-translate-x-full",
        collapsible === "offcanvas" &&
          !isMobile &&
          !open &&
          "-translate-x-full",
        collapsible === "icon" && open && "w-[--sidebar-width]",
        collapsible === "icon" && !open && "w-14",
        collapsible === "none" && "w-[--sidebar-width]",
        // Transition
        "data-[collapsible=offcanvas]:transition-transform data-[collapsible=icon]:transition-[width]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarInset({ className, ...props }: SidebarInsetProps) {
  const { open } = useSidebar()

  return (
    <div
      className={cn(
        "ml-auto h-full duration-300",
        open ? "w-[calc(100%-var(--sidebar-width))]" : "w-full",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex h-14 shrink-0 items-center overflow-hidden bg-sidebar px-4",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:justify-center",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 flex h-14 shrink-0 items-center overflow-hidden bg-sidebar px-4",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:justify-center",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      className={cn(
        "h-full overflow-y-auto px-4 py-2",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:px-2",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={cn("mb-4", className)} {...props} />
}

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

function SidebarGroupLabel({
  asChild = false,
  className,
  ...props
}: SidebarGroupLabelProps) {
  const Comp = asChild ? React.Fragment : "div"

  return (
    <Comp
      className={cn(
        "text-xs font-medium uppercase text-muted-foreground",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:hidden",
        asChild ? "" : "mb-2 px-2",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarGroupActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function SidebarGroupAction({ className, ...props }: SidebarGroupActionProps) {
  return (
    <button
      type="button"
      className={cn(
        "absolute right-2 top-2 h-5 w-5 rounded-md text-foreground/60 opacity-0 transition-all hover:bg-accent hover:text-accent-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-1 group-hover:opacity-100",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:hidden",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarGroupContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarGroupContent({
  className,
  ...props
}: SidebarGroupContentProps) {
  return <div className={cn("space-y-1", className)} {...props} />
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <div className={cn("space-y-1", className)} {...props} />
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <div
      className={cn(
        "group relative",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:w-10 group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:justify-center group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:truncate group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:rounded-xl group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:px-2",
        className,
      )}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "flex cursor-default items-center gap-2 truncate rounded-md px-2 py-2 text-sm font-medium text-sidebar-foreground ring-offset-background transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:justify-center group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:rounded-xl",
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
  },
)

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    { asChild = false, className, isActive = false, type = "button", ...props },
    ref,
  ) => {
    const Comp = asChild ? React.Fragment : "button"

    return (
      <Comp
        ref={ref}
        type={type}
        data-active={isActive}
        className={cn(
          sidebarMenuButtonVariants({ isActive }),
          "peer/menu-button",
          asChild ? "" : "relative w-full",
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

interface SidebarMenuActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function SidebarMenuAction({ className, ...props }: SidebarMenuActionProps) {
  return (
    <button
      type="button"
      className={cn(
        "absolute right-2 top-2 h-5 w-5 rounded-md text-foreground/60 opacity-0 transition-all hover:bg-accent hover:text-accent-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-1 group-hover:opacity-100",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:hidden peer-hover/menu-button:opacity-100",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarMenuSubProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
  return (
    <div
      className={cn(
        "ml-3 mt-1 space-y-1 border-l pl-3",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:ml-1 group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:pl-1",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarMenuSubItemProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarMenuSubItem({
  className,
  ...props
}: SidebarMenuSubItemProps) {
  return <div className={cn("", className)} {...props} />
}

interface SidebarMenuSubButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
}

const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuSubButtonProps
>(
  (
    { asChild = false, className, isActive = false, type = "button", ...props },
    ref,
  ) => {
    const Comp = asChild ? React.Fragment : "button"

    return (
      <Comp
        ref={ref}
        type={type}
        data-active={isActive}
        className={cn(
          "flex cursor-default items-center gap-2 truncate rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground/70 ring-offset-background transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          asChild ? "" : "relative w-full",
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

interface SidebarMenuSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean
  showBadge?: boolean
}

function SidebarMenuSkeleton({
  showIcon = true,
  showBadge = false,
  className,
  ...props
}: SidebarMenuSkeletonProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 py-1.5",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:justify-center group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:rounded-xl",
        className,
      )}
      {...props}
    >
      {showIcon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border">
          <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
        </div>
      )}
      <div
        className={cn(
          "flex w-full flex-col gap-1.5",
          "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:hidden",
        )}
      >
        <Skeleton className="h-4 w-full rounded-full" />
        {showBadge && (
          <div className="flex items-center gap-2">
            <Skeleton className="h-2.5 w-[60%] rounded-full" />
            <Skeleton className="ml-auto h-4 w-4 shrink-0 rounded-full" />
          </div>
        )}
      </div>
    </div>
  )
}

interface SidebarMenuBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarMenuBadge({ className, ...props }: SidebarMenuBadgeProps) {
  return (
    <div
      className={cn(
        "ml-auto rounded bg-sidebar-primary px-1.5 py-0.5 text-xs font-medium text-sidebar-primary-foreground",
        "group-data-[collapsible=icon]/sidebar:data-[state=collapsed]:hidden",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
  return (
    <Separator
      orientation="horizontal"
      className={cn("-mx-4 my-2 bg-sidebar-border", className)}
      {...props}
    />
  )
}

interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={toggleSidebar}
      {...props}
    >
      <SVGSidebarToggle />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

interface SidebarRailProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarRail({ className, ...props }: SidebarRailProps) {
  const { toggleSidebar } = useSidebar()

  return (
    <div
      className={cn(
        "absolute right-0 top-0 h-full w-1 translate-x-full cursor-col-resize",
        className,
      )}
      onDoubleClick={toggleSidebar}
      {...props}
    />
  )
}

function SVGSidebarToggle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <path d="M9 3v18" />
    </svg>
  )
}

export {
  useSidebar,
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
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
  SidebarMenuSkeleton,
  SidebarMenuBadge,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
}
