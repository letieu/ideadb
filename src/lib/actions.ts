'use server'

import db from './db';
import { revalidatePath } from 'next/cache';

export async function voteItem(id: string, type: 'problem' | 'idea', value: number) {
    const tableName = type === 'problem' ? 'problems' : 'ideas';

    await db.execute({
        sql: `UPDATE ${tableName} SET score = score + ? WHERE id = ?`,
        args: [value, id]
    });
    
    revalidatePath(`/${tableName}`);
}
