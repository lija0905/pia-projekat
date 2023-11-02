import express from 'express';
import { TakmicenjeController } from '../controllers/takmicenje.controller';

const TakmicenjeRouter = express.Router(); 

TakmicenjeRouter.route('/dohvatiTakmicenja').get(
  (req, res) => new TakmicenjeController().dohvatiTakmicenja(req, res)
)

TakmicenjeRouter.route('/dodajTakmicenje').post(
  (req, res)=>new TakmicenjeController().dodajTakmicenje(req, res)
)

TakmicenjeRouter.route('/dohvatiTakmicenje').post(
  (req, res)=>new TakmicenjeController().dohvatiTakmicenje(req, res)
)

TakmicenjeRouter.route('/dodajDelegata').post(
  (req, res)=> new TakmicenjeController().dodajDelegata(req, res)
)

TakmicenjeRouter.route('/dodajUcesnike').post(
  (req, res)=>new TakmicenjeController().dodajUcesnike(req, res)
)

TakmicenjeRouter.route('/dohvatiTakmicenjaDelegata').post(
  (req, res)=> new TakmicenjeController().dohvatiTakmicenjaDelegata(req, res)
)

TakmicenjeRouter.route('/azurirajMesta').post(
  (req, res)=> new TakmicenjeController().azurirajMesta(req, res)
)
export default TakmicenjeRouter;