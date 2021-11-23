import express from "express";
import socket from "socket.io";
import { sequelize } from "../core/dbconfig";

import { DialogModel, MessageModel } from "../models";
import { IDialog } from "../models/Dialog";
import { User } from "../models/SUser";

class DialogController {
  io: socket.Server;
  userRepository = sequelize.getRepository(User);

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (req: express.Request, res: express.Response) => {
    const userId = (req.user as User).id;

    try {
      DialogModel.find()
        .or([{ author: userId }, { partner: userId }])
        .populate({
          path: "lastMessage",
        })
        .exec(function (err, dialogs) {
          if (err || !dialogs) {
            return res.status(404).json({
              message: "Dialogs not found",
            });
          }
          console.log(dialogs, "dialogs");
          const upd = dialogs[dialogs.length - 1];
          (upd.author as any) = 33434;
          return res.json(upd);
        });
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  };

  create = async (req: any, res: express.Response) => {
    const postData = {
      author: req.user,
      partner: req.body.partner,
    };

    const partner = await User.findByPk(Number(postData.partner));

    const dialog = new DialogModel({
      author: postData.author,
      partner: partner,
    });

    dialog
      .save()
      .then((dialogObj: any) => {
        const message = new MessageModel({
          text: req.body.text,
          user: req.user.id,
          dialog: dialogObj._id,
        });

        message
          .save()
          .then(() => {
            dialogObj.lastMessage = message._id;
            dialogObj.save().then(() => {
              res.json(dialogObj);
              this.io.emit("SERVER:DIALOG_CREATED", {
                ...postData,
                dialog: dialogObj,
              });
            });
          })
          .catch((reason) => {
            res.json(reason);
          });
      })
      .catch((reason) => {
        res.json(reason);
      });
  };

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    DialogModel.findOneAndRemove({ _id: id })
      .then((dialog) => {
        if (dialog) {
          res.json({
            message: `Dialog deleted`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: `Dialog not found`,
        });
      });
  };
}

export default DialogController;
