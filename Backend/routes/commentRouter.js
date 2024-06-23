import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";

export const commentRouter = new express.Router();

commentRouter.post("/comment/:id", (req, res, next) => {
  IdeaController.saveComment(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});
