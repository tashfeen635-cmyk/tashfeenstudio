"use client";

import { useState } from "react";
import { SKILL_CATEGORIES } from "@/lib/site";

type FilterId = "all" | (typeof SKILL_CATEGORIES)[number]["id"];

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  ...SKILL_CATEGORIES.map((c) => ({ id: c.id as FilterId, label: c.label })),
];

export default function SkillsShowcase() {
  const [active, setActive] = useState<FilterId>("all");

  const visible =
    active === "all"
      ? SKILL_CATEGORIES.flatMap((c) => c.techs)
      : SKILL_CATEGORIES.find((c) => c.id === active)?.techs ?? [];

  return (
    <>
      <div className="skills-filter" role="group" aria-label="Filter skills by category">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`skills-tab${active === f.id ? " active" : ""}`}
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div key={active} className="tech-grid">
        {visible.map((tech) => (
          <div className="tech-card" key={tech.name}>
            <span className="tech-mono" aria-hidden="true">
              {tech.mono}
            </span>
            <div className="tech-copy">
              <h4>{tech.name}</h4>
              <p>{tech.note}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}