import { Dialog } from "./../models/SDialog";
import { Sequelize } from "sequelize-typescript";
import { AddInfo } from "../models/SAddInfo";
import { User } from "../models/SUser";
require("dotenv").config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  storage: ":memory:",
  models: [User, AddInfo, Dialog],
});
