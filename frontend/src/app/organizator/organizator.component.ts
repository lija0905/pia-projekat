import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from 'src/models/disciplina';
import { Korisnik } from 'src/models/korisnik';
import { Sport } from 'src/models/sport';
import { AppComponent } from '../app.component';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private sportServis: SportService, private ruter: Router) { }

  ngOnInit(): void {


    this.zahtevi = JSON.parse(localStorage.getItem('zahtevi'));

    this.sportServis.dohvatiSportove().subscribe((sportovi: Sport[])=>{
      this.sportovi = sportovi;
    })
  }

  zahtevi: Korisnik[];
  sportovi: Sport[];

  //dodavanje sporta-discipline
  sport: string;
  igraci: string;
  disciplina: string="";
  vrsta: string;

  dodaj(){ 

    if (this.vrsta == "individualni") this.igraci = null;
    

    this.sportServis.unesiSport(this.sport, this.disciplina, this.vrsta, this.igraci).subscribe(res=>{
      if (res['poruka']=='ok') {
        this.sportServis.dohvatiSportove().subscribe((sportovi: Sport[])=>{
          this.sportovi = sportovi;
        })
        
      }
    });

    
  }

}
