import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RekordService {

  
  uri = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  dohvatiRekorde() {
  
     return this.http.get(`${this.uri}/rekordi/dohvatiRekorde`);
  }

  dohvatiRekord(sport, disciplina, pol) {

    const podaci = {
      sport: sport, 
      disciplina: disciplina, 
      pol: pol
    }

    return this.http.post(`${this.uri}/rekordi/dohvatiRekord`, podaci);

    
  }

  postaviNoviRekord(sport, disciplina, pol, ime, zemlja, rekord) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      ime: ime,
      zemlja: zemlja,
      rekord: rekord
    }

    return this.http.post(`${this.uri}/rekordi/postaviNoviRekord`, podaci);
  }
}
