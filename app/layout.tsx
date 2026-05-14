import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistRoboto = Roboto({
  variable: "--font-geist-roboto",
  subsets:  ["latin"],
  weight: '400',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Notes App",
  description: "Add your notes and be the owner of your time.",
  openGraph: {
    title: "Add your notes",
    description: "Add your notes and be the owner of your time.",
    url: 'https://notehub.vercel.app',
    siteName: 'NoteHub',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'noteHub-img',
    }],

  }
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${geistRoboto.variable} h-full antialiased`}
    >
        <body className={`${geistRoboto.variable} body`}>
          <TanStackProvider>
            <AuthProvider>
              <Header />
                {modal}
                {children}
              <Footer />
            </AuthProvider>
          </TanStackProvider>
        </body>
    </html>
  );
}
