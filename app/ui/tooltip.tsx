import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

interface TooltipWrapperProps {
  children: React.ReactNode;
  content: string;
}

const TooltipWrapper = ({ children, content }: TooltipWrapperProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={clsx(
              "bg-black border border-white/10 z-10 text-white text-xs p-1 max-w-[260px]",
            )}
            sideOffset={8}
          >
            {content}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipWrapper;
