import "./theme.css";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Suspense } from "react";

const bricolage = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
    title: "AltFTool – Standalone Tools Engine",
    description: "Headless standalone components for the AltFTool application iframe",
    robots: {
        index: false,
        follow: false,
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={bricolage.className} style={{ background: 'transparent' }}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
