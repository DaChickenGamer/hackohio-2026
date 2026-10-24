<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Product brief — HackOHI/O 2026

## Guiding principles

1. **Empty Room Problem** — Solve cold-start and discovery: help students find real problems and companies find people who already care.
2. **Respect Time** — Reduce wasted interviews and wasted learning; surface signal early (work + interest, not claims).
3. **Community, Not A Job Board** — Prioritize building, feedback, and peer connection over posting and applying.
4. **Make Growth Visible** — Progress, feedback, and reputation (e.g. points) should be visible and meaningful.
5. **Start Small, Think Big** — Ship a focused catalogue of small projects first; expand scope later.

## Problem

**Companies** want qualified candidates and a strong reputation. They often interview people who overstate skills (including AI-generated portfolios), wasting time and money.

**Students** often don’t solve relevant industry problems, don’t get feedback on what they build, and want to work in areas they care about — but lack a clear path from interest → real problem → reviewed project.

## Solution (summary)

A web app where companies (and the community) publish small, details on their company or community with relevant problems, tools, and tech stack; students explore industries/tools, build and upload projects, get mentor/peer feedback, and optionally collaborate. Companies see verified interest plus actual work — not just resumes.

In an age where AI makes it easy to *ship* projects, relevance and understanding matter more. This product bridges that gap: students build industry-relevant work with feedback; recruiters find candidates who are both capable and interested.

## Core loops

### 1. Explore industries, companies, and tools

Students browse tools employees use and the kinds of problems that exist in an industry or company.

- **Students:** Learn tools tailored to a target role; discover new roles/industries by building for them.
- **Companies:** Meet candidates who already understand their domain and have demonstrated interest through work.

### 2. Build and upload projects

Students take a task end-to-end and publish the result (Scratch-like catalogue of small projects).

- **Students:** Learn by shipping; leave with a concrete, resume-ready artifact.
- **Companies:** Review real output and thought process, not interview theater.

### 3. Collaborate with other students

Students can form groups around shared projects.

- **Students:** Meet peers with similar interests; practice teamwork; grow networks.
- **Companies:** See how candidates work with others (optional signal).

### 4. Mentors leave feedback; students receive it

Private, owner-visible review threads that can become public once reviewed/approved.

- **Students:** Improve skills with professional feedback; stronger portfolio signal.
- **Companies:** Spot strong, already-interested candidates without sorting a job-fair haystack.

### 5. Companies apply for a slot / create profiles with tasks

Verified company participation with clear expectations.

- **Students:** Work on tasks from real, committed companies; benefits stay credible.
- **Companies:** Commit deliberately; know what participation requires and yields.

## Expected outcomes

- Students identify industries/companies they care about and build relevant projects that strengthen applications.
- Companies identify candidates who are both qualified *and* interested; they can promote internships/full-time roles to students who submitted related work.
- Companies strengthen reputation and employer brand over time by engaging authentically with builders.

## Product shape (MVP idea)

Online catalogue of small projects (individuals or groups) — Scratch-like:

- Comment on others’ projects
- Categorize by stack/language (and related tags)
- Mark projects as aligned with companies that want that kind of work
- Points for giving useful feedback

## Feature list

**Must-have**

- Company profiles with tasks
- User profiles (with points)
- Private owner-only reviewed feedback (comment thread) → public when reviewed
- Login & registration

**Bonus**

- Project catalogue with search

## Stack

| Layer        | Choice   |
| ------------ | -------- |
| Frontend     | React (Next.js) |
| Data         | Supabase |
| Deployment   | Vercel   |

## Agent notes

When building features, prefer flows that reinforce the principles above: discovery → build → feedback → visibility of growth — not a generic jobs listing. Keep the first shippable slice small (profiles, auth, company tasks, project upload/catalogue, feedback threads).
