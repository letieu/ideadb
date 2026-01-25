import db from './db';

export type Category = {
  slug: string;
  name: string;
};

export type Problem = {
  id: string;
  title: string;
  description: string;
  pain_points: string; 
  score: number;
  created_at: string;
  categories?: Category[];
};

export type Idea = {
  id: string;
  title: string;
  description: string;
  features: string;
  score: number;
  created_at: string;
  categories?: Category[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  url: string;
  created_at: string;
  categories?: Category[];
};

export type SourceItem = {
  id: number;
  source: string;
  source_item_id: string;
  title: string;
  content: string;
  author: string | null;
  url: string | null;
  score: number;
  created_at: string;
  source_created_at: string | null;
};

export function getCategories() {
  return db.prepare('SELECT * FROM categories ORDER BY name').all() as Category[];
}

function buildSortClause(sort: string | undefined, hasScore: boolean) {
  switch (sort) {
    case 'oldest':
      return 'created_at ASC';
    case 'newest':
      return 'created_at DESC';
    case 'score_asc':
      return hasScore ? 'score ASC' : 'created_at ASC';
    case 'score_desc':
    default:
      return hasScore ? 'score DESC' : 'created_at DESC';
  }
}

export function getProblems(search?: string, category?: string, sort?: string) {
  let query = `
    SELECT p.*, GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM problems p
    LEFT JOIN problem_categories pc ON p.id = pc.problem_id
    LEFT JOIN categories c ON pc.category_slug = c.slug
  `;
  
  const params: any[] = [];
  const conditions: string[] = [];

  if (category && category !== 'all') {
    conditions.push('pc.category_slug = ?');
    params.push(category);
  }

  if (search) {
    conditions.push('(p.title LIKE ? OR p.description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' GROUP BY p.id';
  query += ' ORDER BY ' + buildSortClause(sort, true);

  const rows = db.prepare(query).all(...params);
  
  return rows.map((row: any) => ({
    ...row,
    categories: row.category_slugs ? row.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: row.category_names.split(',')[index]
    })) : []
  })) as Problem[];
}

export function getIdeas(search?: string, category?: string, sort?: string) {
    let query = `
    SELECT i.*, GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM ideas i
    LEFT JOIN idea_categories ic ON i.id = ic.idea_id
    LEFT JOIN categories c ON ic.category_slug = c.slug
  `;
  
  const params: any[] = [];
  const conditions: string[] = [];

  if (category && category !== 'all') {
    conditions.push('ic.category_slug = ?');
    params.push(category);
  }

  if (search) {
    conditions.push('(i.title LIKE ? OR i.description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' GROUP BY i.id';
  query += ' ORDER BY ' + buildSortClause(sort, true);

  const rows = db.prepare(query).all(...params);
   return rows.map((row: any) => ({
    ...row,
    categories: row.category_slugs ? row.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: row.category_names.split(',')[index]
    })) : []
  })) as Idea[];
}

export function getProducts(search?: string, category?: string, sort?: string) {
    let query = `
    SELECT p.*, GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM products p
    LEFT JOIN product_categories pc ON p.id = pc.product_id
    LEFT JOIN categories c ON pc.category_slug = c.slug
  `;
  
  const params: any[] = [];
  const conditions: string[] = [];

  if (category && category !== 'all') {
    conditions.push('pc.category_slug = ?');
    params.push(category);
  }

  if (search) {
    conditions.push('(p.name LIKE ? OR p.description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' GROUP BY p.id';
  query += ' ORDER BY ' + buildSortClause(sort, false); // Products don't have score
  
  const rows = db.prepare(query).all(...params);
   return rows.map((row: any) => ({
    ...row,
    categories: row.category_slugs ? row.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: row.category_names.split(',')[index]
    })) : []
  })) as Product[];
}

// Get a single problem by ID with full details
export function getProblemById(id: string) {
  const problem = db.prepare(`
    SELECT p.*, GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM problems p
    LEFT JOIN problem_categories pc ON p.id = pc.problem_id
    LEFT JOIN categories c ON pc.category_slug = c.slug
    WHERE p.id = ?
    GROUP BY p.id
  `).get(id) as any;

  if (!problem) return null;

  return {
    ...problem,
    categories: problem.category_slugs ? problem.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: problem.category_names.split(',')[index]
    })) : []
  } as Problem;
}

// Get ideas linked to a problem
export function getIdeasForProblem(problemId: string) {
  const rows = db.prepare(`
    SELECT i.*, GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM ideas i
    INNER JOIN problem_idea pi ON i.id = pi.idea_id
    LEFT JOIN idea_categories ic ON i.id = ic.idea_id
    LEFT JOIN categories c ON ic.category_slug = c.slug
    WHERE pi.problem_id = ?
    GROUP BY i.id
    ORDER BY i.score DESC
  `).all(problemId);

  return rows.map((row: any) => ({
    ...row,
    categories: row.category_slugs ? row.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: row.category_names.split(',')[index]
    })) : []
  })) as Idea[];
}

// Get products linked to a problem
export function getProductsForProblem(problemId: string) {
  const rows = db.prepare(`
    SELECT p.*, GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM products p
    INNER JOIN problem_product pp ON p.id = pp.product_id
    LEFT JOIN product_categories pc ON p.id = pc.product_id
    LEFT JOIN categories c ON pc.category_slug = c.slug
    WHERE pp.problem_id = ?
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `).all(problemId);

  return rows.map((row: any) => ({
    ...row,
    categories: row.category_slugs ? row.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: row.category_names.split(',')[index]
    })) : []
  })) as Product[];
}

// Get source items for a problem
export function getSourceItemsForProblem(problemId: string) {
  return db.prepare(`
    SELECT id, source, source_item_id, title, content, author, url, score, created_at, source_created_at
    FROM source_items
    WHERE problem_id = ?
    ORDER BY score DESC, source_created_at DESC
    LIMIT 10
  `).all(problemId) as SourceItem[];
}