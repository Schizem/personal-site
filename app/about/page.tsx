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
        Hey, I'm Ty. Welcome to my digital garden. This is a catch-all site for
        showcasing my projects, writing about my hobbies, and exploring computer
        science outside of the classroom. I am a software engineer, but I also
        have some cool critters, a wonderful wife, and I write a newsletter for
        my local community. I enjoy creative writing, experimenting with brewing
        meads and wines, the occasional video game, and wandering the world.
      </p>
      <p>
        There were a few goals that drove me to create this site; I've always
        wanted a small corner of the internet for self-expression, I wanted to
        display my project portfolio to aid in my search for career
        opportunities, and I wanted an organizational focal-point to continue
        exploring and learning new technologies.
      </p>
      <p>
        To strengthen my technical skills, I'll be doing deep dives and writing
        long-form tutorials for myself on a variety of computer science and
        development topics. I'll also be posting notes about the plethora of
        hobbies and interests I enjoy. I hope my site inspires you to learn
        something new!
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
        <li>Digging into IoT concepts</li>
        <li>
          Experiencing{" "}
          <a href="https://www.brandonsanderson.com/pages/what-is-the-cosmere">
            Brandon Sanderson's Cosmere
          </a>
        </li>
        <li>Planning out a patio salsa garden</li>
        <li>
          Being a supporting dev for{" "}
          <a href="https://tracealter.com/wiki/doku.php?id=start">
            trace/ALTER
          </a>
          , a indie roleplaying game
        </li>
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
