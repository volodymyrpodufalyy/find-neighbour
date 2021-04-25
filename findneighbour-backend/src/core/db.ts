import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/findneighbour", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});