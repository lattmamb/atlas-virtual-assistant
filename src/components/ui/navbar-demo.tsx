
"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center pt-20 pb-40">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white fixed top-32 inset-x-0 text-center">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-20 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm p-4">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Dodge Ram 1500"
              href="/dodge-ram"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Starting at $38,000, perfect for Taylorville farmers."
            />
            <ProductItem
              title="Dodge Charger"
              href="/dodge-charger"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Starting at $32,000, known for performance and city appeal."
            />
            <ProductItem
              title="Dodge Durango"
              href="/dodge-durango"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Starting at $41,000, 7-seat SUV, ideal for Illinois families."
            />
            <ProductItem
              title="Special Editions"
              href="/special-editions"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Limited-run models like the Dodge Ram 1500 TRX or Charger SRT Hellcat."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm p-4">
            <HoveredLink href="/financing">Financing Options</HoveredLink>
            <HoveredLink href="/leasing">Leasing Plans</HoveredLink>
            <HoveredLink href="/specials">Current Specials</HoveredLink>
            <HoveredLink href="/trade-in">Trade-In Value</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
