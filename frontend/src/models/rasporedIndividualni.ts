import { Rezultat } from "./rezultat";

export class RasporedIndividualni {
    sport: string;
    disciplina: string;
    datum: string;
    vrsta: string;
    pol: string;
    lokacija: string;
    mera: string;
    br_takmicara: number;
    br_pokusaja: number;
    rezultati: Rezultat[];
    vreme: string;
    zavrseno: number;
}