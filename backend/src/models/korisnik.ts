import mongoose, { pluralize } from 'mongoose';

const Schema = mongoose.Schema;

let Korisnik = new Schema(
    {
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        korime: {
            type: String
        },
        lozinka: {
            type: String
        },
        email: {
            type: String
        },
        drzava: {
            type: String   
        },
        tip: {
            type: String
        },
        takmicenja: {
            type: Array
        }
    }
)

export default mongoose.model('Korisnik', Korisnik, 'korisnici');