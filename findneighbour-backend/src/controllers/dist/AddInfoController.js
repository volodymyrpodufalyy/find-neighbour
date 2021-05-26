"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var models_1 = require("../models");
var AddInfoController = /** @class */ (function () {
    function AddInfoController() {
        var _this = this;
        this.create = function (req, res) {
            var userId = req.user._id;
            var postData = {
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
            var addInfo = new models_1.AddInfoModel(postData);
            addInfo
                .save()
                .then(function (addInfoObj) {
                res.json(addInfoObj);
            })["catch"](function (err) {
                res.json({
                    status: "error",
                    message: err
                });
            });
        };
        this.index = function (req, res) {
            var id = req.user._id;
            models_1.AddInfoModel.findOne({ user: id })
                .populate(["user"])
                .exec(function (err, addinfo) {
                if (err) {
                    return res.status(404).json({
                        message: "addinfo not found"
                    });
                }
                return res.json(addinfo);
            });
        };
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var page, limit, startIndex, endIndex, totalCount, results, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        page = parseInt(req.query.page);
                        limit = parseInt(req.query.limit);
                        startIndex = (page - 1) * limit;
                        endIndex = page * limit;
                        return [4 /*yield*/, models_1.AddInfoModel.countDocuments().exec()];
                    case 1:
                        totalCount = (_b.sent());
                        results = {
                            totalCount: totalCount,
                            next: {},
                            previous: {},
                            results: {}
                        };
                        if (endIndex < totalCount) {
                            results.next = {
                                page: page + 1,
                                limit: limit
                            };
                        }
                        if (startIndex > 0) {
                            results.previous = {
                                page: page - 1,
                                limit: limit
                            };
                        }
                        _a = results;
                        return [4 /*yield*/, models_1.AddInfoModel.find()
                                .populate(["user"])
                                .limit(limit)
                                .skip(startIndex)
                                .exec()];
                    case 2:
                        _a.results = _b.sent();
                        return [2 /*return*/, res.json(results)];
                }
            });
        }); };
        this.filterUsers = function (req, res) {
            var startAge = parseInt(req.query.startAge);
            var endAge = parseInt(req.query.endAge);
            var pets = req.query.pets;
            var badHabits = req.query.badHabits;
            var sex = req.query.sex;
            var queryObj = {};
            if (req.query.endAge && req.query.startAge !== undefined) {
                var ageRange = lodash_1.range(startAge, endAge + 1);
                queryObj.age = ageRange;
            }
            if (req.query.pets !== (undefined || '')) {
                queryObj.pets = pets;
            }
            if (req.query.badHabits !== undefined) {
                queryObj.badHabits = badHabits;
            }
            if (req.query.sex !== undefined) {
                queryObj.sex = sex;
            }
            console.log(req.query, queryObj, pets);
            models_1.AddInfoModel.find(queryObj)
                .populate(["user"])
                .exec(function (err, addinfos) {
                if (err) {
                    return res.status(404).json({
                        message: "Users not found",
                        err: err
                    });
                }
                return res.json(addinfos);
            });
        };
    }
    return AddInfoController;
}());
exports["default"] = AddInfoController;
