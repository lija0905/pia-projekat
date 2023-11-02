import express from 'express';
import { ZahtevController } from '../controllers/zahtev.controller';

const ZahtevRouter = express.Router();

ZahtevRouter.route('/dodajZahtev').post(
    (req, res)=> new ZahtevController().dodajZahtev(req, res)

)

ZahtevRouter.route('/dohvatiZahteve').get(
    (req, res)=>new ZahtevController().dohvatiZahteve(req, res)
)

ZahtevRouter.route('/obrisiZahtev').post(
    (req, res)=>new ZahtevController().obrisiZahtev(req, res)
)

export default ZahtevRouter;