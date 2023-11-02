import express from 'express';
import rekord from '../models/rekord';
import Rekord from '../models/rekord';

export class RekordiController {

    dohvatiRekorde=(req: express.Request, res: express.Response)=> {

        Rekord.find({}, (err,rekordi)=>{
            if (err) console.log(err);
            else res.json(rekordi);
        })
    }

    dohvatiRekord=(req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        Rekord.findOne({"sport": sport, "disciplina": disciplina, "pol": pol}, (err, rekord)=>{
            if (err) console.log(err);
            else res.json(rekord);
        })
    }

    postaviNoviRekord=(req: express.Request, res: express.Response)=> {
        let ime = req.body.ime;
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let rekord = req.body.rekord;
        
        Rekord.collection.updateMany({"sport": sport, "disciplina":disciplina, "pol": pol}, {$set: {"rekorder": ime, "zemlja":zemlja, "rekord":rekord, "mesto": "Tokyo", "godina": 2020}});

        res.json({"poruka": "ok"});
    }
}