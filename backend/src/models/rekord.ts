import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Rekord = new Schema (
    {
        godina: {
            type: String
        },
        mesto: {
            type: String
        },
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        rekorder: {
            type: String
        },
        rekord: {
            type: String
        },
        zemlja: {
            type: String
        },
        pol: {
            type: String
        }
    }
)

export default mongoose.model('Rekord', Rekord, 'rekordi');