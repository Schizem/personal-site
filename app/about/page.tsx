import { Metadata } from "next";
import Image from "next/image";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer, programmer, and hobbyist.",
};

export default function AboutPage() {
  const hasPortrait = fs.existsSync(
    path.join(process.cwd(), "public", "Colorado.png"),
  );

  return (
    <main className="page-content prose">
      <div className="portrait-banner">
        {hasPortrait ? (
          <Image
            src="/Colorado.png"
            alt="Ty"
            width={500}
            height={500}
            priority
          />
        ) : (
          <div className="portrait-placeholder">Ty</div>
        )}
      </div>
      <h1>About Me</h1>

      <p>
        Hey, I'm Ty. By day I'm a software engineer; by night I'm a homebrewer,
        a creative writer, a newsletter editor, and a proud keeper of some very
        cool critters. All alongside a wonderful wife who tolerates my
        ever-expanding list of hobbies. This site is my digital garden: a place
        to share project work, write about what I'm learning, and document the
        rabbit holes I fall down. If something here sparks your curiosity,
        that's the whole point.
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
        <li>
          <a
            href="https://www.linkedin.com/in/tyler-hay-13446b336/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a href="/resume">Resume</a>
        </li>
      </ul>

      <h2>What I've Been Up To</h2>
      <ul>
        <li>Searching for career opportunities</li>
        <li>Tweaking this website</li>
        <li>Exploring IoT concepts</li>
        <li>
          Experiencing{" "}
          <a href="https://www.brandonsanderson.com/pages/what-is-the-cosmere">
            Brandon Sanderson's Cosmere
          </a>
        </li>
        <li>Planning out a patio salsa garden</li>
        <li>Being a supporting developer for a indie roleplaying game</li>
      </ul>

      <h2>Technicals</h2>
      <h3> Software </h3>
      <p>
        This site is hosted on{" "}
        <a href="https://docs.github.com/en/pages">Github Pages</a> and uses the{" "}
        <a href="https://nextjs.org/">React Next.js</a> framework.
      </p>
      <ul>
        <li>
          <strong>Coding</strong>:{" "}
          <a href="https://code.visualstudio.com">Visual Studio Code</a>
        </li>
        <li>
          <strong>Notes</strong>: <a href="https://obsidian.md">Obsidian</a>
        </li>
      </ul>
    </main>
  );
}
