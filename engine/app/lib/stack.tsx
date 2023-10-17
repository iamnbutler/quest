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
    id?: string;
}

export const VStack = ({ size, children, className = '', el = 'div', id }: VStackProps) => {
    const sizeClass = gap_size[size]

    const combinedClassName = `flex flex-col ${className} ${sizeClass}`;

    if (el === 'list') {
        return <ul className={combinedClassName} id={id}>{children}</ul>;
    }

    return <div className={combinedClassName} id={id}>{children}</div>;
};
