
"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="w-full">
      <CardBody className="bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg relative group/card border border-border/40 w-auto sm:w-[30rem] h-auto rounded-xl p-6">
        <CardItem
          translateZ="50"
          className="text-xl font-bold"
        >
          Atlas Assistant for Trinity Dodge
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-muted-foreground text-sm max-w-sm mt-2"
        >
          Hover over this card to unleash the power of Atlas AI for your dealership
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <div className="h-60 w-full bg-gradient-to-br from-blue-500 via-purple-500 to-violet-500 object-cover rounded-xl group-hover/card:shadow-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Trinity Dodge</span>
          </div>
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
