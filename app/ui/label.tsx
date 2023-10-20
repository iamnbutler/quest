import React from "react";
import * as RadixLabel from "@radix-ui/react-label";

interface LabelComponentProps {
  label: string;
  html_for: string;
}

export const Label = ({ label, html_for }: LabelComponentProps) => (
  <RadixLabel.Root className="text-[15px] font-medium leading-[35px] text-white" htmlFor={html_for}>
    {label}
  </RadixLabel.Root>
);
