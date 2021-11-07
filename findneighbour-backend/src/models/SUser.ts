import { Column, DataType, Model, Table } from "sequelize-typescript";
import differenceInMinutes from "date-fns/difference_in_minutes";

export interface UserCreationAttributes {
  email: string;
  fullname: string;
  password: string;
}

@Table({ tableName: "user" })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  fullname!: string;

  @Column({ type: DataType.STRING, unique: true })
  password!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  confirmed!: boolean;

  @Column({ type: DataType.STRING })
  confirm_hash!: string;

  @Column({ type: DataType.TIME })
  last_seen!: Date;

  @Column({ type: DataType.VIRTUAL })
  get isOnline() {
    return differenceInMinutes(new Date().toISOString(), this.last_seen) < 5;
  }
}
