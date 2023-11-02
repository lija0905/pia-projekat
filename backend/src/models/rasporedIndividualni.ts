import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RasporedIndividualni = new Schema (
    {
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        datum: {
            type: String
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
        mera: {
            type: String
        },
        br_takmicara: {
            type: Number
        },
        br_pokusaja: {
            type: Number
        },
        vreme: {
            type: String
        },
        rezultati: {
            type: Array
        },
        zavrseno: {
            type: Number
        }
    }
)

export default mongoose.model('RasporedIndividualni', RasporedIndividualni, 'rasporedIndividualni');