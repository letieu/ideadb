# ideaDB UI

A minimal, beautiful explorer for startup problems, ideas, and products.

## Stack
- Next.js 16 (App Router)
- SQLite (better-sqlite3)
- Tailwind CSS
- shadcn/ui

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize Database:**
   The database is already set up with `scripts/init-db.js` and `scripts/seed-data.js`.
   If you need to reset it:
   ```bash
   rm ideadb.db
   node scripts/init-db.js
   node scripts/seed-data.js
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Visit [http://localhost:3000](http://localhost:3000).

## Features
- **Problem Explorer:** Browse and search real-world problems.
- **Idea Explorer:** Find startup ideas and features.
- **Product Explorer:** Discover existing solutions.
- **Voting:** Upvote/downvote problems and ideas (persisted to SQLite).
- **Categories:** Filter by industry/category (linked in DB).

## Notes
- Vector search tables in `init.sql` are currently commented out to avoid `sqlite-vec` dependency complexity for this initial UI build.