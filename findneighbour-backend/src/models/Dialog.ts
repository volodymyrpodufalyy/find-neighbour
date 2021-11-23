import { User } from "./SUser";
import mongoose, { Schema, Document } from "mongoose";

export interface IDialog extends Document {
  partner: {
    type: User;
    require: true;
  };
  author: {
    type: User;
    require: true;
  };
  messages: [
    {
      type: Schema.Types.ObjectId;
      ref: string;
    }
  ];
}

const DialogSchema = new Schema(
  {
    partner: {},
    author: User,
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const DialogModel = mongoose.model<IDialog>("Dialog", DialogSchema);

export default DialogModel;
