import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { PredictRecord } from './Record'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  tel: string

  @Column({ default: '未设置昵称' })
  nickname: string

  @Column({ default: '未设置真实姓名' })
  realname: string

  @Column({ default: 0 })
  age: number

  @Column({ default: false })
  admin: boolean

  @Column({ default: false })
  isHighRisk: boolean

  @Column({ default: false })
  noNotification: boolean

  @Column({ default: 0 })
  lastPredictTime: number

  @OneToMany(() => PredictRecord, (record) => record.user)
  records: PredictRecord[]
}
