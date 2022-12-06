import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 150,
    unique: false,
  })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: "varchar",
    length: 150,
  })
  firstName: string;

  @Column({
    type: "varchar",
    length: 150,
  })
  lastName: string;

  @Column("timestamp")
  createdAt: Date;

  @Column("timestamp")
  lastModified: Date;

  @Column({
    type: "date",
    nullable: true,
  })
  dateOfBirth: Date;
}
