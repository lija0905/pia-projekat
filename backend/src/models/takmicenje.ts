import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Takmicenje = new Schema (
    {
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        datum_pocetka: {
            type: String
        },
        datum_kraja: {
            type: String
        },
        ucesnici: {
            type: Array
        },
        vrsta: {
            type: String
        },
        pol: {
            type: String
        },
        lokacija: {
            type: String
        },
        delegati: {
            type: Array
        },
        mera: {
            type: String
        },
        br_takmicara: {
            type: Number
        },
        br_pokusaja: {
            type: Number
        },
        prvi: {
            type: String
        },
        drugi: {
            type: String
        },
        treci: {
            type: String
        }
    }
)

export default mongoose.model('Takmicenje', Takmicenje, 'takmicenja');