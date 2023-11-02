import mongoose, { pluralize } from 'mongoose';

const Schema = mongoose.Schema;

let RasporedEkipni = new Schema(
    {
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        pol: {
            type: String
        },
        runda: {
            type: String
        },
        lokacija: {
            type: String
        },
        vreme: {
            type: String   
        },
        datum: {
            type: String
        },
        timA: {
            type: String
        },
        timB: {
            type: String
        },
        rezultat: {
            type: String
        },
        pobednik: {
            type: Number
        }

    }
)

export default mongoose.model('RasporedEkipni', RasporedEkipni, 'rasporedEkipni');