import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersVoteOnlyOthersIdeasNotAlreadyVoted } from "../middleware/authorization.js";

export const voteRouter = new express.Router();

/**
 * @swagger
 * /vote/{id}:
 *  post:
 *    description: Vote an idea
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              value:
 *                type: integer
 *                description: 1 for positive vote, 0 for negative vote
 *            required:
 *              - value
 *    responses:
 *      200:
 *        description: Returns the vote
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: Unique identifier
 *                value:
 *                  type: integer
 *                  description: 1 for positive vote, 0 for negative vote
 *                UserUserName:
 *                  type: string
 *                  description: Username of the user who voted
 *                IdeaId:
 *                  type: integer
 *                  description: Unique identifier of the idea voted
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                  description: Date and time the vote was created
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                  description: Date and time the vote was last updated
 */
voteRouter.post("/vote/:id", ensureUsersVoteOnlyOthersIdeasNotAlreadyVoted, (req, res, next) => {
  IdeaController.vote(req).then(vote => {
    res.json(vote)
  }).catch(err => {
    next(err);
  });
}
);
