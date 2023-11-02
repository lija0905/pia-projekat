import express from 'express';
import RasporedEkipni from '../models/rasporedEkipni';

export class RasporedEkipniController {

    dodajRaspored = (req : express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let runda = req.body.runda;
        let timA = req.body.timA;
        let timB= req.body.timB;
        let lokacija = req.body.lokacija;
    
        RasporedEkipni.collection.insertOne({"sport": sport, "disciplina": disciplina, "pol":pol, "runda": runda, "timA": timA, "timB": timB,"datum": null, "vreme": null,"lokacija":lokacija, "rezultat": null, "pobednik": 0});
        res.json({'poruka':'ok'});
    }

    dohvatiRaspored = (req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        RasporedEkipni.find({"sport": sport, "disciplina":disciplina, "pol":pol}, (err, rasporedi)=>{
            if (err) console.log(err);
            else res.json(rasporedi);
        })
    }

    unesiDatum = (req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let runda = req.body.runda;
        let timA = req.body.timA;
        let timB= req.body.timB;
        let datum = req.body.datum;

        RasporedEkipni.collection.updateOne({"sport": sport, "disciplina": disciplina, "pol":pol, "runda": runda, "timA": timA, "timB": timB}, {$set: {"datum": datum}});
        res.json({'poruka':'ok'});
    }

    unesiVreme = (req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let runda = req.body.runda;
        let timA = req.body.timA;
        let timB= req.body.timB;
        let vreme = req.body.vreme;

        RasporedEkipni.collection.updateOne({"sport": sport, "disciplina": disciplina, "pol":pol, "runda": runda, "timA": timA, "timB": timB}, {$set: {"vreme": vreme}});
        res.json({'poruka':'ok'});
    }

    unesiRezultat = (req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let runda = req.body.runda;
        let timA = req.body.timA;
        let timB= req.body.timB;
        let rezultat = req.body.rezultat;
        let pobednik = req.body.pobednik;

        RasporedEkipni.collection.updateOne({"sport": sport, "disciplina": disciplina, "pol":pol, "runda": runda, "timA": timA, "timB": timB}, {$set: {"rezultat": rezultat}});
        RasporedEkipni.collection.updateOne({"sport": sport, "disciplina": disciplina, "pol":pol, "runda": runda, "timA": timA, "timB": timB}, {$set: {"pobednik": pobednik}});
        res.json({'poruka':'ok'});
    }

    dohvatiTakmicenjaSaIstimVremenom = (req: express.Request, res: express.Response)=> {
        let lokacija = req.body.lokacija;
        let vreme = req.body.vreme;
        let datum = req.body.datum;

        RasporedEkipni.findOne({"lokacija": lokacija, "vreme": vreme, "datum": datum}, (err, raspored)=>{
            if (err) console.log(err);
            else res.json(raspored);
        })
    }

    dohvatiGrupu=(req: express.Request, res: express.Response)=> {

        let sport= req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let runda = req.body.runda;

        RasporedEkipni.find({"sport": sport, "disciplina":disciplina, "pol":pol, "runda":runda}, (err, grupe)=>{
            if (err) console.log(err);
            else res.json(grupe);
        })
    }

    dohvatiCetvrtfinale=(req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        
        RasporedEkipni.find({"sport": sport, "disciplina": disciplina, "pol":pol, "runda": {$regex: "cetvrtfinale"}}, (err, rasporedi)=>{
                if (err) console.log(err);
                else res.json(rasporedi);
        })
    }

    dohvatiPolufinale=(req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        
        RasporedEkipni.find({"sport": sport, "disciplina": disciplina, "pol":pol, "runda": {$regex: "polufinale"}}, (err, rasporedi)=>{
                if (err) console.log(err);
                else res.json(rasporedi);
        })
    }

    dohvatiFinale=(req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let runda = req.body.runda;
        
        RasporedEkipni.findOne({"sport": sport, "disciplina": disciplina, "pol":pol, "runda":runda}, (err, rasporedi)=>{
                if (err) console.log(err);
                else res.json(rasporedi);
        })
    }

}