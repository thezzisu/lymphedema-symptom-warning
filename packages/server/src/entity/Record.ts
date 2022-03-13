import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class PredictRecord {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  data: string

  @Column()
  userId: number
  @ManyToOne(() => User, (user) => user.records, { onDelete: 'CASCADE' })
  user: User
}
