import express from 'express';
import { SportistaController } from '../controllers/sportista.controller';

const SportistaRouter = express.Router(); 

SportistaRouter.route('/dohvatiSportiste').get(
  (req, res) => new SportistaController().dohvatiSportiste(req, res)
)

SportistaRouter.route('/pretraziSportiste').post(
  (req, res) => new SportistaController().pretraziSportiste(req, res)
)

SportistaRouter.route('/dodajSportistu').post(
  (req, res) => new SportistaController().dodajSportistu(req, res)
)

SportistaRouter.route('/dohvatiMojeSportiste').post(
  (req, res)=> new SportistaController().dohvatiMojeSportiste(req, res)
)

SportistaRouter.route('/dohvatiSveMojeSportiste').post(
  (req, res)=> new SportistaController().dohvatiSveMojeSportiste(req, res)
)

SportistaRouter.route('/dohvatiPrijavljeneSportiste').post(
  (req, res)=> new SportistaController().dohvatiPrijavljeneSportiste(req, res)
)

SportistaRouter.route('/dodajMedalju').post(
  (req, res)=> new SportistaController().dodajMedalju(req, res)
)

SportistaRouter.route('/dodajDisciplinu').post(
  (req, res)=> new SportistaController().dodajDisciplinu(req, res)
)

SportistaRouter.route('/dohvatiSportistu').post(
  (req, res)=> new SportistaController().dohvatiSportistu(req, res)
)
export default SportistaRouter;