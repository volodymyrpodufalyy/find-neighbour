import express from "express";
import { verifyJWToken } from "../utils";
import { IUser } from "../models/User";

const swaggerRegExp = new RegExp("/api-docs(.*)");

export default (req: any, res: any, next: any) => {
  if (
    req.path === "/" ||
    req.path === "/user/signin" ||
    req.path === "/user/signup" ||
    req.path === "/user/verify" ||
    swaggerRegExp.test(req.path)
  ) {
    return next();
  }

  const token = req.headers.token;

  verifyJWToken(token)
    .then((user: any) => {
      req.user = user.data._doc;
      next();
    })
    .catch((err) => {
      res.status(403).json({ message: "Invalid auth token provided." });
    });
};
