import './globals.css'

export const metadata = {
    title: 'The Fall of Atheria',
    description: 'A genrative text-based adventure game',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <main className="flex min-h-screen flex-col items-center justify-between p-24 font-mono text-sm">
                    <section className='w-[540px]'>
                        <div className={`prose prose-sm dark:prose-invert max-w-none prose-pre:leading-none prose-code:leading-none
                        hover:prose-strong:text-amber-200 prose-strong:decoration-dotted prose-strong:underline prose-strong:underline-offset-2 prose-strong:font-regular`}>
                            {children}
                        </div>
                    </section>
                </main>
            </body>
        </html>
    )
}
