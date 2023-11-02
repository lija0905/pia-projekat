import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-promenalozinke',
  templateUrl: './promenalozinke.component.html',
  styleUrls: ['./promenalozinke.component.css']
})
export class PromenalozinkeComponent implements OnInit {

  constructor(private korServis: KorisnikService,
    private ruter: Router) { }

  ngOnInit(): void {
  }

  korime: string;
  lozinka: string;
  nova: string;
  potvrda: string;
  poruka: string;

  promeniLozinku() {

    if (this.korime==null || this.lozinka==null || this.nova==null || this.potvrda==null) this.poruka="Popunite sva polja!";
    else {
      let regex= RegExp("(?!.*(.)\\1\\1)(?=(.*[A-Z]){1,})(?=(.*[a-z]){3,})(?=(.*[0-9]){2,})(?=(.*[!@$%*?&]){2,})^[A-Za-z].{8,12}$");
      let testiranje = regex.test(this.nova);

      if (testiranje==false) this.poruka = 'Lozinka mora biti u odgovarajucem formatu';
      else if (this.nova==this.lozinka) this.poruka = 'Nova lozinka ne sme biti ista kao stara';
      else {

      this.korServis.dohvatiKorisnika(this.korime, this.lozinka).subscribe((kor: Korisnik)=> {

      if (kor) {
        if (this.nova!=this.potvrda) {
          this.nova = null;
          this.potvrda = null;
          this.poruka='Nova lozinka i njena potvrda se ne poklapaju';
        } else {
          this.korServis.promeniLozinku(this.korime, this.nova).subscribe(res=> {
             
              this.ruter.navigate(['prijava']);
          });
        }
      } else this.poruka='Pogresno korisnicko ime ili lozinka';
 
    })
  }
}

  }

}
