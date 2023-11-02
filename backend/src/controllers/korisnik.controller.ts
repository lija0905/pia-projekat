import express, { json } from 'express';
import Korisnik from '../models/korisnik';

export class KorisnikController {

    dohvatiKorisnika = (req: express.Request, res: express.Response) => {

        let korime = req.body.korime;
        let lozinka = req.body.lozinka;

        Korisnik.findOne({"korime" : korime, "lozinka": lozinka}, (err, korisnik)=> {

            if (err) console.log(err);
            else res.json(korisnik);
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {

        let lozinka = req.body.lozinka;
        let korime = req.body.korime;

        Korisnik.collection.updateOne({"korime": korime}, {$set: {"lozinka": lozinka}});
        res.json({'message':'Uspesno ste promenili lozinku'});

    }

    dodajVodju = (req: express.Request, res: express.Response)=> {

        let korisnik = new Korisnik(req.body);

        korisnik.save().then(r => {
            res.json({"poruka":"ok"})
        }).catch(err=>{console.log(err)});
    }

    dodajDelegata = (req: express.Request, res: express.Response)=> {

        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let korime= req.body.korime;
        let lozinka = req.body.lozinka;
        let email = req.body.email;
        let drzava = req.body.drzava;
        let tip = req.body.tip;

        Korisnik.collection.insertOne({"ime":ime, "prezime":prezime, "korime":korime, "lozinka":lozinka, "email":email, "drzava":drzava, "tip":tip, "takmicenja":[]});
        res.json({'poruka':'ok'});
    }

    dohvatiVodjuDelegacije = (req: express.Request, res: express.Response)=> {

        let drzava = req.body.drzava;
        let tip = req.body.tip;

        Korisnik.findOne({"drzava":drzava, "tip": tip}, (err, korisnik)=>{
            if (err) console.log(err);
            else res.json(korisnik);
        });


    }

    dodajTakmicenje = (req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let korime = req.body.korime;
        let drzava = req.body.drzava;
        let pol = req.body.pol;

        let podaci = {
            sport: sport,
            disciplina: disciplina,
            pol: pol
        }

        Korisnik.collection.updateOne({"korime":korime, "drzava": drzava}, {$push: {"takmicenja": podaci}});
        //res.json({'poruka':'ok'});
    }

    dohvatiDelegate = (req: express.Request, res: express.Response)=> {

        Korisnik.find({"tip": "delegat"}, (err, korisnici)=>{
            if (err) console.log(err);
            else res.json(korisnici);
        })
    }
}