import Dexie from 'dexie'
import { Answer } from '@/core/predict'

export interface IPredictRecord {
  localId: number
  prob: number
  date: number
  answer: Answer
  synced: boolean
}

class AppDatabase extends Dexie {
  static DB_VERSION = 1
  predictRecords: Dexie.Table<IPredictRecord, number>

  constructor() {
    super('AppDatabase')
    this.version(AppDatabase.DB_VERSION).stores({
      predictRecords: '++localId, prob, date, answer, synced'
    })
    this.predictRecords = this.table('predictRecords')
  }
}

const db = new AppDatabase()

export async function getPredictRecord(
  localId: number
): Promise<IPredictRecord> {
  const record = await db.predictRecords.get(localId)
  if (record) return record
  throw new Error('未找到记录')
}

export async function getPredictRecords(): Promise<IPredictRecord[]> {
  return await db.predictRecords.orderBy('date').reverse().toArray()
}

export async function addPredictRecord(
  prob: number,
  date: number,
  answer: Answer
): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await db.predictRecords.put({ prob, date, answer } as any)
}

export async function removePredictRecord(localId: number): Promise<void> {
  await db.predictRecords.delete(localId)
}
