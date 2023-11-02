import express from 'express';
import mongoose from 'mongoose';
import Sport from '../models/sport';

export class SportController {


    dohvatiSportove = (req: express.Request, res: express.Response)=> {

        Sport.find({}, (err, sportovi)=> {
            if (err) console.log(err);
            else res.json(sportovi);
        })
    }

    dohvatiSport = (req: express.Request, res:express.Response)=> {

        let sport = req.body.sport;

        Sport.findOne({"sport": sport}, (err, sport)=> {
            if (err) console.log(err);
            else res.json(sport);
        })
    }

    unesiSport = (req: express.Request, res:express.Response)=> {

        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let vrsta = req.body.vrsta;
        let broj_igraca = req.body.broj_igraca;

        

        Sport.findOne({"sport": sport}, (err, sp)=>{
            if(err)console.log(err);
            else {
                if (sp!=null) {
                   let podaci = {
                       naziv: disciplina,
                       vrsta: vrsta,
                       broj_igraca: broj_igraca
                   }

                   Sport.collection.updateOne({"sport": sport}, {$push: {"disciplina": podaci}});
                } else {
                    if (disciplina==null || disciplina=="") {
                        Sport.collection.insertOne({"sport": sport, "disciplina": [], "vrsta": vrsta, "broj_igraca":broj_igraca});
                    
                    } else {
                        let podaci = {
                            naziv: disciplina,
                            vrsta: vrsta,
                            broj_igraca: broj_igraca
                        }

                        Sport.collection.insertOne({"sport": sport, "disciplina": [], "vrsta": null, "broj_igraca":null});
                        Sport.collection.updateOne({"sport": sport}, {$push: {"disciplina": podaci}});

                    }
                }

                res.json({'poruka': 'ok'});
            }
        })
        
    }

}