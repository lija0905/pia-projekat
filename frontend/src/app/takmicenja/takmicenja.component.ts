import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/models/disciplina';
import { Korisnik } from 'src/models/korisnik';
import { Sport } from 'src/models/sport';
import { Sportista } from 'src/models/sportista';
import { Takmicenje } from 'src/models/takmicenje';
import { KorisnikService } from '../korisnik.service';
import { SportService } from '../sport.service';
import { SportistaService } from '../sportista.service';
import { TakmicenjaService } from '../takmicenja.service';

@Component({
  selector: 'app-takmicenja',
  templateUrl: './takmicenja.component.html',
  styleUrls: ['./takmicenja.component.css']
})
export class TakmicenjaComponent implements OnInit {

  constructor(private takmServis: TakmicenjaService,
    private korServis: KorisnikService, private sportServis: SportService, private sportistaServis: SportistaService) { }

  ngOnInit(): void {
    
    this.takmServis.dohvatiTakmicenja().subscribe((takm: Takmicenje[])=>{
      this.takmicenja = takm;

        this.sportServis.dohvatiSportove().subscribe((sportovi: Sport[])=>{
          this.sviSportovi = sportovi;
        })
    })

    this.korServis.dohvatiDelegate().subscribe((delegati: Korisnik[])=>{
        this.delegati = delegati;

        for(let i = 0; i < this.delegati.length; i++) {
          if (this.delegati[i].takmicenja.length < 3) this.delegati[i].prikazi = true;
          else this.delegati[i].prikazi =false;
        }

    })

  }

  sviSportovi: Sport[];
  takmicenja: Takmicenje[];
  mojeDiscipline: Disciplina[];
  prijavljeniSportisti:  Sportista[];
  delegati: Korisnik[];

  prijavljeneEkipe: String[]=[];

  uzmiDiscipline() {

    this.sportServis.dohvatiSport(this.sport).subscribe((s: Sport)=> {
      this.mojeDiscipline = s.disciplina;
    })

  }

  uzmiSportiste() {

    let pol;

    if (this.pol == 'muski') pol='m';
    else pol='z';

    this.sportistaServis.dohvatiPrijavljeneSportiste(this.sport, this.disciplina, pol).subscribe((sportisti: Sportista[])=>{
      this.prijavljeniSportisti = sportisti; 

      //napravi ako ima disciplinu i ekipni je da se isto prikaze samo ime zemlje

      if (this.vrsta=="ekipni") {

          if (this.prijavljeneEkipe.length==0) this.prijavljeneEkipe.push(this.prijavljeniSportisti[0].zemlja);
          let j=0;

          for (let i=0; i< this.prijavljeniSportisti.length; i++) {
            if (this.prijavljeneEkipe[j]!=this.prijavljeniSportisti[i].zemlja) {
              j++;
              this.prijavljeneEkipe[j] = this.prijavljeniSportisti[i].zemlja;
            }
          }
      }
    })

  }

  //dodavanje
  sport: string;
  disciplina: string;
  datum_pocetka: string;
  vrsta: string;
  datum_kraja: string;
  pol: string;
  lokacija: string;
  br_pokusaja: string;
  mera: string;
  takmicari: String[];
  br_takmicara: string;
  mojiDelegati: String[];

  poruka: string;



  dodaj() {

    if (this.sport==null || this.datum_pocetka==null, this.datum_kraja==null, this.vrsta==null, this.pol==null, this.lokacija==null) this.poruka = 'Sva polja su obavezna osim discipline';
    else {

        for (let i=0; i < this.mojiDelegati.length; i++ ) {
          let format = this.mojiDelegati[i].split('-');
          this.korServis.dodajTakmicenje(this.sport, this.disciplina, format[0], format[2], this.pol).subscribe();
        }

        if (this.disciplina == null) this.disciplina = '';
        let brojPokusaja = parseInt(this.br_pokusaja);
        let brojTakmicara = parseInt(this.br_takmicara);
        this.takmServis.dodajTakmicenje(this.sport, this.disciplina, this.datum_pocetka, this.datum_kraja, this.vrsta, this.pol, this.lokacija, brojPokusaja, brojTakmicara, this.mera, this.takmicari, this.mojiDelegati).subscribe(res=>{
          if (res['poruka']=='ok') alert('dodato takmicenje');

          this.takmServis.dohvatiTakmicenja().subscribe((takm: Takmicenje[])=>{
            this.takmicenja = takm;

            this.korServis.dohvatiDelegate().subscribe((delegati: Korisnik[])=>{
              this.delegati = delegati;
      
              for(let i = 0; i < this.delegati.length; i++) {
                if (this.delegati[i].takmicenja.length < 3) this.delegati[i].prikazi = true;
                else this.delegati[i].prikazi =false;
              }
      
          })
            
            this.sport = null;
            this.disciplina = null;
            this.datum_pocetka = null;
            this.datum_kraja = null;
            this.pol = null;
            this.lokacija = null;
            this.br_pokusaja = null;
            this.mera = null;
            this.takmicari = null;
            this.br_takmicara = null;
            this.mojiDelegati = null;

            
          });
        
        });

        
       /* this.takmServis.dodajUcesnika(this.sport, this.disciplina, this.takmicari, this.pol).subscribe(res=>{
          if (res['poruka']=='ok') alert('dodato takmicenje');

        
    });*/
          
    }
    
   
  }

}
