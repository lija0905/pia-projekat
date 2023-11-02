import express from 'express';
import { MedaljeController } from '../controllers/medalje.controller';

const MedaljeRouter = express.Router(); 

MedaljeRouter.route('/dohvatiPodatke').get(
  (req, res) => new MedaljeController().dohvatiPodatke(req, res)
)

MedaljeRouter.route('/azurirajZlatne').post(
  (req, res) => new MedaljeController().azurirajZlatne(req, res)
)

MedaljeRouter.route('/azurirajSrebrne').post(
  (req, res) => new MedaljeController().azurirajSrebrne(req, res)
)

MedaljeRouter.route('/azurirajBronzane').post(
  (req, res) => new MedaljeController().azurirajBronzane(req, res)
)

export default MedaljeRouter;