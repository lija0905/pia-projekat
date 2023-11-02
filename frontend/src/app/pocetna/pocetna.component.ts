import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/models/disciplina';
import { Medalje } from 'src/models/medalje';
import { Sport } from 'src/models/sport';
import { Sportista } from 'src/models/sportista';
import { MedaljeService } from '../medalje.service';
import { SportService } from '../sport.service';
import { SportistaService } from '../sportista.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private medaljeServis: MedaljeService,
    private sportServis: SportService, private sportistaServis: SportistaService) { }

  ngOnInit(): void {

    this.medaljeServis.dohvatiPodatke().subscribe((medalje: Medalje[]) => {
      this.sveMedalje = medalje;

      this.sveMedalje.sort(function(a,b) {
        return b.ukupno - a.ukupno;
      })

      for (let i= 0; i < this.sveMedalje.length; i++){
        this.sveMedalje[i].rang = i + 1;
      }


      this.stranaMedalja = 0;
      this.stranaZemalja = 0;
      let x = 0;

      if (this.sveMedalje.length%10==0) this.broj_strana = this.sveMedalje.length/10 ;
      else {
        this.broj_strana = Math.ceil(this.sveMedalje.length/10);
        x = this.broj_strana*10 - this.sveMedalje.length;
      }

      for (let i =0; i < this.broj_strana; i++) {
        this.medalje[i]=[];
        for (let p = 0; p < 10; p++) {
          this.medalje[i][p]=null;
        }
      }
    
      let j = 0;
      let k = 0;
      for(let i=0; i < this.sveMedalje.length; i++){
         this.medalje[j][k] = this.sveMedalje[i];
        k++;
        if (k==10) {
          j++;
          k = 0;
      }
    }

    this.trenutneMedalje = this.medalje[0];
    this.trenutneZemlje = this.medalje[0];

    this.sportServis.dohvatiSportove().subscribe((sportovi: Sport[])=> {
      this.sportovi = sportovi;

      let index=0;
      for (let i=0; i < this.sportovi.length; i++) {
        for (let j=0; j < this.sportovi[i].disciplina.length; j++) {
          this.discipline[index++]=this.sportovi[i].disciplina[j];
        }
      }

      this.sportistaServis.dohvatiSportiste().subscribe((sportisti: Sportista[])=>{
        this.sportisti = sportisti;

        this.paginacijaSportisti();
      })
    })
    })
  }

  medalje: Medalje[][] = [];

  sveMedalje: Medalje[] = [];

  stranaMedalja: number;
  stranaZemalja: number;
  broj_strana: number;
  rang: number = 1;

  trenutneMedalje: Medalje[]=[];
  trenutneZemlje: Medalje[]=[];

  //sportisti
  sportovi: Sport[];
  sportisti: Sportista[];
  discipline: Disciplina[]=[];
  stranaSportisti: number;
  broj_strana_sportista: number;

  trenutniSportisti: Sportista[] = [];
  brojPrikaz: number = 10;
  sviSportisti: Sportista[][] = [];



  desnoMedalje() {

    if (this.stranaMedalja + 1 < this.broj_strana){
    this.stranaMedalja++;
    this.trenutneMedalje = this.medalje[this.stranaMedalja];
    }

    }

  levoMedalje() {

   if (this.stranaMedalja - 1 >= 0) {
      this.stranaMedalja--;
      this.trenutneMedalje= this.medalje[this.stranaMedalja];
  
   }

  }

  desnoZemlje() {

    if (this.stranaZemalja + 1 < this.broj_strana) {
      this.stranaZemalja++;
      this.trenutneZemlje = this.medalje[this.stranaZemalja];
  
    }
   
    }

  levoZemlje() {

   if (this.stranaZemalja - 1 >= 0) {
    this.stranaZemalja--;
    this.trenutneZemlje= this.medalje[this.stranaZemalja];
 
 
   }
 
  }

  mojeDiscipline: Disciplina[];
  
  dohvatiMojeDiscipline() {
    this.sportServis.dohvatiSport(this.sport).subscribe((s: Sport)=> {
      this.mojeDiscipline = s.disciplina;
    })
  }
  
  //pretraga
  ime: String = '';
  sport: String ='';
  disciplina: String='';
  zemlja: String='';
  osvojio: boolean;
  pol: String='';

  pretrazi() {

    let medalja = 0;

    if (this.osvojio == true) medalja = 1;

    this.sportistaServis.pretraziSportiste(this.ime, this.zemlja, this.sport, this.disciplina, this.pol, medalja).subscribe((sportisti: Sportista[])=>{
      this.sportisti=sportisti;
      this.pol = '';

      if (this.sportisti.length > 0)this.paginacijaSportisti();
      else this.trenutniSportisti = this.sportisti;
    })

  }

  paginacijaSportisti() {

    this.stranaSportisti = 0;
    let x = 0;

      if (this.sportisti.length%this.brojPrikaz==0) this.broj_strana_sportista = this.sportisti.length/this.brojPrikaz ;
      else {
        this.broj_strana_sportista = Math.ceil(this.sportisti.length/this.brojPrikaz);
        x = this.broj_strana_sportista*this.brojPrikaz - this.sportisti.length;
      }

      for (let i =0; i < this.broj_strana_sportista; i++) {
        this.sviSportisti[i]=[];
        for (let p = 0; p < this.brojPrikaz; p++) {
          this.sviSportisti[i][p]=null;
        }
      }
    
      let j = 0;
      let k = 0;
      for(let i=0; i < this.sportisti.length; i++){
        this.sviSportisti[j][k] = this.sportisti[i];
        k++;
        if (k==this.brojPrikaz) {
          j++;
          k = 0;
      }
    }

    this.trenutniSportisti = this.sviSportisti[0];
    
  }

  desnoSportisti() {

    if (this.stranaSportisti + 1 < this.broj_strana_sportista) {
      this.stranaSportisti++;
      this.trenutniSportisti = this.sviSportisti[this.stranaSportisti];
  
    }
   
    }

  levoSportisti() {

   if (this.stranaSportisti - 1 >= 0) {
    this.stranaSportisti--;
    this.trenutniSportisti= this.sviSportisti[this.stranaSportisti];
 
   }

  }

  promeniBrojSportista() {
    this.paginacijaSportisti();
  }
}