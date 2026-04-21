import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer, programmer, and hobbyist.",
};

export default function AboutPage() {
  return (
    <main className="page-content prose">
      <h1>About</h1>

      <p>
        Hi, I&apos;m Ty. I&apos;m a software engineer interested in systems
        programming, web development, and computer science. I like building
        things, writing about what I learn, and occasionally making small games
        in PICO-8.
      </p>

      <h2>Links</h2>
      <ul>
        <li>
          <a
            href="https://github.com/Schizem"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>

      <h2>Interests</h2>
      <ul>
        <li>Systems programming and low-level computing</li>
        <li>Web development and design</li>
        <li>Algorithms and data structures</li>
        <li>Music and audio</li>
        <li>Game development</li>
      </ul>
    </main>
  );
}
