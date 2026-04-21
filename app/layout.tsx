import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ColorPicker } from "@/components/ColorPicker";
import "./globals.css";
import "@/styles/theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ty",
    template: "%s | Ty",
  },
  description: "Software engineer. Writing about programming, web dev, and CS.",
};

const NAV = [
  { href: "/blog", label: "Blog" },
  { href: "/notes", label: "Notes" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Me" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.setAttribute('data-theme','dark');const c=localStorage.getItem('accent-color');if(c&&c!=='amber')document.documentElement.setAttribute('data-color',c)}catch{}`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="layout-wrapper">
          <aside className="sidebar">
            <div className="sidebar-brand">
              <Link href="/" className="sidebar-logo">
                ty
              </Link>
              <div className="sidebar-controls">
                <ColorPicker />
                <ThemeToggle />
              </div>
            </div>

            <hr className="sidebar-divider" />

            <section className="sidebar-section">
              <p className="sidebar-section-title">About Me</p>
              <p className="sidebar-blurb">
                I&apos;m Ty, a software engineer. This is my digital garden.
              </p>
            </section>

            <hr className="sidebar-divider" />

            <nav className="sidebar-nav">
              <ul>
                {NAV.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <hr className="sidebar-divider" />

            <section className="sidebar-section">
              <p className="sidebar-section-title">Connect</p>
              <ul className="sidebar-links">
                <li>
                  <a
                    href="https://github.com/Schizem"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="/feed.xml">RSS feed</a>
                </li>
              </ul>
            </section>
          </aside>

          {/* Mobile top bar — visible only on small screens */}
          <header className="mobile-header">
            <Link href="/" className="sidebar-logo">
              ty
            </Link>
            <nav className="mobile-nav">
              {NAV.map(({ href, label }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </header>

          <div className="main-area">
            {children}
            <footer className="site-footer">
              <a
                href="https://github.com/Schizem"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              {" · "}
              <a href="/feed.xml">RSS</a>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
