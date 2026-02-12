const { createClient } = require('@libsql/client');

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required");
}

const db = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

console.log('Seeding data...');

const problems = [
    {
        id: 'prob_1',
        slug: 'difficulty-finding-healthy-fast-food',
        title: 'Difficulty finding healthy fast food',
        description: 'People want to eat healthy but have limited time during lunch breaks. Fast food options are usually unhealthy.',
        pain_points: 'High calories, low nutritional value, expensive "healthy" options',
        score: 10,
        categories: ['food-beverage', 'healthcare']
    },
    {
        id: 'prob_2',
        slug: 'managing-remote-team-culture',
        title: 'Managing remote team culture',
        description: 'Companies struggle to maintain company culture and employee engagement when everyone is working from home.',
        pain_points: 'Isolation, lack of spontaneous communication, burnout',
        score: 15,
        categories: ['hr-recruiting', 'productivity']
    },
    {
        id: 'prob_3',
        slug: 'too-many-subscription-services',
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
        slug: 'healthy-fast-food-vending-machines',
        title: 'Healthy fast food vending machines',
        description: 'Vending machines that dispense fresh, healthy salads and bowls.',
        features: 'Daily restocking, app integration, customizable orders',
        score: 5,
        categories: ['food-beverage']
    },
    {
        id: 'idea_2',
        slug: 'virtual-watercooler-for-remote-teams',
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
        slug: 'sweetgreen',
        name: 'Sweetgreen',
        description: 'Fast casual restaurant chain that serves healthy salads.',
        url: 'https://sweetgreen.com',
        categories: ['food-beverage']
    },
    {
        id: 'prod_2',
        slug: 'discord',
        name: 'Discord',
        description: 'Voice, video and text communication service used by gamers and communities.',
        url: 'https://discord.com',
        categories: ['communication', 'technology']
    }
];

(async () => {
    try {
        // Insert problems
        for (const p of problems) {
            try {
                await db.execute({
                    sql: `INSERT INTO problems (id, slug, title, description, pain_points, score)
                          VALUES (?, ?, ?, ?, ?, ?)`,
                    args: [p.id, p.slug, p.title, p.description, p.pain_points, p.score]
                });
                
                for (const c of p.categories) {
                    await db.execute({
                        sql: `INSERT OR IGNORE INTO problem_categories (problem_id, category_slug)
                              VALUES (?, ?)`,
                        args: [p.id, c]
                    });
                }
            } catch (e) { 
                console.log(`Skipping problem ${p.id} (maybe exists)`); 
            }
        }

        // Insert ideas
        for (const i of ideas) {
            try {
                await db.execute({
                    sql: `INSERT INTO ideas (id, slug, title, description, features, score)
                          VALUES (?, ?, ?, ?, ?, ?)`,
                    args: [i.id, i.slug, i.title, i.description, i.features, i.score]
                });
                
                for (const c of i.categories) {
                    await db.execute({
                        sql: `INSERT OR IGNORE INTO idea_categories (idea_id, category_slug)
                              VALUES (?, ?)`,
                        args: [i.id, c]
                    });
                }
            } catch (e) { 
                console.log(`Skipping idea ${i.id} (maybe exists)`); 
            }
        }

        // Insert products
        for (const p of products) {
            try {
                await db.execute({
                    sql: `INSERT INTO products (id, slug, name, description, url)
                          VALUES (?, ?, ?, ?, ?)`,
                    args: [p.id, p.slug, p.name, p.description, p.url]
                });
                
                for (const c of p.categories) {
                    await db.execute({
                        sql: `INSERT OR IGNORE INTO product_categories (product_id, category_slug)
                              VALUES (?, ?)`,
                        args: [p.id, c]
                    });
                }
            } catch (e) { 
                console.log(`Skipping product ${p.id} (maybe exists)`); 
            }
        }

        console.log('Seeding complete.');
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
})();
