const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required");
}

const db = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

const initSqlPath = path.join(process.cwd(), 'init.sql');
const initSql = fs.readFileSync(initSqlPath, 'utf-8');

console.log('Initializing database...');

// Split SQL statements and execute them individually
const statements = initSql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

(async () => {
  try {
    for (const statement of statements) {
      if (statement) {
        await db.execute(statement);
      }
    }
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
})();
