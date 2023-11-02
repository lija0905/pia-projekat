import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RasporedEkipniService {

  uri = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  dodajRaspored(sport, disciplina, pol, lokacija, timA, timB, runda) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      lokacija: lokacija,
      timA: timA,
      timB: timB,
      runda: runda
    }

    return this.http.post(`${this.uri}/rasporedE/kreirajRaspored`, podaci);
  }

  dohvatiRaspored(sport, disciplina, pol) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }

    return this.http.post(`${this.uri}/rasporedE/dohvatiRaspored`, podaci);
  }

  unesiDatum(sport, disciplina, pol, datum, timA, timB, runda) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      timA: timA,
      timB: timB,
      runda: runda,
      datum: datum
    }

    return this.http.post(`${this.uri}/rasporedE/unesiDatum`, podaci);
  }

  unesiVreme(sport, disciplina, pol, vreme, timA, timB, runda) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      timA: timA,
      timB: timB,
      runda: runda,
      vreme: vreme
    }

    return this.http.post(`${this.uri}/rasporedE/unesiVreme`, podaci);
  }

  unesiRezultat(sport, disciplina, pol, rezultat,pobednik, timA, timB, runda) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      timA: timA,
      timB: timB,
      runda: runda,
      rezultat: rezultat,
      pobednik: pobednik
    }

    return this.http.post(`${this.uri}/rasporedE/unesiRezultat`, podaci);
  }

  dohvatiTakmicenjeSaIstimVremenom(lokacija, vreme, datum) {

    const podaci = {
      vreme: vreme,
      lokacija: lokacija,
      datum: datum
    }

    return this.http.post(`${this.uri}/rasporedE/dohvatiTakmicenjeSaIstimVremenom`, podaci);
  }

  dohvatiGrupu(sport, disciplina, pol, runda) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      runda: runda
    
    }

    return this.http.post(`${this.uri}/rasporedE/dohvatiGrupu`, podaci);
  }

  dohvatiCetvrtfinale(sport, disciplina, pol) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
    }

    return this.http.post(`${this.uri}/rasporedE/dohvatiCetvrtfinale`, podaci);
  }

  dohvatiPolufinale(sport, disciplina, pol) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
    }

    return this.http.post(`${this.uri}/rasporedE/dohvatiPolufinale`, podaci);
  }

  dohvatiFinale(sport, disciplina, pol, runda) {

    const podaci = {
      sport: sport,
      disciplina: disciplina, 
      pol: pol,
      runda: runda
    }

    return this.http.post(`${this.uri}/rasporedE/dohvatiFinale`, podaci);
  }
}
