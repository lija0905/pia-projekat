import express from 'express';
import { RasporedEkipniController } from '../controllers/rasporedEkipni.controller';

const RasporedEkipni = express.Router(); 

RasporedEkipni.route('/kreirajRaspored').post(
  (req, res) => new RasporedEkipniController().dodajRaspored(req, res)
)

RasporedEkipni.route('/dohvatiRaspored').post(
    (req, res) => new RasporedEkipniController().dohvatiRaspored(req, res)
)

RasporedEkipni.route('/unesiDatum').post(
    (req, res)=> new RasporedEkipniController().unesiDatum(req, res)
)

RasporedEkipni.route('/unesiVreme').post(
    (req, res)=> new RasporedEkipniController().unesiVreme(req, res)
)

RasporedEkipni.route('/unesiRezultat').post(
    (req, res)=> new RasporedEkipniController().unesiRezultat(req, res)
)

RasporedEkipni.route('/dohvatiTakmicenjeSaIstimVremenom').post(
    (req, res)=> new RasporedEkipniController().dohvatiTakmicenjaSaIstimVremenom(req, res)
)

RasporedEkipni.route('/dohvatiGrupu').post(
    (req, res)=> new RasporedEkipniController().dohvatiGrupu(req, res)
)

RasporedEkipni.route('/dohvatiCetvrtfinale').post(
    (req, res)=> new RasporedEkipniController().dohvatiCetvrtfinale(req, res)
)


RasporedEkipni.route('/dohvatiPolufinale').post(
    (req, res)=> new RasporedEkipniController().dohvatiPolufinale(req, res)
)

RasporedEkipni.route('/dohvatiFinale').post(
    (req, res)=> new RasporedEkipniController().dohvatiFinale(req, res)
)
export default RasporedEkipni;