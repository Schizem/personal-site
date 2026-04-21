"use client";

import { useState } from "react";

interface Props {
  slug: string;
  title: string;
}

export function Pico8Player({ slug, title }: Props) {
  const [active, setActive] = useState(false);

  return (
    <div className="pico8-player">
      {active ? (
        <iframe
          src={`/games/${slug}/index.html`}
          width={512}
          height={512}
          title={title}
          allow="gamepad"
          className="pico8-iframe"
        />
      ) : (
        <button
          className="pico8-start"
          onClick={() => setActive(true)}
          aria-label={`Play ${title}`}
        >
          <span>▶ Play {title}</span>
        </button>
      )}
    </div>
  );
}
