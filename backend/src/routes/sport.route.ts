import express from 'express';
import { SportController } from '../controllers/sport.controller';

const SportRouter = express.Router(); 

SportRouter.route('/dohvatiSportove').get(
  (req, res) => new SportController().dohvatiSportove(req, res)
)

SportRouter.route('/dohvatiSport').post(
    (req, res)=>new SportController().dohvatiSport(req, res)
)

SportRouter.route('/unesiSport').post(
  (req, res)=>new SportController().unesiSport(req, res)
)

export default SportRouter;