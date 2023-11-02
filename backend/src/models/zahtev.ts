import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zahtev = new Schema (
    {
        korime: {
            type: String
        },
        lozinka: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        drzava: {
            type: String
        },
        email: {
            type: String
        },
        tip: {
            type: String
        }
    }
)

export default mongoose.model('Zahtev', Zahtev, 'zahteviRegistracije');