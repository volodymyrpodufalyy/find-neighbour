import mongoose, { Schema, Document } from 'mongoose';

export interface IAddInfo extends Document {
  age: number;
  sex: boolean;
  pets: boolean;
  badHabits: boolean;
  kindOfActivity: boolean;
  haveJobOrJobless: boolean;
  maritalStatus: boolean;
  phoneNumber: string;
  moreAboutUser: string;
  user: string;
}

const AddInfoSchema = new Schema(
  {
    age: Number,
    sex: Boolean,
    pets: Boolean,
    badHabits: Boolean,
    kindOfActivity: Boolean,
    haveJobOrJobless: Boolean,
    maritalStatus: Boolean,
    phoneNumber: String,
    moreAboutUser: String,
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
  },
  {
    timestamps: true
  }
);

const AddInfoModel = mongoose.model<IAddInfo>('AddInfo', AddInfoSchema);

export default AddInfoModel;