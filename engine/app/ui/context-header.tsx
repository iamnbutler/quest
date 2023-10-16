import clsx from "clsx"

export const ContextHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <header className={clsx('flex justify-between text-xs  w-full text-white/50', 'py-2', 'border-y border-white/10')}>
            <div className="flex gap-2 flex-grow">
                {title}
            </div>
            <div className="flex gap-2">
                <div>{subtitle}</div>
            </div>
        </header>
    )
}
