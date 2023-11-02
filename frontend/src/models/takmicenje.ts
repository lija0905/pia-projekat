import { Korisnik } from "./korisnik";
import { Rezultat } from "./rezultat";

export class Takmicenje {
    sport: string;
    disciplina: string;
    datum_pocetka: string;
    datum_kraja: string;
    ucesnici: string[];
    vrsta: string;
    pol: string;
    lokacija: string;
    delegati: Korisnik[];
    mera: string;
    br_takmicara: number;
    br_pokusaja: number;
    prvi: string;
    drugi: string;
    treci: string;
}