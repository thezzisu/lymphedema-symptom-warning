import Dexie from 'dexie'
import { Answer, Result } from '@/core/model'

export interface IPredictRecord {
  localId: number
  id: string
  ts: number
  modelId: string
  answer: Answer
  result: Result
  synced: boolean
}

export type OperationPayloadMapper = {
  deletePredictRecord: { id: string }
}

export type OperationType = keyof OperationPayloadMapper

export interface IOperationRecord<T extends OperationType = never> {
  localId: number
  type: T
  payload: OperationPayloadMapper[T]
  ts: number
  synced: boolean
}

class AppDatabase extends Dexie {
  static DB_VERSION = 1
  predictRecords: Dexie.Table<IPredictRecord, number>
  operationRecords: Dexie.Table<IOperationRecord, number>

  constructor() {
    super('AppDatabase')
    this.version(AppDatabase.DB_VERSION).stores({
      predictRecords: '++localId, id, ts, modelId, answer, result, synced',
      operationRecords: '++localId, type, payload, ts, synced'
    })
    this.predictRecords = this.table('predictRecords')
    this.operationRecords = this.table('operationRecords')
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
  return await db.predictRecords.orderBy('ts').reverse().toArray()
}

export async function addPredictRecord(
  modelId: string,
  answer: Answer,
  result: Result,
  ts: number = Date.now()
): Promise<number> {
  const record: Omit<IPredictRecord, 'localId'> = {
    id: '',
    ts,
    modelId,
    answer,
    result,
    synced: false
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await db.predictRecords.put(record as any)
}

export async function removePredictRecord(localId: number): Promise<void> {
  const record = await getPredictRecord(localId)
  if (record) {
    if (record.id) {
      await addOperationRecord('deletePredictRecord', { id: record.id })
    }
    await db.predictRecords.delete(localId)
  }
}

export async function addOperationRecord<T extends OperationType>(
  type: T,
  payload: OperationPayloadMapper[T]
) {
  const record: Omit<IOperationRecord<T>, 'localId'> = {
    type,
    payload,
    ts: Date.now(),
    synced: false
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await db.operationRecords.put(record as any)
}
