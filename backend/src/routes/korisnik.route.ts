import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const KorisnikRouter = express.Router(); 

KorisnikRouter.route('/dohvatiKorisnika').post(
  (req, res) => new KorisnikController().dohvatiKorisnika(req, res)
)

KorisnikRouter.route('/promeniLozinku').post(
  (req, res) => new KorisnikController().promeniLozinku(req, res)
)

KorisnikRouter.route('/dodajVodju').post(
  (req, res) => new KorisnikController().dodajVodju(req, res)
)

KorisnikRouter.route('/dodajDelegata').post(
  (req, res) => new KorisnikController().dodajDelegata(req, res)
)

KorisnikRouter.route('/dohvatiVodjuDelegacije').post(
  (req, res) => new KorisnikController().dohvatiVodjuDelegacije(req, res)
)

KorisnikRouter.route('/dodajTakmicenje').post(
  (req, res)=> new KorisnikController().dodajTakmicenje(req, res)
)

KorisnikRouter.route('/dohvatiDelegate').get(
  (req, res)=> new KorisnikController().dohvatiDelegate(req, res)
)
export default KorisnikRouter;