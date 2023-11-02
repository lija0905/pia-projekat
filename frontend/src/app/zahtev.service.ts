import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

   
  uri = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  dodajZahtev(ime, prezime, korime, lozinka, email, drzava, tip) {

    const podaci = {
      ime: ime,
      prezime: prezime,
      korime: korime,
      lozinka: lozinka,
      email: email,
      drzava: drzava,
      tip: tip
    }
  
     return this.http.post(`${this.uri}/zahtevi/dodajZahtev`, podaci);
  }

  dohvatiZahteve() {

    return this.http.get(`${this.uri}/zahtevi/dohvatiZahteve`);
  }

  obrisiZahtev(korime, lozinka, drzava, tip) {

    const podaci = {
      korime: korime,
      lozinka: lozinka,
      drzava: drzava,
      tip: tip
    }

    return this.http.post(`${this.uri}/zahtevi/obrisiZahtev`, podaci);
    
  }
}
