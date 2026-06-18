# StashyJD

StashyJD started from a simple frustration.

Every time I was actively applying for jobs, I ended up managing everything in different places. Applications lived in spreadsheets, resumes were scattered across folders with questionable naming conventions, interview schedules sat in a calendar, and notes were buried somewhere else entirely.

After repeating this process enough times, I decided to build something for myself.

A desktop application that could keep my entire job search organized in one place.

---

## Why "StashyJD"?

The idea was simple:

Take all the job descriptions, resumes, cover letters, interview notes, deadlines, and application statuses that usually get scattered everywhere and stash them in a single workspace.

A place where I could quickly answer questions like:

* Which resume did I send to this company?
* When is my next interview?
* How many applications have I submitted this month?
* What stage is this application currently in?
* Which opportunities am I actually excited about?

---

## Building It

StashyJD is a local-first desktop application built with:

* React
* TypeScript
* Tauri
* Rust
* SQLite

I chose Tauri because I wanted native desktop performance without shipping an entire Chromium instance.

I chose SQLite because job application data doesn't need a cloud database. Most people only need a reliable local store that is fast, portable, and easy to back up.

The goal throughout the project has been to keep things simple, responsive, and fully usable offline.

---

## Project Status

This project is actively being developed.

Features change frequently.
Ideas get tested and replaced.
Some things work surprisingly well.
Some things still need a lot of work.

At the moment I'm focused on improving the overall workflow, polishing the desktop experience, and exploring ways to make job tracking less tedious.

---

## Running Locally

```bash
git clone https://github.com/<your-username>/stashyjd.git

cd stashyjd

npm install

npm run tauri dev
```

Build production binaries:

```bash
npm run tauri build
```

---

## Feedback

If you have ideas, suggestions, or find something broken, feel free to open an issue.

I'm building this primarily because I wanted a better tool for myself, but if it ends up helping other people organize their job search too, that's even better.
