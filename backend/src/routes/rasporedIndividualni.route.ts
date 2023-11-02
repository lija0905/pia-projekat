import express from 'express';
import { RasporedIndividualniController } from '../controllers/rasporedIndividualni.controller';

const RasporedIndividualni = express.Router(); 

RasporedIndividualni.route('/kreirajRaspored').post(
  (req, res) => new RasporedIndividualniController().kreirajRaspored(req, res)
)
RasporedIndividualni.route('/dohvatiRasporedSaIstimVremenom').post(
    (req, res)=> new RasporedIndividualniController().dohvatiRasporedSaIstimVremenom(req, res)
)

RasporedIndividualni.route('/dohvatiRaspored').post(
  (req, res)=> new RasporedIndividualniController().dohvatiRaspored(req, res)
)

RasporedIndividualni.route('/dodajRezultat').post(
  (req, res)=> new RasporedIndividualniController().dodajRezultat(req, res)
)

RasporedIndividualni.route('/zavrsiTakmicenje').post(
  (req, res)=> new RasporedIndividualniController().zavrsiTakmicenje(req, res)
)
export default RasporedIndividualni;