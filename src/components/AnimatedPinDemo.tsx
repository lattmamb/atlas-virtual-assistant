
"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";

export function AnimatedPinDemo() {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center">
      <PinContainer
        title="/ui.atlas"
        href="https://trinity-dodge.com"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            Atlas Assistant
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500">
              Intelligent AI assistant for Trinity Dodge in Taylorville, IL.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-blue-500 via-purple-500 to-violet-500" />
        </div>
      </PinContainer>
    </div>
  );
}
