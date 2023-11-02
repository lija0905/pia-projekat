import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { ZahtevService } from '../zahtev.service';

@Component({
  selector: 'app-zahtevi',
  templateUrl: './zahtevi.component.html',
  styleUrls: ['./zahtevi.component.css']
})
export class ZahteviComponent implements OnInit {

  constructor(private ZahteviServis: ZahtevService, private korServis: KorisnikService) { }

  ngOnInit(): void {

    this.ZahteviServis.dohvatiZahteve().subscribe((zahtevi: Korisnik[])=>{
      this.zahtevi = zahtevi;
    })

  }

  zahtevi: Korisnik[];
  poruka: String;

  odobri(z: Korisnik) {

     let ime  = z.ime;
     let prezime = z.prezime;
     let korime = z.korime;
     let lozinka = z.lozinka;
     let email = z.email;
     let drzava = z.drzava;
     let tip = z.tip;

    if (tip == "vodja delegacije") {

      this.korServis.dohvatiVodjuDelegacije(drzava, tip).subscribe((kor: Korisnik)=> {
        if (kor!=null) this.poruka = 'Vodja delegacije za ' + drzava + ' vec postoji';
        else {
          this.korServis.dodajVodju(ime, prezime, korime, lozinka, email, drzava, tip).subscribe(res=>{
            if (res["poruka"]=="ok") {
              this.ZahteviServis.obrisiZahtev(korime, lozinka, drzava, tip).subscribe(res=>{
                if (res['poruka']=='obrisano') {
                  this.ZahteviServis.dohvatiZahteve().subscribe((zah:Korisnik[])=>{
                      this.zahtevi = zah;
                  })
                }
              })
            }
          })
        }
      })
    } else {

      this.korServis.dodajDelegata(ime, prezime, korime, lozinka, email, drzava, tip).subscribe(res=> {
        if (res['poruka']=='ok') {
          this.ZahteviServis.obrisiZahtev(korime, lozinka, drzava, tip).subscribe(res=>{
            if (res['poruka']=='obrisano') {
              this.ZahteviServis.dohvatiZahteve().subscribe((zah:Korisnik[])=>{
                  this.zahtevi = zah;

              })
            }
          })
        }
      })
    }


  }

  odbij(z: Korisnik) {
    
    let ime  = z.ime;
    let prezime = z.prezime;
    let korime = z.korime;
    let lozinka = z.lozinka;
    let email = z.email;
    let drzava = z.drzava;
    let tip = z.tip;

    this.ZahteviServis.obrisiZahtev(korime, lozinka, drzava, tip).subscribe(res=>{
      if (res['poruka']=='obrisano') {
        this.ZahteviServis.dohvatiZahteve().subscribe((zah:Korisnik[])=>{
            this.zahtevi = zah;
        })
      }
    })

  }

}
