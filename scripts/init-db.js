const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const sqliteVec = require("sqlite-vec");

const dbPath = process.env.DATABASE_PATH
if (!dbPath) throw new Error("DATABASE_PATH is required")

const db = new Database(dbPath);
sqliteVec.load(db);

const initSqlPath = path.join(process.cwd(), 'init.sql');
const initSql = fs.readFileSync(initSqlPath, 'utf-8');

console.log('Initializing database...');
try {
  db.exec(initSql);
  console.log('Database initialized successfully.');
} catch (error) {
  console.error('Error initializing database:', error);
} finally {
  db.close();
}
