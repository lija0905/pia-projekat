import express from 'express';
import { RekordiController } from '../controllers/rekord.controller';

const RekordRouter = express.Router();

RekordRouter.route('/dohvatiRekorde').get(
    (req, res)=> new RekordiController().dohvatiRekorde(req, res)

)

RekordRouter.route('/dohvatiRekord').post(
    (req, res)=> new RekordiController().dohvatiRekord(req, res)
)

RekordRouter.route('/postaviNoviRekord').post(
    (req, res)=> new RekordiController().postaviNoviRekord(req, res)
)

export default RekordRouter;