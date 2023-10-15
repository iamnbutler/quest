import Debug from "./debug";
import "./globals.css";

export const metadata = {
    title: "Adventure",
    description: "A genrative text-based adventure game",
};

const ENABLE_DEBUG = false;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <main className="h-screen w-screen p-8 font-mono text-sm max-w-7xl grid grid-cols-12 mx-auto gap-8 overflow-hidden">
                    {ENABLE_DEBUG && <Debug />}
                    <nav className="border border-white/10 overflow-y-scroll p-8 col-span-6">
                        {Array.from({ length: 100 }, (_, i) => (
                            <li key={i}>{`Item ${i + 1}`}</li>
                        ))}
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
            </body>
        </html>
    );
}
