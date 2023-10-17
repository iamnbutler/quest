export const MetaText = ({ children }: { children: string }) => {
    return (
        <div className="text-xs text-white/50">
            {children}
        </div>
    )
}

export const UserText = ({ children }: { children: string }) => {
    return (
        <div className="text-amber-200">
            {children}
        </div>
    )
}

export const Input = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <input {...props}
            className="bg-inherit placeholder:text-white/50 border-b border-transparent focus:border-white/30 focus:ring-0 focus:outline-none"
        />
    );
}
