import bodyParser from "body-parser";
import express from "express";
import socket from "socket.io";
import { DialogCtrl, MessageCtrl, UserCtrl, UploadCtrl, AddInfoCtrl} from "../controllers";
import { checkAuth, updateLastSeen } from "../middleware";
import { loginValidation, registerValidation } from "../utils/validations";
import multer from './multer';

const createRoutes = (app: express.Express, io: socket.Server) => {
  const UserController = new UserCtrl(io);
  const DialogController = new DialogCtrl(io);
  const MessageController = new MessageCtrl(io);
  const UploadController = new UploadCtrl();
  const AddInfoController = new AddInfoCtrl();

  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);

  app.get("/user/me", UserController.getMe);
  app.get("/user/verify", UserController.verify);
  app.post("/user/signup", registerValidation, UserController.create);
  app.post("/user/signin", loginValidation, UserController.login);
  app.get("/user/find", UserController.findUsers);
  app.get("/user/:id", UserController.show);
  app.delete("/user/:id", UserController.delete);

  app.get("/dialogs", DialogController.index);
  app.delete("/dialogs/:id", DialogController.delete);
  app.post("/dialogs", DialogController.create);

  app.get("/messages", MessageController.index);
  app.post("/messages", MessageController.create);
  app.delete("/messages", MessageController.delete);

  app.post("/files", multer.single('file'), UploadController.create);

  app.post("/user/addinfo", AddInfoController.create);
  app.get("/addinfo", AddInfoController.index);

};

export default createRoutes;