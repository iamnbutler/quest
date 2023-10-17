import React from "react";

const gap_size = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3"
} as const

type Size = keyof typeof gap_size

interface VStackProps {
    size: Size;
    children: React.ReactNode;
    className?: string;
    el?: 'div' | 'list';
}

export const VStack = ({ size, children, className = '', el = 'div' }: VStackProps) => {
    const sizeClass = gap_size[size]

    const combinedClassName = `flex flex-col ${className} ${sizeClass}`;

    if (el === 'list') {
        return <ul className={combinedClassName}>{children}</ul>;
    }

    return <div className={combinedClassName}>{children}</div>;
};
