import express from 'express';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import KorisnikRouter from './routes/korisnik.route';
import MedaljeRouter from './routes/medalje.route';
import SportRouter from './routes/sport.route';
import SportistaRouter from './routes/sportista.route';
import TakmicenjeRouter from './routes/takmicenje.route';
import RekordRouter from './routes/rekord.route';
import ZahtevRouter from './routes/zahtev.route';
import RasporedIndividualni from './routes/rasporedIndividualni.route';
import RasporedEkipni from './routes/ekipniRaspored.route';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projekatAVG');
const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log('Povezano sa bazom');
    
});

const router = express.Router();

app.use('/', router);
app.use('/korisnici', KorisnikRouter);
app.use('/medalje', MedaljeRouter);
app.use('/sportovi', SportRouter);
app.use('/sportisti', SportistaRouter);
app.use('/takmicenja', TakmicenjeRouter);
app.use('/rekordi', RekordRouter);
app.use('/zahtevi', ZahtevRouter);
app.use('/rasporedI', RasporedIndividualni);
app.use('/rasporedE', RasporedEkipni);

app.listen(4000, () => console.log(`Express server running on port 4000`));