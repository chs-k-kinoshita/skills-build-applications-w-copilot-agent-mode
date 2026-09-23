import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

export const apiRouter = Router();

function registerCollectionRoutes(path: string, model: typeof User) {
  apiRouter.get(path, async (_request, response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable', details: String(error) });
    }
  });

  apiRouter.post(path, async (request, response) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      response.status(400).json({ error: 'Invalid request', details: String(error) });
    }
  });
}

registerCollectionRoutes('/users', User);
registerCollectionRoutes('/teams', Team);
registerCollectionRoutes('/activities', Activity);
registerCollectionRoutes('/leaderboard', Leaderboard);
registerCollectionRoutes('/workouts', Workout);