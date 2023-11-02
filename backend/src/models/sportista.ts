import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sportista = new Schema (
    {
        ime: {
            type: String
        },
        sport: {
            type: String
        },
        discipline: {
            type: Array
        },
        pol: {
            type: String
        },
        zemlja: {
            type: String
        },
        osvojena_medalja: {
            type: Number
        }
    }
)

export default mongoose.model('Sportista', Sportista, 'sportisti');