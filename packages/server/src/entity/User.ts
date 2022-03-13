import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { PredictRecord } from './Record'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  tel: string

  @Column({ default: '' })
  nickname: string

  @Column({ default: '' })
  realname: string

  @Column({ default: 0 })
  age: number

  @Column({ default: false })
  admin: boolean

  @OneToMany(() => PredictRecord, (record) => record.user)
  records: PredictRecord[]
}
