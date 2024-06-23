import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureIdeaDoesntExeedMaxLength } from "../middleware/validIdea.js";

export const ideaRouter = new express.Router();


ideaRouter.get("/ideas", (req, res, next) => {
  IdeaController.getIdeas().then(ideas => {
    res.json(ideas)
  }).catch(err => {
    next(err);
  });
});


ideaRouter.post("/ideas", ensureIdeaDoesntExeedMaxLength, (req, res, next) => {
  IdeaController.saveIdea(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});



ideaRouter.get("/ideas/:id", (req, res, next) => {
  IdeaController.getDetailedIdea(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Idea not found"});
  }).catch( err => {
    next(err);
  });
});
