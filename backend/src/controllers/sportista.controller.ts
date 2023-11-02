import express from 'express';
import Sportista from '../models/sportista';

export class SportistaController {


    dohvatiSportiste = (req: express.Request, res: express.Response)=> {

        Sportista.find({}, (err, sportisti)=> {
            if (err) console.log(err);
            else res.json(sportisti);
        })
    }

    pretraziSportiste = (req: express.Request, res:express.Response)=> {

        let ime = req.body.ime;
        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let medalja = req.body.medalja;


        if (disciplina=='') {
            if (medalja == 1) {
                Sportista.find({"ime": {$regex: ime}, "zemlja" : {$regex: zemlja}, "sport": {$regex: sport},
                "pol": {$regex: pol}, "osvojena_medalja": {$gte: 1}}, (err, sportisti)=>{
                if (err) console.log(err);
                else res.json(sportisti);
            })
            } else if (medalja==0) {
            Sportista.find({"ime": {$regex: ime}, "zemlja" : {$regex: zemlja}, "sport": {$regex: sport},
            "pol": {$regex: pol}}, (err, sportisti)=>{
                if (err) console.log(err);
                else res.json(sportisti);
            })
        }
        } else {
            if (medalja == 1) {
            Sportista.find({"ime": {$regex: ime}, "zemlja" : {$regex: zemlja}, "sport": {$regex: sport}, "discipline.naziv": {$regex: disciplina}, 
            "pol": {$regex: pol}, "osvojena_medalja": 1}, (err, sportisti)=>{
                if (err) console.log(err);
                else res.json(sportisti);
            })
        } else if (medalja==0) {
            Sportista.find({"ime": {$regex: ime}, "zemlja" : {$regex: zemlja}, "sport": {$regex: sport}, "discipline.naziv": {$regex: disciplina},
            "pol": {$regex: pol}}, (err, sportisti)=>{
                if (err) console.log(err);
                else res.json(sportisti);
        })
        }
        }

    }

    dodajSportistu = (req: express.Request, res:express.Response)=> {

        let ime = req.body.ime;
        let sport = req.body.sport;
        let zemlja = req.body.zemlja;
        let pol = req.body.pol;
        let disciplina = req.body.disciplina;

        Sportista.findOne({"ime" : ime, "sport": sport, "zemlja" :zemlja}, (err, sportista)=> {
            if (err) console.log(err);
            else if (sportista==null) {
                if (disciplina==null || disciplina=="") {
                    Sportista.collection.insertOne({"ime": ime, "sport": sport, "zemlja":zemlja, "discipline": [], "pol":pol, "osvojena_medalja":0});
                } else {

                    let podaci = {
                        naziv: disciplina,
                        medalja: "",
                    }
                    Sportista.collection.insertOne({"ime": ime, "sport": sport, "zemlja": zemlja, "discipline": [], "pol":pol, "osvojena_medalja":0});
                    
                    Sportista.collection.updateOne({"ime": ime, "sport": sport, "zemlja": zemlja, "pol": pol}, {$push: {"discipline": podaci}});
                } 
            } else {

                if (disciplina!=null) {
                    let podaci = {
                        naziv: disciplina,
                        medalja: "",
                    }
                    Sportista.collection.updateOne({"ime" : ime, "sport": sport, "zemlja": zemlja, "pol": pol}, {$push: {"discipline": podaci }});
                }
                
            }
            res.json({'poruka': 'ok'});
        })

    }

    dodajDisciplinu = (req: express.Request, res: express.Response) => {
        let ime = req.body.ime;
        let sport = req.body.sport;
        let zemlja = req.body.zemlja;
        let pol = req.body.pol;
        let disciplina = req.body.disciplina;

        let podaci = {
            naziv: disciplina,
            medalja: ""
        }

 
        res.json({"poruka":"ok"});


    }

    dohvatiSportistu=(req: express.Request, res: express.Response)=> {

        let ime = req.body.ime;
        let sport = req.body.sport;
        let zemlja = req.body.zemlja;

        Sportista.findOne({"ime":ime, "sport": sport, "zemlja": zemlja}, (err, sportista)=> {
            if (err) console.log(err);
            else res.json({"poruka":"ok"})
        })
    }

    dohvatiMojeSportiste=(req: express.Request, res: express.Response)=> {

        let zemlja = req.body.zemlja;
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;

        if (disciplina == "" || disciplina==null) {
               
            Sportista.find({"zemlja": zemlja, "sport": sport}, (err, sportisti)=> {
                if (err)console.log(err);
                else res.json(sportisti);
            })

        }else {
            Sportista.find({"zemlja": zemlja, "sport": sport, "discipline.naziv": disciplina}, (err, sportisti)=> {
                if (err)console.log(err);
                else res.json(sportisti);
            })
        }
       
    }

    dohvatiSveMojeSportiste=(req: express.Request, res: express.Response)=> {

        let zemlja = req.body.zemlja;

        Sportista.find({"zemlja": zemlja}, (err, sportisti)=> {
            if (err) console.log(err);
            else res.json(sportisti);
        })
    }

    dohvatiPrijavljeneSportiste=(req: express.Request, res: express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;

        if (disciplina==null || disciplina=='') {
            Sportista.find({"sport":sport, "pol": pol}, (err, sportisti)=> {
                if (err)console.log(err);
                else res.json(sportisti);
            })
        } else {
            Sportista.find({"sport":sport, "pol": pol, "discipline.naziv":disciplina}, (err, sportisti)=> {
                if (err)console.log(err);
                else res.json(sportisti);
            })
        }
              
    }

    dodajMedalju=(req: express.Request, res: express.Response)=> {

        let ime = req.body.ime; 
        let disciplina = req.body.disciplina;
        let medalja = req.body.medalja;

        if (disciplina=="" || disciplina==null) {
            console.log('discipline nema');
            Sportista.collection.updateOne({"ime":ime}, {$set: {"osvojena_medalja": medalja}});
        } else {
            Sportista.collection.updateOne({"ime":ime, "discipline.naziv":disciplina}, {$set: {"discipline.$.medalja":medalja}});
            Sportista.collection.updateOne({"ime":ime}, {$set: {"osvojena_medalja": 1}});
        }

        res.json({'poruka':'ok'});
    }

}