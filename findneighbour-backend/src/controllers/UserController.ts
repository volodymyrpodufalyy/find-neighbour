import express from "express";
import bcrypt from "bcrypt";
import socket from "socket.io";
import { validationResult } from "express-validator";
import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";

import { IUser } from "../models/User";
import { UserModel } from "../models";
import { User } from "../models/SUser";
import { sequelize } from "../core/dbconfig";

import { createJWToken } from "../utils";
import transporter from "../core/mailer";

class UserController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  userRepository = sequelize.getRepository(User);

  show = async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    const user = await User.findByPk(id);
    return res.json(user);
  };

  getMe = (req: any, res: express.Response) => {
    const id: string = req.user._id;
    UserModel.findById(id, (err, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.json(user);
    });
  };

  findUsers = (req: any, res: express.Response) => {
    const query: string = req.query.query;
    UserModel.find()
      .or([
        { fullname: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ])
      .then((users: any) => res.json(users))
      .catch((err: any) => {
        return res.status(404).json({
          status: "error",
          message: err,
        });
      });
  };

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    UserModel.findOneAndRemove({ _id: id })
      .then((user) => {
        if (user) {
          res.json({
            message: `User ${user.fullname} deleted`,
          });
        }
      })
      .catch(() => {
        res.json({
          message: `User not found`,
        });
      });
  };

  create = (req: express.Request, res: express.Response): void => {
    const postData: { email: string; fullname: string; password: string } = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    };

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      this.userRepository
        .create(postData)
        .then((obj) => {
          const token = createJWToken(obj);
          res.json({
            obj,
            token,
          });
          transporter.sendMail(
            {
              to: postData.email,
              subject: "Підтвердження пошти від FindNeighbour",
              html: `Для того, щоб підтвердити пошту, перейдіть на <a href="http://localhost:3000/signup/verify?hash=${obj.confirm_hash}">за цим посиланням</a>`,
            },
            function (err: Error | null, info: SentMessageInfo) {
              if (err) {
                console.log(err);
              } else {
                console.log(info);
              }
            }
          );
        })
        .catch((reason) => {
          res.status(500).json({
            status: "error",
            message: reason,
          });
        });
    }
  };

  verify = (req: express.Request, res: express.Response) => {
    const hash = req.query.hash;

    if (!hash) {
      return res.status(422).json({ errors: "Invalid hash" });
    }

    UserModel.findOne({ confirm_hash: hash }, (err, user) => {
      if (err || !user) {
        return res.status(404).json({
          status: "error",
          message: "Hash not found",
        });
      }

      user.confirmed = true;
      user.save((err) => {
        if (err) {
          return res.status(404).json({
            status: "error",
            message: err,
          });
        }

        res.json({
          status: "success",
          message: "Аккаунт успішно підтверджено!",
        });
      });
    });
  };

  login = (req: express.Request, res: express.Response) => {
    const postData = {
      email: req.body.email,
      password: req.body.password,
    };

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    UserModel.findOne({ email: postData.email }, (err, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (bcrypt.compareSync(postData.password, user.password)) {
        const token = createJWToken(user);
        res.json({
          status: "success",
          token,
        });
      } else {
        res.status(403).json({
          status: "error",
          message: "Incorrect password or email",
        });
      }
    });
  };
}

export default UserController;
