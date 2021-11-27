import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  text: {
    type: string;
    require: boolean;
  };
  dialog: {
    type: Schema.Types.Number;
    require: true;
  };
  user: {
    id: { type: Schema.Types.Number };
    fullname: { type: Schema.Types.String };
  };
  readed: {
    type: boolean;
    default: boolean;
  };
  createdAt: { type: Schema.Types.Date };
  attachments: { type: Schema.Types.Array; ref: string };
}

const MessageSchema = new Schema(
  {
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.Number, require: true },
    user: {
      id: { type: Schema.Types.Number },
      fullname: { type: Schema.Types.String },
    },
    readed: {
      type: Boolean,
      default: false,
    },
    attachments: [{ type: Schema.Types.ObjectId, ref: "Upload" }],
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
