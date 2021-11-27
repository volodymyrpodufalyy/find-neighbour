import { Dialog } from "./../models/SDialog";
import { User } from "./../models/SUser";
import express from "express";
import socket from "socket.io";

import { MessageModel, DialogModel } from "../models";
import { IMessage } from "../models/Message";

class MessageController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (req: express.Request, res: express.Response) => {
    const dialogId = Number(req.query.dialog);
    const userId = (req.user as User).id;

    console.log(dialogId, "dialog id");

    MessageModel.updateMany(
      { dialog: dialogId, "user.id": { $ne: Number(userId) } },
      { $set: { readed: true } },
      (err: any) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: "error",
            message: err,
          });
        }
      }
    );

    const dialog = await Dialog.findByPk(dialogId);
    dialog &&
      dialog.update({ lastMessage: { ...dialog.lastMessage, readed: true } });

    MessageModel.find({ dialog: dialogId })
      .populate(["attachments"])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            status: "error",
            message: "Messages not found",
          });
        }
        return res.json(messages);
      });
  };

  create = (req: any, res: express.Response): void => {
    const user = req.user;

    const postData = {
      text: req.body.text,
      dialog: Number(req.body.dialog_id),
      attachments: req.body.attachments,
      user: {
        id: user.id,
        fullname: user.fullname,
      },
    };

    const message = new MessageModel(postData);

    message
      .save()
      .then((obj: IMessage) => {
        obj.populate("attachments", async (err: any, message: IMessage) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: err,
            });
          }
          this.io.emit("SERVER:NEW_MESSAGE", message);

          await Dialog.update(
            {
              lastMessage: {
                text: postData.attachments.length ? "Media" : postData.text,
                user: Number(postData.user.id),
                createdAt: obj.createdAt,
              },
            },
            { where: { id: postData.dialog } }
          );

          res.json(message);
        });
      })
      .catch((reason) => {
        res.json(reason);
      });
  };

  delete = (req: any, res: express.Response) => {
    const id: string = req.query.id;
    const userId: string = req.user.id;

    MessageModel.findById(id, (err, message: any) => {
      if (err || !message) {
        return res.status(404).json({
          status: "error",
          message: "Message not found",
        });
      }

      if (message.user.toString() === userId) {
        const dialogId = message.dialog;
        message.remove();

        MessageModel.findOne(
          { dialog: dialogId },
          {},
          { sort: { created_at: -1 } },
          (err, lastMessage) => {
            if (err) {
              res.status(500).json({
                status: "error",
                message: err,
              });
            }

            DialogModel.findById(dialogId, (err, dialog: any) => {
              if (err) {
                res.status(500).json({
                  status: "error",
                  message: err,
                });
              }

              dialog.lastMessage = lastMessage;
              dialog.save();
            });
          }
        );

        return res.json({
          status: "success",
          message: "Message deleted",
        });
      } else {
        return res.status(403).json({
          status: "error",
          message: "Not have permission",
        });
      }
    });
  };
}

export default MessageController;
