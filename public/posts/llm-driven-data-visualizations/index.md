# Realizations from building LLM-driven data visualization systems

### How am I building data visualizations using LLMs?

Over the past months, I’ve been immersed in building a concept that visualizes business and operational data using generative UI techniques—essentially, letting large language models (LLMs) assemble dashboards and interactive widgets using ChatKit-like, schema-defined components.

As I moved from theoretical designs to real-world prototypes, my understanding of how to get consistent, valuable auto-generated UI shifted dramatically. Here are the big lessons and realizations:

### 1. Beautiful Components Aren’t Enough
Early on, I focused heavily on having a robust design system: beautiful badges, cards, boxes, titles, text, charts, and all the other ingredients used in modern app UIs. But it quickly became clear that just having these pieces wasn’t a guarantee of useful results. LLMs, by default, will try to stitch things together with whatever knowledge or training they have—sometimes it’s visually fine, but often it lacks context, structure, or even business sense.

### 2. Blueprints and Data Dictionaries: The Game Changers
What made the difference was pairing those components with two things:

*   **Blueprints:** Standardized, scenario-based guides that show how components should (and shouldn’t) be combined. These cover recommended layouts, typical flows, and best practices—the “how to use” rules that LLMs desperately need.
*   **A Rich Data Dictionary:** Explicitly documenting the allowable properties, values, and inter-component relationships for every widget. When an LLM knows what’s possible—and what isn’t—it stops trying random combinations and starts making choices with real intent.

This pairing ensured that the output was not just pretty, but reliable and relevant. LLMs began to produce layouts that felt much closer to human design, with meaning behind structure.

### 3. The Power of Connecting Prompts, Rules, and UI Definitions
At a certain point, I realized we can’t expect “design system = good output” from AI alone. The real power comes from:

*   Connecting prompts with structured rules,
*   Mapping reusable UI definitions and best practices,
*   Validating every component tree at runtime with robust schema tools (think Zod for JS/TS).

This turned LLM-driven layout into something far closer to programming than mere design—it was now orchestrated, reliable, and repeatable across use cases.

### 4. Why LLM-Generated Screens Aren’t the Final Solution
Despite all the gains, I realized that automated generation is not a silver bullet. LLMs are immensely powerful, but they can:

*   Miss subtle business context,
*   Ignore user goals,
*   Default to surface-level beauty without functional fidelity,
*   Produce layouts that work for one scenario but break under real data or usage.

No matter how tight your schema, you need human oversight, continuous feedback, and real-world iteration. That means regularly auditing layouts, updating blueprints, evolving your data dictionary, and sometimes pushing back against “AI autopilot.”

### 5. Continuous Improvement & Validation are Essential
The more your system gets used (whether by humans or LLMs), the more you learn about edge cases, missing relationships, or unexpected combinations. Tools like Zod made a huge difference—by validating every generated layout and catching mistakes early on, we learned faster and shipped safer.

There’s a real feedback loop between generative UI and human quality control. Every production deployment should inform your next schema revision or blueprint update.
