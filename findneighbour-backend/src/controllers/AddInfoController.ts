import express from "express";
import { range } from "lodash";
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
      user: userId,
    };

    const addInfo = new AddInfoModel(postData);

    addInfo
      .save()
      .then((addInfoObj: any) => {
        res.json(addInfoObj);
      })
      .catch((err) => {
        res.json({
          status: "error",
          message: err,
        });
      });
  };

  index = (req: any, res: express.Response) => {
    const id: string = req.user._id;

    AddInfoModel.findOne({ user: id })
      .populate(["user"])
      .exec(function (err, addinfo: any) {
        if (err) {
          return res.status(404).json({
            message: "addinfo not found",
          });
        }
        return res.json(addinfo);
      });
  };

  getAll = async (req: any, res: any) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = (await AddInfoModel.countDocuments().exec());

    const results = {
      totalCount,
      next: {},
      previous: {},
      results: {},
    };

    if (endIndex < totalCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await AddInfoModel.find()
    .populate(["user"])
    .limit(limit)
    .skip(startIndex)
    .exec();
    return res.json(results);

  };

  filterUsers = (req: any, res: express.Response) => {
    const startAge = parseInt(req.query.startAge);
    const endAge = parseInt(req.query.endAge);

    const pets = req.query.pets;
    const badHabits = req.query.badHabits;
    const sex = req.query.sex;

    let queryObj: any = {};
    
    if(endAge && startAge !== (undefined && '')) {
      let ageRange = range(startAge, endAge + 1);
      queryObj.age = ageRange;
    }
    if(pets !== (undefined && '')) {
      queryObj.pets = pets;
    }
    if(badHabits !== (undefined && '')) {
      queryObj.badHabits = badHabits;
    }    
    if(sex !== (undefined && '')) {
      queryObj.sex = sex;
    }        

    AddInfoModel.find(queryObj)
    .populate(["user"])
    .exec(function (err, addinfos: any) {
      if (err) {
        return res.status(404).json({
          message: "Users not found", err
        });
      }
      return res.json(addinfos);
    });
    
  };


}


export default AddInfoController;
