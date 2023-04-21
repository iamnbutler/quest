import type { MDXComponents } from "mdx/types";
import React from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    // Define a custom text component that wraps matched text in a span tag

    return {
        // Use the custom text component for the MDX `p` component
        ...components,
    };
}
