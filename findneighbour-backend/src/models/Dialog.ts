import mongoose, { Schema, Document } from "mongoose";

export interface IDialog extends Document {
  partner: {
    type: Schema.Types.Number;
    require: true;
  };
  author: {
    type: Schema.Types.Number;
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
    partner: { type: Schema.Types.Number },
    author: { type: Schema.Types.Number },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const DialogModel = mongoose.model<IDialog>("Dialog", DialogSchema);

export default DialogModel;
