import express, { json } from 'express';
import Zahtev from '../models/zahtev';
import Rekord from '../models/rekord';

export class ZahtevController {

    dodajZahtev=(req: express.Request, res: express.Response)=>{

        let zahtev = new Zahtev(req.body);

        zahtev.save().then(r=>{
            res.json({"poruka":"ok"});
        }).catch(err=>{
            console.log(err);
        })
    }

    dohvatiZahteve=(req: express.Request, res: express.Response)=> {

        Zahtev.find({},(err, zahtevi)=>{
            if (err) console.log(err);
            else res.json(zahtevi);
        })
    }

    obrisiZahtev=(req: express.Request, res: express.Response)=> {

        let korime = req.body.korime;
        let lozinka = req.body.lozinka;
        let tip = req.body.tip;
        let drzava = req.body.drzava;


        Zahtev.collection.deleteOne({"korime": korime, "lozinka": lozinka, "tip": tip, "drzava": drzava});
        res.json({'poruka' : 'obrisano'});
    }
}