const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'ideadb.db');
const db = new Database(dbPath);

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
