import express from 'express';
import RasporedIndividualni from '../models/rasporedIndividualni';

export class RasporedIndividualniController {

    kreirajRaspored=(req: express.Request, res: express.Response)=> {

        console.log('ovde sam');

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let datum = req.body.datum;
        let lokacija = req.body.lokacija;
        let pol = req.body.pol;
        let vrsta = req.body.vrsta;
        let mera = req.body.mera;
        let br_takmicara = req.body.br_takmicara;
        let br_pokusaja = req.body.br_pokusaja;
        let vreme = req.body.vreme;
        let rezultati = req.body.rezultati;
        
        RasporedIndividualni.collection.insertOne({"sport": sport, "disciplina": disciplina, "datum":datum, "vrsta":vrsta, "pol":pol, "lokacija":lokacija, "mera": mera, "br_pokusaja":br_pokusaja, "br_takmicara": br_takmicara, "rezultati": rezultati, "vreme": vreme, "zavrseno": 0});
        
        res.json({'poruka':'ok'});
    }

    dohvatiRasporedSaIstimVremenom=(req: express.Request, res: express.Response)=>{

        let lokacija = req.body.lokacija;
        let datum_kraja = req.body.datum_kraja;
        let vreme = req.body.vreme;

        console.log("1");

        RasporedIndividualni.find({"lokacija":lokacija, "datum_kraja":datum_kraja, "vreme":vreme}, (err, rasporedi)=>{
            if (err) console.log(err);
            else res.json(rasporedi);
        })
    }

    dohvatiRaspored=(req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let datum = req.body.datum;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
    
        console.log('2');
        RasporedIndividualni.findOne({"sport": sport, "datum": datum, "disciplina":disciplina, "pol": pol}, (err, raspored)=>{
            if (err) console.log(err);
            else res.json(raspored);
        })
    }

    dodajRezultat = (req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let datum = req.body.datum;
        let rezultat = req.body.rezultat;
        let krug = req.body.krug;
        let ime = req.body.ime;

        RasporedIndividualni.collection.updateOne({"sport": sport, "disciplina":disciplina,"pol":pol,"datum": datum, "rezultati.ime": ime }, {$set: {"rezultati.$.rezultat": rezultat}});
        RasporedIndividualni.collection.updateOne({"sport": sport, "disciplina":disciplina,"pol":pol,"datum": datum, "rezultati.ime": ime }, {$set: {"rezultati.$.krugovi": krug}});
        
        res.json({'poruka':'ok'});
}

    zavrsiTakmicenje = (req: express.Request, res: express.Response)=>{

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        RasporedIndividualni.collection.updateOne({"sport": sport, "disciplina":disciplina, "pol": pol}, {$set: {"zavrseno": 1}});
        res.json({'poruka': 'ok'});
    }
}