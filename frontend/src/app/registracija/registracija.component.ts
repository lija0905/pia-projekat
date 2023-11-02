import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';
import { Medalje } from 'src/models/medalje';
import { MedaljeService } from '../medalje.service';
import { ZahtevService } from '../zahtev.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})

export class RegistracijaComponent implements OnInit {

  constructor(private medaljeServis: MedaljeService, private zahtevServis: ZahtevService,
    private ruter: Router) { }

  ngOnInit(): void {

    this.medaljeServis.dohvatiPodatke().subscribe((zemlje: Medalje[])=>{
      this.zemlje = zemlje;
    })
  }

  zemlje: Medalje[];

  //registracija
  ime: string;
  prezime: string;
  korime: string;
  lozinka: string;
  potvrda: string;
  zemlja: string;
  tip: string;
  email: string;
  poruka: string;

  registrujSe() {

    if (this.ime == null || this.prezime==null || this.korime==null || this.lozinka==null || this.potvrda==null || this.zemlja=='', this.zemlja==null
    || this.tip==null || this.email==null || this.tip == '') this.poruka = 'Morate popuniti sva polja';
    else {
 
      let regex= RegExp("(?!.*(.)\\1\\1)(?=(.*[A-Z]){1,})(?=(.*[a-z]){3,})(?=(.*[0-9]){2,})(?=(.*[!@$%*?&]){2,})^[A-Za-z].{8,12}$");
      let testiranje = regex.test(this.lozinka);
      if (testiranje==false) this.poruka = 'Lozinka mora imati najmanje 8 i najvise 12 karaktera, mora da pocinje velikim slovom, da sadrzi minimalno jedno veliko, minimalno tri mala slova, minimalno 2 specijalna karaktera(!, @,$,%,*,?,&), minimalno dva broja, i isti karakter se ne sme ponoviti vise od tri puta';
      else {

      if (this.lozinka != this.potvrda) this.poruka = 'Pokusajte ponovo da potvrdite lozinku';
      else {

     /* let zahtev: Korisnik = new Korisnik;
      zahtev.ime = this.ime;//[A-Za-z]
      zahtev.prezime = this.prezime;
      zahtev.korime = this.korime;
      zahtev.lozinka = this.lozinka;
      zahtev.drzava = this.zemlja;
      zahtev.email = this.email;
      zahtev.tip = this.tip;

      let zahtevi: Korisnik[] = [];*/

      this.zahtevServis.dodajZahtev(this.ime, this.prezime, this.korime, this.lozinka, this.email, this.zemlja, this.tip).subscribe(res=>{
        if (res['poruka']=='ok')  alert('Uspesno poslat zahtev!');
      });

      }
    }

    }


  }

}
