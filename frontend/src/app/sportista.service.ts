import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportistaService {

  uri = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  dohvatiSportiste() {
  
     return this.http.get(`${this.uri}/sportisti/dohvatiSportiste`);
  }

  pretraziSportiste(ime, zemlja, sport, disciplina, pol, medalja) {
    const podaci = {
      ime: ime,
      zemlja: zemlja,
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      medalja: medalja
    }

    return this.http.post(`${this.uri}/sportisti/pretraziSportiste`, podaci);
  }

  dodajSportistu(ime, sport, zemlja, pol, disciplina) {
    const podaci = {
      ime: ime,
      sport: sport, 
      zemlja: zemlja,
      pol: pol,
      disciplina: disciplina
    }

    return this.http.post(`${this.uri}/sportisti/dodajSportistu`, podaci);
  }

  dohvatiMojeSportiste(zemlja, sport, disciplina ) {
    const podaci = {
      zemlja: zemlja,
      sport: sport,
      disciplina: disciplina
    }

    return this.http.post(`${this.uri}/sportisti/dohvatiMojeSportiste`, podaci);
  }
  
  
  dohvatiSveMojeSportiste(zemlja) {
    const podaci = {
      zemlja: zemlja
    }

    return this.http.post(`${this.uri}/sportisti/dohvatiSveMojeSportiste`, podaci);
  }

  dohvatiPrijavljeneSportiste(sport, disciplina, pol){
    const podaci = {
      pol: pol,
      sport: sport,
      disciplina: disciplina
    }

    return this.http.post(`${this.uri}/sportisti/dohvatiPrijavljeneSportiste`, podaci);

  }

  dodajMedalju(medalja, ime, disciplina) {
    const podaci = {
      medalja: medalja,
      ime: ime,
      disciplina: disciplina
    }

    return this.http.post(`${this.uri}/sportisti/dodajMedalju`, podaci);
  }

  dohvatiSportistu(ime, sport, zemlja) {

    const podaci = {
      ime: ime,
      sport: sport,
      zemlja: zemlja
    }

    return this.http.post(`${this.uri}/sportisti/dohvatiSportistu`, podaci);
  }

  dodajDisciplinu(ime, sport, zemlja, pol, disciplina) {
    const podaci = {
      ime: ime,
      sport: sport,
      zemlja:zemlja,
      pol: pol,
      disciplina: disciplina
    }

    return this.http.post(`${this.uri}/sportisti/dodajDisciplinu`, podaci);
  }

}
