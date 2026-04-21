"use client";

import { useEffect, useRef, useState } from "react";

export const ACCENT_COLORS = [
  { id: "amber",  light: "#ca8a04", dark: "#fbbf24", label: "Amber"  },
  { id: "purple", light: "#9333ea", dark: "#c084fc", label: "Purple" },
  { id: "blue",   light: "#2563eb", dark: "#60a5fa", label: "Blue"   },
  { id: "green",  light: "#16a34a", dark: "#4ade80", label: "Green"  },
  { id: "rose",   light: "#e11d48", dark: "#fb7185", label: "Rose"   },
] as const;

export type AccentColorId = (typeof ACCENT_COLORS)[number]["id"];

export function applyColor(id: AccentColorId) {
  if (id === "amber") {
    document.documentElement.removeAttribute("data-color");
  } else {
    document.documentElement.setAttribute("data-color", id);
  }
}

export function ColorPicker() {
  const [color, setColor] = useState<AccentColorId>("amber");
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("accent-color") ?? "amber") as AccentColorId;
    setColor(saved);
    applyColor(saved);

    const updateTheme = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function pick(id: AccentColorId) {
    setColor(id);
    localStorage.setItem("accent-color", id);
    applyColor(id);
    setOpen(false);
  }

  const active = ACCENT_COLORS.find((c) => c.id === color)!;

  return (
    <div className="color-picker-dropdown" ref={ref}>
      <button
        className="color-picker-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose accent color"
        title="Accent color"
      >
        <span
          className="color-swatch-dot"
          style={{ background: isDark ? active.dark : active.light }}
        />
        <span className="color-picker-caret">▾</span>
      </button>

      {open && (
        <ul className="color-picker-menu" role="listbox" aria-label="Accent color">
          {ACCENT_COLORS.map((c) => (
            <li key={c.id} role="option" aria-selected={color === c.id}>
              <button
                className={`color-picker-option${color === c.id ? " color-picker-option--active" : ""}`}
                onClick={() => pick(c.id)}
              >
                <span
                  className="color-swatch-dot"
                  style={{ background: isDark ? c.dark : c.light }}
                />
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
