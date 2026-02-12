# Turso Database Migration Guide

This project has been migrated from SQLite to Turso DB. Follow these steps to set up your database.

## Prerequisites

1. Install the Turso CLI:
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

2. Sign up for Turso:
```bash
turso auth signup
```

## Setup Steps

### 1. Create a Turso Database

```bash
turso db create ideadb
```

### 2. Get Database Credentials

Get your database URL:
```bash
turso db show ideadb --url
```

Create an auth token:
```bash
turso db tokens create ideadb
```

### 3. Update Environment Variables

Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

Update the `.env` file with your credentials:
```
TURSO_DATABASE_URL=libsql://your-database-url.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

### 4. Initialize the Database Schema

Run the initialization script to create all tables:
```bash
node scripts/init-db.js
```

### 5. Seed Sample Data (Optional)

If you want to populate the database with sample data:
```bash
node scripts/seed-data.js
```

## Key Changes from SQLite

1. **Database Client**: Migrated from `better-sqlite3` to `@libsql/client`
2. **Async Operations**: All database queries are now asynchronous
3. **Connection**: Database now connects via URL and auth token instead of file path
4. **Vector Extension**: The new schema includes `F32_BLOB(768)` for embeddings support

## Database Schema Highlights

The new database design includes:

- **Problems**: Issues/pain points that users face
- **Ideas**: Potential solutions or product ideas
- **Products**: Existing products/solutions
- **Categories**: Organized topics for all entities
- **Source Items**: References/sources for problems, ideas, and products
- **Junction Tables**: Many-to-many relationships between entities

## Development Workflow

1. Make sure your `.env` file has valid Turso credentials
2. Run `npm install` to ensure all dependencies are installed
3. Initialize the database with `node scripts/init-db.js`
4. Optionally seed data with `node scripts/seed-data.js`
5. Start the development server with `npm run dev`

## Production Deployment

For production deployments, make sure to set the environment variables:
- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

You can create separate databases for different environments:
```bash
turso db create ideadb-staging
turso db create ideadb-production
```

## Troubleshooting

**Error: "TURSO_DATABASE_URL environment variable is required"**
- Make sure you've created a `.env` file with valid credentials

**Database connection fails**
- Verify your auth token is still valid: `turso db tokens list ideadb`
- If expired, create a new token: `turso db tokens create ideadb`

**Schema errors during init**
- Make sure you're running the latest version of the `init.sql` file
- Drop and recreate the database if needed: `turso db destroy ideadb` then `turso db create ideadb`

## Resources

- [Turso Documentation](https://docs.turso.tech/)
- [libSQL Client for TypeScript](https://docs.turso.tech/sdk/ts/quickstart)
- [Turso Dashboard](https://turso.tech/app)
