import { Takmicenje } from "./takmicenje";

export class Korisnik {
    ime: string;
    prezime: string;
    korime: string;
    lozinka: string;
    email: string;
    drzava: string;
    tip: string;
    takmicenja: Takmicenje[];
    prikazi: boolean;
}