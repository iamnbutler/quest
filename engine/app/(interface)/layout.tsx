const title = 'Quest';

export const metadata = {
    title,
    openGraph: {
        title,
        // images: [`/api/og?title=${title}`],
    },
};

export default function Layout({
    children,
    menu,
}: {
    children: React.ReactNode;
    menu: React.ReactNode;
}) {
    return (
        <main className="h-screen w-screen p-8 font-mono text-sm max-w-7xl grid grid-cols-12 mx-auto gap-8 overflow-hidden">
            <nav className="border border-white/10 overflow-y-scroll p-8 col-span-6">
                {menu}
            </nav>
            <section className="max-w-[600px] col-span-6 border border-white/10 p-8 overflow-y-scroll"
            >
                <div
                    className={`flex flex-col prose prose-sm dark:prose-invert max-w-none prose-pre:leading-none prose-code:leading-none
                `}
                >
                    {children}
                </div>
            </section>
        </main>
    );
}
