const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'ideadb.db');
const db = new Database(dbPath);

console.log('Seeding data...');

// Helper to insert problem
const insertProblem = db.prepare(`
    INSERT INTO problems (id, title, description, pain_points, score)
    VALUES (?, ?, ?, ?, ?)
`);

// Helper to link problem category
const insertProblemCategory = db.prepare(`
    INSERT OR IGNORE INTO problem_categories (problem_id, category_slug)
    VALUES (?, ?)
`);

// Helper to insert idea
const insertIdea = db.prepare(`
    INSERT INTO ideas (id, title, description, features, score)
    VALUES (?, ?, ?, ?, ?)
`);

// Helper to link idea category
const insertIdeaCategory = db.prepare(`
    INSERT OR IGNORE INTO idea_categories (idea_id, category_slug)
    VALUES (?, ?)
`);

// Helper to insert product
const insertProduct = db.prepare(`
    INSERT INTO products (id, name, description, url)
    VALUES (?, ?, ?, ?)
`);

const insertProductCategory = db.prepare(`
    INSERT OR IGNORE INTO product_categories (product_id, category_slug)
    VALUES (?, ?)
`);


const problems = [
    {
        id: 'prob_1',
        title: 'Difficulty finding healthy fast food',
        description: 'People want to eat healthy but have limited time during lunch breaks. Fast food options are usually unhealthy.',
        pain_points: 'High calories, low nutritional value, expensive "healthy" options',
        score: 10,
        categories: ['food-beverage', 'healthcare']
    },
    {
        id: 'prob_2',
        title: 'Managing remote team culture',
        description: 'Companies struggle to maintain company culture and employee engagement when everyone is working from home.',
        pain_points: 'Isolation, lack of spontaneous communication, burnout',
        score: 15,
        categories: ['hr-recruiting', 'productivity']
    },
    {
        id: 'prob_3',
        title: 'Too many subscription services',
        description: 'Users forget about subscriptions they don\'t use and waste money.',
        pain_points: 'Financial waste, difficulty tracking',
        score: 8,
        categories: ['finance', 'technology']
    }
];

const ideas = [
    {
        id: 'idea_1',
        title: 'Healthy fast food vending machines',
        description: 'Vending machines that dispense fresh, healthy salads and bowls.',
        features: 'Daily restocking, app integration, customizable orders',
        score: 5,
        categories: ['food-beverage']
    },
    {
        id: 'idea_2',
        title: 'Virtual watercooler for remote teams',
        description: 'An app that simulates spontaneous office interactions through audio channels.',
        features: 'Voice channels, games, random pairings',
        score: 12,
        categories: ['hr-recruiting', 'productivity']
    }
];

const products = [
    {
        id: 'prod_1',
        name: 'Sweetgreen',
        description: 'Fast casual restaurant chain that serves healthy salads.',
        url: 'https://sweetgreen.com',
        categories: ['food-beverage']
    },
    {
        id: 'prod_2',
        name: 'Discord',
        description: 'Voice, video and text communication service used by gamers and communities.',
        url: 'https://discord.com',
        categories: ['communication', 'technology']
    }
];

const transaction = db.transaction(() => {
    for (const p of problems) {
        try {
            insertProblem.run(p.id, p.title, p.description, p.pain_points, p.score);
            for (const c of p.categories) {
                insertProblemCategory.run(p.id, c);
            }
        } catch (e) { console.log(`Skipping problem ${p.id} (maybe exists)`); }
    }
    for (const i of ideas) {
        try {
             insertIdea.run(i.id, i.title, i.description, i.features, i.score);
             for (const c of i.categories) {
                 insertIdeaCategory.run(i.id, c);
             }
        } catch (e) { console.log(`Skipping idea ${i.id}`); }
    }
    for (const p of products) {
        try {
            insertProduct.run(p.id, p.name, p.description, p.url);
            for (const c of p.categories) {
                insertProductCategory.run(p.id, c);
            }
        } catch (e) { console.log(`Skipping product ${p.id}`); }
    }
});

transaction();
console.log('Seeding complete.');
