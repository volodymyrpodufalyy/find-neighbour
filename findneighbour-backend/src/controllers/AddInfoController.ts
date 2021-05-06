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
      res.json({
        status: "success",
        addInfo: addInfoObj
      });
    })
    .catch(err => {
      res.json({
        status: "error",
        message: err
      });
    });
  };


  index = (req: any, res: express.Response) => {
    const userId = req.user._id;

    AddInfoModel.find({ user: userId })
      .populate(["user"])
      .exec(function(err, addinfo) {
        if (err) {
          return res.status(404).json({
            message: "addinfo not found"
          });
        }
        return res.json(addinfo);
      });
  };
  
}

export default AddInfoController;