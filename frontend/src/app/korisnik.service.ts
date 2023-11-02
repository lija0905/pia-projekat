import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  uri = 'http://localhost:4000';
  
  constructor(private http: HttpClient) { }

  dohvatiKorisnika(korime, lozinka) {
    const podaci = {
      korime: korime,
      lozinka: lozinka
    }

     return this.http.post(`${this.uri}/korisnici/dohvatiKorisnika`, podaci);
  }

  promeniLozinku(korime, lozinka) {
    const podaci = {
      korime: korime,
      lozinka: lozinka
    }

     return this.http.post(`${this.uri}/korisnici/promeniLozinku`, podaci);
  }

  dodajVodju(ime, prezime, korime, lozinka, email, drzava, tip) {

    const podaci = {
      ime: ime,
      prezime: prezime,
      korime: korime,
      lozinka: lozinka,
      email: email, 
      drzava: drzava,
      tip: tip
    }

    return this.http.post(`${this.uri}/korisnici/dodajVodju`, podaci);

  }

  dodajDelegata(ime, prezime, korime, lozinka, email, drzava, tip) {

    const podaci = {
      ime: ime,
      prezime: prezime,
      korime: korime,
      lozinka: lozinka,
      email: email, 
      drzava: drzava,
      tip: tip
    }

    return this.http.post(`${this.uri}/korisnici/dodajDelegata`, podaci);

  }



  dohvatiVodjuDelegacije(drzava, tip) {
   
    const podaci = {
      drzava: drzava,
      tip: tip
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiVodjuDelegacije`, podaci);

  }

  dodajTakmicenje(sport, disciplina, korime, drzava, pol) {

    const podaci = {
      sport: sport,
      disciplina: disciplina,
      korime: korime,
      drzava: drzava,
      pol: pol
    }

    
    return this.http.post(`${this.uri}/korisnici/dodajTakmicenje`, podaci);

  }

  dohvatiDelegate() {

    return this.http.get(`${this.uri}/korisnici/dohvatiDelegate`);
    
  }
}
