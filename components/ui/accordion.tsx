"use client";

import * as React from "react";
// Importing AccordionPrimitive for compatibility
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "./utils";

"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "./utils";

const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
);
const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn("flex w-full items-center justify-between py-4 font-medium transition-all hover:underline", className)}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className={cn("data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  )
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
