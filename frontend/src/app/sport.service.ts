import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  uri = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  dohvatiSportove() {
  
     return this.http.get(`${this.uri}/sportovi/dohvatiSportove`);
  }

  dohvatiSport(sport) {

    const podaci={
      sport: sport
    }

    return this.http.post(`${this.uri}/sportovi/dohvatiSport`, podaci);
  }

  unesiSport(sport, disciplina, vrsta, broj_igraca) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      vrsta: vrsta,
      broj_igraca: broj_igraca
    }

    return this.http.post(`${this.uri}/sportovi/unesiSport`, podaci);
  }
}
