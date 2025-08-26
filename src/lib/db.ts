import Dexie, { Table } from 'dexie';

export interface QnaDraftRecord {
  id: string; // 'asylumFormDraft'
  data: any;
  updatedAt: string;
}

class AppDB extends Dexie {
  qnaDrafts!: Table<QnaDraftRecord, string>;
  constructor() {
    super('migrantesuk-db');
    this.version(1).stores({
      qnaDrafts: '&id, updatedAt'
    });
  }
}

export const db = new AppDB();

export async function saveQnaDraft(data: any) {
  const record: QnaDraftRecord = {
    id: 'asylumFormDraft',
    data,
    updatedAt: new Date().toISOString(),
  };
  await db.qnaDrafts.put(record);
}

export async function loadQnaDraft(): Promise<any | null> {
  const rec = await db.qnaDrafts.get('asylumFormDraft');
  return rec?.data ?? null;
}



