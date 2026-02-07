-- Drop tables if they exist to start from scratch
DROP TABLE IF EXISTS problem_idea_links;
DROP TABLE IF EXISTS idea_product_links;
DROP TABLE IF EXISTS vec_source_items;
DROP TABLE IF EXISTS source_items;
DROP TABLE IF EXISTS problem_categories;
DROP TABLE IF EXISTS idea_categories;
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS problems;
DROP TABLE IF EXISTS ideas;
DROP TABLE IF EXISTS products;

-- Enable foreign keys
PRAGMA foreign_keys=ON;

-- Create categories table with slug as primary key
CREATE TABLE IF NOT EXISTS categories (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create problems table
CREATE TABLE IF NOT EXISTS problems (
    int_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    pain_points TEXT,
    score INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create ideas table
CREATE TABLE IF NOT EXISTS ideas (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT,
    score INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create junction tables for many-to-many category relationships
CREATE TABLE IF NOT EXISTS problem_categories (
    problem_id TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (problem_id, category_slug),
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE,
    FOREIGN KEY (category_slug) REFERENCES categories(slug) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS idea_categories (
    idea_id TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (idea_id, category_slug),
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    FOREIGN KEY (category_slug) REFERENCES categories(slug) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS product_categories (
    product_id TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, category_slug),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (category_slug) REFERENCES categories(slug) ON DELETE CASCADE
);

-- Create source_items table
CREATE TABLE IF NOT EXISTS source_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    source_item_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    url TEXT,
    score INTEGER DEFAULT 0,
    analysis_result TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    source_created_at DATETIME,
    problem_id TEXT,
    idea_id TEXT,
    product_id TEXT,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE SET NULL,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE SET NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Create vector table for embeddings
CREATE VIRTUAL TABLE IF NOT EXISTS vec_source_items USING vec0(
    embedding FLOAT[768]
);

CREATE VIRTUAL TABLE IF NOT EXISTS vec_problems USING vec0(
    embedding FLOAT[768]
);

-- Create problem-idea linking table
CREATE TABLE IF NOT EXISTS problem_idea (
    problem_id TEXT NOT NULL,
    idea_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (problem_id, idea_id),
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE
);

-- Create problem-product linking table
CREATE TABLE IF NOT EXISTS problem_product (
    problem_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (problem_id, product_id),
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_source_items_problem ON source_items(problem_id);
CREATE INDEX IF NOT EXISTS idx_source_items_idea ON source_items(idea_id);
CREATE INDEX IF NOT EXISTS idx_source_items_product ON source_items(product_id);
CREATE INDEX IF NOT EXISTS idx_source_items_created ON source_items(source_created_at);
CREATE INDEX IF NOT EXISTS idx_source_items_score ON source_items(score);
CREATE INDEX IF NOT EXISTS idx_problems_score ON problems(score);
CREATE INDEX IF NOT EXISTS idx_problems_updated ON problems(updated_at);

-- Category-related indexes
CREATE INDEX IF NOT EXISTS idx_problem_categories_category ON problem_categories(category_slug);
CREATE INDEX IF NOT EXISTS idx_idea_categories_category ON idea_categories(category_slug);
CREATE INDEX IF NOT EXISTS idx_product_categories_category ON product_categories(category_slug);

-- Insert predefined categories
INSERT OR IGNORE INTO categories (slug, name) VALUES
    ('technology', 'Technology'),
    ('healthcare', 'Healthcare'),
    ('finance', 'Finance'),
    ('education', 'Education'),
    ('e-commerce', 'E-commerce'),
    ('productivity', 'Productivity'),
    ('communication', 'Communication'),
    ('entertainment', 'Entertainment'),
    ('travel', 'Travel'),
    ('food-beverage', 'Food & Beverage'),
    ('fitness', 'Fitness'),
    ('real-estate', 'Real Estate'),
    ('transportation', 'Transportation'),
    ('automotive', 'Automotive'),
    ('fashion', 'Fashion'),
    ('beauty', 'Beauty'),
    ('home-garden', 'Home & Garden'),
    ('pets', 'Pets'),
    ('sports', 'Sports'),
    ('gaming', 'Gaming'),
    ('music', 'Music'),
    ('art-design', 'Art & Design'),
    ('photography', 'Photography'),
    ('legal', 'Legal'),
    ('hr-recruiting', 'HR & Recruiting'),
    ('marketing', 'Marketing'),
    ('sales', 'Sales'),
    ('customer-service', 'Customer Service'),
    ('analytics', 'Analytics'),
    ('security', 'Security'),
    ('sustainability', 'Sustainability'),
    ('social-media', 'Social Media'),
    ('ai-ml', 'AI & Machine Learning'),
    ('iot', 'Internet of Things'),
    ('blockchain', 'Blockchain'),
    ('saas', 'SaaS'),
    ('mobile', 'Mobile'),
    ('web', 'Web'),
    ('hardware', 'Hardware'),
    ('infrastructure', 'Infrastructure');

-- Example queries for working with the new category system:

-- Get all problems in a specific category:
-- SELECT p.* FROM problems p
-- JOIN problem_categories pc ON p.id = pc.problem_id
-- WHERE pc.category_slug = 'technology';

-- Get all categories for a problem:
-- SELECT c.* FROM categories c
-- JOIN problem_categories pc ON c.slug = pc.category_slug
-- WHERE pc.problem_id = 'problem_123';

-- Find problems that share categories with a given problem:
-- SELECT DISTINCT p.* FROM problems p
-- JOIN problem_categories pc ON p.id = pc.problem_id
-- WHERE pc.category_slug IN (
--     SELECT category_slug FROM problem_categories WHERE problem_id = 'problem_123'
-- )
-- AND p.id != 'problem_123';

-- Count items per category:
-- SELECT c.name, 
--        COUNT(DISTINCT pc.problem_id) as problem_count,
--        COUNT(DISTINCT ic.idea_id) as idea_count,
--        COUNT(DISTINCT prc.product_id) as product_count
-- FROM categories c
-- LEFT JOIN problem_categories pc ON c.slug = pc.category_slug
-- LEFT JOIN idea_categories ic ON c.slug = ic.category_slug
-- LEFT JOIN product_categories prc ON c.slug = prc.category_slug
-- GROUP BY c.slug, c.name;
