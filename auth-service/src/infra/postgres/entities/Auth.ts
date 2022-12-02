import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm'
import crypto from 'crypto'

@Entity({ name: 'tags' })
export class Auth {
  @PrimaryColumn()
  id: string

  @Column()
  accountNumber: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  setId () {
    this.id = crypto.randomUUID()
  }
}
