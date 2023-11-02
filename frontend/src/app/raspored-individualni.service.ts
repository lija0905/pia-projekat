import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RasporedIndividualniService {

  uri = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  kreirajRaspored(sport, disciplina, datum, vrsta, pol, lokacija, br_pokusaja, br_takmicara, mera, vreme, rezultati) {
    const podaci = {
      sport : sport,
      disciplina: disciplina,
       datum: datum,
       vrsta: vrsta,
       pol: pol,
       lokacija: lokacija,
       br_pokusaja: br_pokusaja,
       br_takmicara: br_takmicara,
       mera: mera,
       vreme: vreme,
       rezultati: rezultati
    }

    return this.http.post(`${this.uri}/rasporedI/kreirajRaspored`, podaci);
  }

  dohvatiRasporedSaIstimVremenom(lokacija, datum_kraja, vreme) {
    const podaci = {
      lokacija: lokacija,
      datum_kraja: datum_kraja,
      vreme: vreme
    }

    return this.http.post(`${this.uri}/rasporedI/dohvatiRasporedSaIstimVremenom`, podaci);
  }

  dohvatiRaspored(sport, datum, disciplina, pol) {
    const podaci = {
      sport: sport,
      datum: datum,
      disciplina: disciplina, 
      pol: pol
    }
    
  return this.http.post(`${this.uri}/rasporedI/dohvatiRaspored`, podaci);
  }

  dodajRezultat(sport, disciplina, pol, datum, rezultat, krug, ime) {
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      datum: datum,
      rezultat: rezultat,
      krug: krug,
      ime: ime
    }

    return this.http.post(`${this.uri}/rasporedI/dodajRezultat`, podaci);
  }

  zavrsiTakmicenje(sport, disciplina, pol) {
    const podaci = {
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }

    return this.http.post(`${this.uri}/rasporedI/zavrsiTakmicenje`, podaci);
  }
}
