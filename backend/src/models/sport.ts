import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sport = new Schema (
    {
        sport: {
            type: String
        },
        disciplina: {
            type: Array
        },
        vrsta: {
            type: String
        },
        broj_igraca: {
            type: String
        }
    }
)

export default mongoose.model('Sport', Sport, 'sport');