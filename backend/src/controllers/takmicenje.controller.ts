import express from 'express';
import { QueryFindOneAndRemoveOptions } from 'mongoose';
import takmicenje from '../models/takmicenje';
import Takmicenje from '../models/takmicenje';

export class TakmicenjeController {

    dohvatiTakmicenja=(req: express.Request, res: express.Response)=> {

        Takmicenje.find({}, (err,takmicenja)=>{
            if (err) console.log(err);
            else res.json(takmicenja);
        })
    }

    dodajTakmicenje=(req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let datum_pocetka = req.body.datum_pocetka;
        let datum_kraja = req.body.datum_kraja;
        let lokacija = req.body.lokacija;
        let pol = req.body.pol;
        let vrsta = req.body.vrsta;
        let mera = req.body.mera;
        let br_takmicara = req.body.br_takmicara;
        let br_pokusaja = req.body.br_pokusaja;
        let ucesnici = req.body.ucesnici;
        let delegati = req.body.delegati;

        Takmicenje.collection.insertOne({"sport": sport, "disciplina": disciplina, "datum_pocetka": datum_pocetka, "datum_kraja": datum_kraja, "ucesnici": ucesnici, "vrsta":vrsta, "pol":pol, "lokacija":lokacija, "delegati": delegati, "mera": mera, "br_pokusaja":br_pokusaja, "br_takmicara": br_takmicara, "prvi": null, "drugi": null, "treci":null});
        
        res.json({'poruka':'ok'});
    }

    dohvatiTakmicenje=(req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Takmicenje.findOne({"sport": sport, "disciplina": disciplina, "pol":pol}, (err, takmicenje)=> {
            if (err) console.log(err);
            else res.json(takmicenje);
        })
    }

    dodajDelegata=(req: express.Request, res:express.Response) => {

       /* let sport = req.body.sport;
        let disciplina =req.body.disciplina;
        let ime = req.body.ime;
        let drzava = req.body.drzava;
        let korime = req.body.korime;
        let pol = req.body.pol;

        let podaci = {
            ime: ime,
            drzava: drzava,
            korime: korime
        }

        Takmicenje.collection.updateOne({"sport": sport, "disciplina" : disciplina, "pol": pol}, {$push: {"delegati": podaci}});
        //res.json({'poruka':'ok'});*/
    }

    dodajUcesnike=(req: express.Request, res: express.Response)=> {

       /* let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let ucesnici = req.body.ucesnici;

        if (disciplina == ' ') {
            Takmicenje.collection.updateOne({"sport": sport, "disciplina": disciplina, "pol":pol}, {$set: {"ucesnici": ucesnici}});
        } else Takmicenje.collection.updateOne({"sport": sport, "pol":pol}, {$set: {"ucesnici": ucesnici}});
      
      res.json({'poruka': 'ok'});
        */
    } 

    dohvatiTakmicenjaDelegata=(req: express.Request, res: express.Response)=>{

        let korime = req.body.korime;

        Takmicenje.find({"delegati": {$regex: korime}}, (err, takmicenja)=>{
            if (err) console.log(err);
            else res.json(takmicenja);
        })
    }

    azurirajMesta = (req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let prvi = req.body.prvi;
        let drugi = req.body.drugi;
        let treci = req.body.treci;

        Takmicenje.collection.updateMany({"sport": sport, "disciplina": disciplina, "pol":pol}, {$set: {"prvi":prvi, "drugi":drugi, "treci": treci}});
        res.json({"poruka":"ok"});
    }
}