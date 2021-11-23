import express from "express";
import { range } from "lodash";
import { Op, UniqueConstraintError } from "sequelize";
import { sequelize } from "../core/dbconfig";
import { AddInfo, AddInfoCreationAttributes } from "../models/SAddInfo";
import { User } from "../models/SUser";

class AddInfoController {
  userRepository = sequelize.getRepository(User);
  addInfoRepository = sequelize.getRepository(AddInfo);

  create = async (req: express.Request, res: express.Response) => {
    const user = req.user as User;

    const postData: AddInfoCreationAttributes = {
      age: req.body.age,
      address: req.body.adress,
      sex: req.body.sex,
      hasPets: req.body.pets,
      hasBadHabits: req.body.badHabits,
      isStudent: req.body.kindOfActivity,
      hasJob: req.body.haveJobOrJobless,
      isMarried: req.body.maritalStatus,
      phoneNumber: req.body.phoneNumber,
      moreAbout: req.body.moreAboutUser,
    };
    try {
      const addInfo = await AddInfo.create(postData).catch((error) => {
        if (error instanceof UniqueConstraintError) {
          res.status(500).json({
            status: "error",
            message: "Such addinfo already exists",
          });
        } else {
          res.status(500).json({
            status: "error",
            message: error,
          });
        }
      });
      if (addInfo) {
        await addInfo.save();

        await addInfo.$set("user", [user.id]);
        const userEntity = await User.findByPk(user.id);
        if (userEntity) {
          await userEntity.$set("info", [addInfo.id]);
          await userEntity.save();
        }
      }
      return res.json(addInfo);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error,
      });
    }
  };

  index = (req: express.Request, res: express.Response) => {
    const id: string = String((req.user as User).id);

    try {
      const additionalInfo = AddInfo.findOne({
        where: { id: id },
        include: { all: true },
      });
      if (!additionalInfo) {
        return res.status(404).json({
          status: "error",
          message: "additionalInfo not found",
        });
      }
      return res.json(additionalInfo);
    } catch (err) {
      return res.status(404).json({
        status: "error",
        message: err,
      });
    }
  };

  getAll = async (req: any, res: any) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = Number((await AddInfo.findAndCountAll()).count);

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

    results.results = await AddInfo.findAll({
      include: { all: true },
      limit: limit,
    });
    return res.json(results);
  };

  filterUsers = (req: any, res: express.Response) => {
    const startAge = req.query.startAge;
    const endAge = req.query.endAge;

    const pets = req.query.pets;
    const badHabits = req.query.badHabits;
    const sex = req.query.sex;
    const adress = req.query.adress;

    let queryObj: any = {};

    if (
      (endAge && startAge) !== "undefined" &&
      (endAge && startAge) !== undefined
    ) {
      let ageRange = range(parseInt(startAge), parseInt(endAge) + 1);
      queryObj.age = ageRange;
    }

    if (adress !== "undefined" && adress !== undefined) {
      queryObj.adress = adress;
    }

    if (pets !== "undefined" && pets !== undefined) {
      queryObj.pets = pets;
    }
    if (badHabits !== "undefined" && badHabits !== undefined) {
      queryObj.badHabits = badHabits;
    }
    if (sex !== "undefined" && sex !== undefined) {
      queryObj.sex = sex;
    }

    try {
      const addinfos = AddInfo.findAll({
        where: {
          [Op.or]: [
            { hasPets: queryObj.pets },
            { hasBadHabits: queryObj.badHabits },
            { address: queryObj.adress },
            { sex: queryObj.sex },
            {
              age: {
                [Op.and]: {
                  [Op.gt]: startAge,
                  [Op.lt]: endAge,
                },
              },
            },
          ],
        },
      });
      return res.json(addinfos);
    } catch (err) {
      return res.status(404).json({
        message: "Users not found",
        err,
      });
    }
  };
}

export default AddInfoController;
