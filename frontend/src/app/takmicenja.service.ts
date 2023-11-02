import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakmicenjaService {

  uri = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  dohvatiTakmicenja() {
  
     return this.http.get(`${this.uri}/takmicenja/dohvatiTakmicenja`);
  }

  dodajTakmicenje(sport, disciplina, datum_pocetka, datum_kraja, vrsta, pol, lokacija, br_pokusaja, br_takmicara, mera, ucesnici, delegati) {
    const podaci = {
      sport : sport,
      disciplina: disciplina,
       datum_pocetka: datum_pocetka,
       datum_kraja: datum_kraja,
       vrsta: vrsta,
       pol: pol,
       lokacija: lokacija,
       br_pokusaja: br_pokusaja,
       br_takmicara: br_takmicara,
       mera: mera,
       ucesnici: ucesnici,
       delegati: delegati
    }

    return this.http.post(`${this.uri}/takmicenja/dodajTakmicenje`, podaci);
  }

  dohvatiTakmicenje(sport, disciplina,pol) {
    const podaci = {
      sport : sport,
      disciplina: disciplina,
      pol: pol
    }

    return this.http.post(`${this.uri}/takmicenja/dohvatiTakmicenje`, podaci);
  }

  dodajDelegata(sport, disciplina, ime, drzava, korime, pol) {
    const podaci = {
      sport : sport,
      disciplina: disciplina,
      ime: ime,
      drzava: drzava,
      korime: korime,
      pol: pol
    }

    return this.http.post(`${this.uri}/takmicenja/dodajDelegata`, podaci);
  }

  dodajUcesnika(sport, disciplina, ucesnici, pol) {
    const podaci = {
      sport : sport,
      disciplina: disciplina,
      ucesnici: ucesnici,
      pol: pol
    }

     return this.http.post(`${this.uri}/takmicenja/dodajUcesnike`, podaci);
  }

  dohvatiTakmicenjaDelegata(korime) {
    const podaci = {
      korime: korime
    }

    return this.http.post(`${this.uri}/takmicenja/dohvatiTakmicenjaDelegata`, podaci);
  }

  azurirajMesta(sport, disciplina, pol, prvi, drugi, treci) {
    const podaci = {
      sport : sport,
      disciplina: disciplina,
      pol: pol,
      prvi: prvi,
      drugi: drugi,
      treci: treci
    }

     return this.http.post(`${this.uri}/takmicenja/azurirajMesta`, podaci);
  }

}
