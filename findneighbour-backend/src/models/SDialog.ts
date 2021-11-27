import { User } from "./SUser";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

export interface DialogMessage {
  text: string;
  dialog: number;
  readed: boolean;
  attachments: number;
  user: number;
  createdAt: Date;
}

export interface DialogCreationAttributes {
  authorId: number;
  partnerId: number;
  lastMessage: DialogMessage;
}

@Table({ tableName: "dialog", underscored: true })
export class Dialog extends Model<Dialog, DialogCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id!: number;

  @Column({ type: DataType.JSONB, allowNull: false })
  lastMessage!: Object;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  authorId: number;

  @BelongsTo(() => User, "authorId")
  author: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  partnerId: number;

  @BelongsTo(() => User, "partnerId")
  partner: User;
}
