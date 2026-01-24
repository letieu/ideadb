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