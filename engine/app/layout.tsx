import "./globals.css";

export const metadata = {
    title: "Adventure",
    description: "A genrative text-based adventure game",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
