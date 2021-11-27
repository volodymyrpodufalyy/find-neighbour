import { Dialog, DialogMessage } from "./../models/SDialog";
import express from "express";
import socket from "socket.io";
import { sequelize } from "../core/dbconfig";
import { Op } from "sequelize";

import { DialogModel, MessageModel } from "../models";
import { IDialog } from "../models/Dialog";
import { User } from "../models/SUser";
import Message from "../models/Message";

class DialogController {
  io: socket.Server;
  userRepository = sequelize.getRepository(User);

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = async (req: express.Request, res: express.Response) => {
    const user = req.user as User;

    try {
      Dialog.findAll({
        where: {
          [Op.or]: [
            {
              authorId: Number(user.id),
            },
            {
              partnerId: Number(user.id),
            },
          ],
        },
        include: [
          { model: User, as: "author" },
          { model: User, as: "partner" },
        ],
      }).then((dialogs) => {
        if (!dialogs.length) {
          return res.status(404).json({
            message: "Dialogs not found",
          });
        }
        return res.json(dialogs);
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

    if (partner) {
      const dialog = new Dialog({
        authorId: Number(postData.author.id),
        partnerId: partner.id,
        lastMessage: {} as DialogMessage,
      });

      dialog.$set("partner", [partner.id]);
      dialog.$set("author", [Number(postData.author.id)]);
      dialog
        .save()
        .then(async (dialogObj: any) => {
          const message = new MessageModel({
            text: req.body.text,
            user: {
              id: req.user.id,
              fullname: req.user.fullname,
            },
            dialog: dialogObj.id,
          });

          await message.save().catch((err) =>
            res.json({
              error: err,
            })
          );

          dialog
            .update({
              lastMessage: {
                text: message.text,
                user: message.user.id,
                createdAt: message.createdAt,
              },
            })
            .then(() => {
              res.json(dialogObj);
              this.io.emit("SERVER:DIALOG_CREATED", {
                ...postData,
                dialog: dialogObj,
              });
            })
            .catch((reason) => {
              res.json(reason);
            });
        })
        .catch((reason) => {
          res.json(reason);
        });
    }
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
