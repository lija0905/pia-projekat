import { Disciplina } from "./disciplina";

export class Sportista {
    ime: string;
    sport: string;
    discipline: Array<Disciplina>;
    zemlja: string;
    pol: string;
    osvojena_medalja: number;
}