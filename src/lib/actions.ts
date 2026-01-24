'use server'

import db from './db';
import { revalidatePath } from 'next/cache';

export async function voteItem(id: string, type: 'problem' | 'idea', value: number) {
    const tableName = type === 'problem' ? 'problems' : 'ideas';

    const stmt = db.prepare(`UPDATE ${tableName} SET score = score + ? WHERE id = ?`);
    stmt.run(value, id);
    
    revalidatePath(`/${tableName}`);
}
