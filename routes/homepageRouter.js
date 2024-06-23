import express from "express";
import { HomepageController } from "../controllers/HomepageController.js";

export const homepageRouter = new express.Router();


homepageRouter.get("/page/:order/:number", (req, res, next) => {
  HomepageController.getPage(req).then(ideas => {
    res.json(ideas)
  }).catch(err => {
    next(err);
  });
});

