import express from 'express';
import mongoose from 'mongoose';
import Medalje from '../models/medalje';

export class MedaljeController {


    dohvatiPodatke = (req: express.Request, res: express.Response)=> {

        Medalje.find({}, (err, medalje)=> {
            if (err) console.log(err);
            else res.json(medalje);
        })
    }

    azurirajZlatne = (req: express.Request, res: express.Response)=> {

        let zemlja = req.body.zemlja;
        console.log(zemlja);

        Medalje.collection.updateOne({"zemlja": zemlja}, {$inc: {"br_zlatnih": 1}});
        Medalje.collection.updateOne({"zemlja": zemlja}, {$inc: {"ukupno": 1}});
        res.json({'poruka': 'ok'});
    }

    azurirajSrebrne = (req: express.Request, res: express.Response)=> {

        let zemlja = req.body.zemlja;

        Medalje.collection.updateOne({"zemlja": zemlja}, {$inc: {"br_srebrnih": 1}});
        Medalje.collection.updateOne({"zemlja": zemlja}, {$inc: {"ukupno": 1}});
        res.json({'poruka': 'ok'});
    }

    azurirajBronzane = (req: express.Request, res: express.Response)=> {

        let zemlja = req.body.zemlja;

        Medalje.collection.updateOne({"zemlja": zemlja}, {$inc: {"br_bronzanih": 1}});
        Medalje.collection.updateOne({"zemlja": zemlja}, {$inc: {"ukupno": 1}});
        res.json({'poruka': 'ok'});
    }
}