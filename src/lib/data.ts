import db from './db';

export type Category = {
  slug: string;
  name: string;
};

export type Problem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  pain_points: string; 
  score: number;
  created_at: string;
  categories?: Category[];
};

export type Idea = {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string;
  score: number;
  created_at: string;
  categories?: Category[];
};

export type Product = {
  id: string;
  slug: string;
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

function buildSortClause(sort: string | undefined, hasScore: boolean, tableAlias: string = '') {
  const prefix = tableAlias ? `${tableAlias}.` : '';
  switch (sort) {
    case 'oldest':
      return `${prefix}created_at ASC`;
    case 'newest':
      return `${prefix}created_at DESC`;
    case 'score_asc':
      return hasScore ? `${prefix}score ASC` : `${prefix}created_at ASC`;
    case 'score_desc':
    default:
      return hasScore ? `${prefix}score DESC` : `${prefix}created_at DESC`;
  }
}

export function getProblems(search?: string, category?: string, sort?: string, page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;

  // Base conditions
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

  const whereClause = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';

  // Count query
  let countQuery = `
    SELECT COUNT(DISTINCT p.id) as total
    FROM problems p
    LEFT JOIN problem_categories pc ON p.id = pc.problem_id
  `;
  countQuery += whereClause;
  const total = (db.prepare(countQuery).get(...params) as any).total;

  // Data query
  let query = `
    SELECT p.id, p.slug, p.title, p.description, p.pain_points, p.score, p.created_at, 
           GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM problems p
    LEFT JOIN problem_categories pc ON p.id = pc.problem_id
    LEFT JOIN categories c ON pc.category_slug = c.slug
  `;
  
  query += whereClause;
  query += ' GROUP BY p.id, p.slug';
  query += ' ORDER BY ' + buildSortClause(sort, true, 'p');
  query += ' LIMIT ? OFFSET ?';

  const rows = db.prepare(query).all(...params, limit, offset);
  
  const data = rows.map((row: any) => ({
    ...row,
    categories: row.category_slugs ? row.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: row.category_names.split(',')[index]
    })) : []
  })) as Problem[];

  return {
    data,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export function getIdeas(search?: string, category?: string, sort?: string, page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;

  // Base conditions
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

  const whereClause = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';

  // Count query
  let countQuery = `
    SELECT COUNT(DISTINCT i.id) as total
    FROM ideas i
    LEFT JOIN idea_categories ic ON i.id = ic.idea_id
  `;
  countQuery += whereClause;
  const total = (db.prepare(countQuery).get(...params) as any).total;

  // Data query
  let query = `
    SELECT i.id, i.slug, i.title, i.description, i.features, i.score, i.created_at,
           GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM ideas i
    LEFT JOIN idea_categories ic ON i.id = ic.idea_id
    LEFT JOIN categories c ON ic.category_slug = c.slug
  `;
  
  query += whereClause;
  query += ' GROUP BY i.id, i.slug';
  query += ' ORDER BY ' + buildSortClause(sort, true, 'i');
  query += ' LIMIT ? OFFSET ?';

  const rows = db.prepare(query).all(...params, limit, offset);
  
  const data = rows.map((row: any) => ({
    ...row,
    categories: row.category_slugs ? row.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: row.category_names.split(',')[index]
    })) : []
  })) as Idea[];

  return {
    data,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export function getProducts(search?: string, category?: string, sort?: string, page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;

  // Base conditions
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

  const whereClause = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';

  // Count query
  let countQuery = `
    SELECT COUNT(DISTINCT p.id) as total
    FROM products p
    LEFT JOIN product_categories pc ON p.id = pc.product_id
  `;
  countQuery += whereClause;
  const total = (db.prepare(countQuery).get(...params) as any).total;

  // Data query
  let query = `
    SELECT p.id, p.slug, p.name, p.description, p.url, p.created_at,
           GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM products p
    LEFT JOIN product_categories pc ON p.id = pc.product_id
    LEFT JOIN categories c ON pc.category_slug = c.slug
  `;
  
  query += whereClause;
  query += ' GROUP BY p.id, p.slug';
  query += ' ORDER BY ' + buildSortClause(sort, false, 'p'); // Products don't have score
  query += ' LIMIT ? OFFSET ?';

  const rows = db.prepare(query).all(...params, limit, offset);
  
  const data = rows.map((row: any) => ({
    ...row,
    categories: row.category_slugs ? row.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: row.category_names.split(',')[index]
    })) : []
  })) as Product[];

  return {
    data,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

// Get a single problem by slug with full details
export function getProblemBySlug(slug: string) {
  const problem = db.prepare(`
    SELECT p.*, GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM problems p
    LEFT JOIN problem_categories pc ON p.id = pc.problem_id
    LEFT JOIN categories c ON pc.category_slug = c.slug
    WHERE p.slug = ?
    GROUP BY p.id
  `).get(slug) as any;

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

// Get source items for an idea
export function getSourceItemsForIdea(ideaId: string) {
  return db.prepare(`
    SELECT id, source, source_item_id, title, content, author, url, score, created_at, source_created_at
    FROM source_items
    WHERE idea_id = ?
    ORDER BY score DESC, source_created_at DESC
    LIMIT 10
  `).all(ideaId) as SourceItem[];
}

// Get a single idea by slug with full details
export function getIdeaBySlug(slug: string) {
  const idea = db.prepare(`
    SELECT i.*, GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM ideas i
    LEFT JOIN idea_categories ic ON i.id = ic.idea_id
    LEFT JOIN categories c ON ic.category_slug = c.slug
    WHERE i.slug = ?
    GROUP BY i.id
  `).get(slug) as any;

  if (!idea) return null;

  return {
    ...idea,
    categories: idea.category_slugs ? idea.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: idea.category_names.split(',')[index]
    })) : []
  } as Idea;
}

// Get problems linked to an idea
export function getProblemsForIdea(ideaId: string) {
  const rows = db.prepare(`
    SELECT p.*, GROUP_CONCAT(c.name) as category_names, GROUP_CONCAT(c.slug) as category_slugs
    FROM problems p
    INNER JOIN problem_idea pi ON p.id = pi.problem_id
    LEFT JOIN problem_categories pc ON p.id = pc.problem_id
    LEFT JOIN categories c ON pc.category_slug = c.slug
    WHERE pi.idea_id = ?
    GROUP BY p.id
    ORDER BY p.score DESC
  `).all(ideaId);

  return rows.map((row: any) => ({
    ...row,
    categories: row.category_slugs ? row.category_slugs.split(',').map((slug: string, index: number) => ({
      slug,
      name: row.category_names.split(',')[index]
    })) : []
  })) as Problem[];
}