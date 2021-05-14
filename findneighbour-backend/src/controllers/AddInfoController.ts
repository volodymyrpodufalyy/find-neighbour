import express from "express";
import { AddInfoModel } from "../models";

class AddInfoController {

  create = (req: any, res: express.Response) => {

    const userId = req.user._id;

    const postData = {
      age: req.body.age,
      adress: req.body.adress,
      sex: req.body.sex,
      pets: req.body.pets,
      badHabits: req.body.badHabits,
      kindOfActivity: req.body.kindOfActivity,
      haveJobOrJobless: req.body.haveJobOrJobless,
      maritalStatus: req.body.maritalStatus,
      phoneNumber: req.body.phoneNumber,
      moreAboutUser: req.body.moreAboutUser,
      user: userId
    };

    const addInfo = new AddInfoModel(postData);

    addInfo
    .save()
    .then((addInfoObj: any) => {
      res.json(addInfoObj);
    })
    .catch(err => {
      res.json({
        status: "error",
        message: err
      });
    });
  };


  index = (req: any, res: express.Response) => {
    const id :string = req.user._id;

    AddInfoModel.findOne({ user: id })
      .populate(["user"])
      .exec(function(err, addinfo: any) {
        if (err) {
          return res.status(404).json({
            message: "addinfo not found"
          });
        }
        return res.json(addinfo);
      });
  };

  getAll = (req: any, res: express.Response) => {
    AddInfoModel.find({}, function(err, messages) {
      if (err) {
        return res.status(404).json({
          status: "error",
          message: "Messages not found"
        });
      }
      return res.json(messages);
    })
    .populate(["user"]);
  }
};

export default AddInfoController;