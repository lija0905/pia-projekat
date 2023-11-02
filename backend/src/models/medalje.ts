import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

let Medalje = new Schema (
    {
        zemlja: {
            type: String
        },

        zastava: {
            type: String
        },

        br_ucesnika: {
            type: Number
        },

        br_zlatnih: {
            type: Number
        }, 

        br_srebrnih: {
            type: Number
        },

        br_bronzanih: {
            type: Number
        },

        ukupno: {
            type: Number
        }
    }
)

export default mongoose.model('Medalje', Medalje, 'medalje');