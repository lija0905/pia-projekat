import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
  }

  korime: string;
  lozinka: string;

  poruka: string;
  korisnik: Korisnik;

  prijaviSe() {

    if (this.korime == null || this.lozinka == null) this.poruka = 'Niste uneli sve podatke';
    else {
      
      this.korServis.dohvatiKorisnika(this.korime, this.lozinka).subscribe((korisnik: Korisnik)=> {
        this.lozinka = null;
        if (korisnik) {
          localStorage.setItem('ulogovan', JSON.stringify(korisnik));
          if (korisnik.tip == "organizator") this.router.navigate(['organizator']);
          else if (korisnik.tip == "vodja delegacije") this.router.navigate(['vodja']);
          else if (korisnik.tip == "delegat") this.router.navigate(['delegat']);
        } else {
          this.poruka = "Pogresno korisnicko ime ili lozinka";
        } 

      } )
    }

  }

}
