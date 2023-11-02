import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedaljeService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  dohvatiPodatke() {

    return this.http.get(`${this.uri}/medalje/dohvatiPodatke`);
  }

  azurirajZlatne(zemlja) {

    const podaci = {
      zemlja: zemlja
    }

    return this.http.post(`${this.uri}/medalje/azurirajZlatne`, podaci);
  }

   azurirajSrebrne(zemlja) {

    const podaci = {
      zemlja: zemlja
    }

    return this.http.post(`${this.uri}/medalje/azurirajSrebrne`, podaci);
  }

   azurirajBronzane(zemlja) {

    const podaci = {
      zemlja: zemlja
    }

    return this.http.post(`${this.uri}/medalje/azurirajBronzane`, podaci);
  }
}
