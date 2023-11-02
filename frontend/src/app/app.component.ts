import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/models/korisnik';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  ulogovan: Korisnik;
  tip: string;
  klik : boolean;

  constructor(private router: Router){

    this.klik = false;
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    if (this.ulogovan!=null) this.tip = this.ulogovan.tip;
    else this.tip=null;
  }

  dropdown() {
    if (this.klik==false) this.klik=true;
    else this.klik=false;

    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    if (this.ulogovan!=null) this.tip = this.ulogovan.tip;
    else this.tip=null;
  }

  odjava() {
    this.klik=false;
    this.tip = null;
    //localStorage.clear();
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

  prijava() {
    this.klik=false;
    /*this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    this.tip = this.ulogovan.tip;*/
    this.router.navigate(['prijava']);
  }

  registracija() {
    this.klik=false;
    this.router.navigate(['registracija']);
  }

  takmicenja() {
    this.klik=false;
    this.router.navigate(['takmicenja']);
  }

  promenaLozinke() {
    this.klik=false;
    this.router.navigate(['promenaLozinke'])
  }

  organizator() {
    this.klik=false;
    this.router.navigate(['organizator']);
  }

  rekordi() {
    this.klik=false;
    this.router.navigate(['rekordi'])
  }

  zahteviRegistracija() {
    this.klik=false;
    this.router.navigate(['zahtevi'])
  }
}
