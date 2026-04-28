import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer, programmer, and hobbyist.",
};

export default function AboutPage() {
  return (
    <main className="page-content prose">
      <h1>About Me</h1>

      <p>
        Hey, I'm Ty. Welcome to my digital garden. This is a catch-all site for
        showcasing my projects, writing about my hobbies, and exploring computer
        science outside of the classroom. I am a software engineer, but I also
        have some cool critters, a wonderful wife, and I write a newsletter for
        my local community. I enjoy creative writing, video games, wood working,
        and being in nature.
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
        development topics. I hope my site inspires you to learn something new!
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
