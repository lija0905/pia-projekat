import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RasporedIndividualni } from 'src/models/rasporedIndividualni';
import { Rezultat } from 'src/models/rezultat';
import { Takmicenje } from 'src/models/takmicenje';
import { RasporedIndividualniService } from '../raspored-individualni.service';
import { TakmicenjaService } from '../takmicenja.service';
import {myBest} from 'src/models/format';
import { MedaljeService } from '../medalje.service';
import { SportistaService } from '../sportista.service';
import { RekordService } from '../rekord.service';
import { Rekord } from 'src/models/rekord';

@Component({
  selector: 'app-raspored',
  templateUrl: './raspored.component.html',
  styleUrls: ['./raspored.component.css']
})
export class RasporedComponent implements OnInit {

  constructor(private router: ActivatedRoute, private takmServis: TakmicenjaService, private rasporedIServis: RasporedIndividualniService,
  private medaljeServis: MedaljeService, private sportistaServis: SportistaService, private rekordServis: RekordService) { }

  ngOnInit(): void {

    this.vrsta = this.router.snapshot.paramMap.get('vrsta');
    this.sport = this.router.snapshot.paramMap.get('sport');
    this.pol = this.router.snapshot.paramMap.get('pol');

    if (this.vrsta == 'individualni') this.disciplina = this.router.snapshot.paramMap.get('disciplina');

    this.takmServis.dohvatiTakmicenje(this.sport, this.disciplina, this.pol).subscribe((takm: Takmicenje)=>{
      this.takmicenje = takm;

        
    for (let i=0; i < this.takmicenje.br_pokusaja; i++) {
      this.brojPokusaja[i]=i + 1;
    }

    this.rasporedIServis.dohvatiRaspored(this.takmicenje.sport, this.takmicenje.datum_kraja, this.disciplina, this.pol).subscribe((raspored: RasporedIndividualni)=>{
      if (raspored) {
        this.mojRaspored=raspored;

        for (let i=0; i < this.mojRaspored.rezultati.length-1; i++) {
          for (let j=i+1; j < this.mojRaspored.rezultati.length; j++) {
            if (this.mojRaspored.rezultati[i].krugovi.length!=this.mojRaspored.rezultati[j].krugovi.length) {
              this.trenutniKrug = this.mojRaspored.rezultati[i].krugovi.length > this.mojRaspored.rezultati[j].krugovi.length ? this.mojRaspored.rezultati[j].krugovi.length : this.mojRaspored.rezultati[i].krugovi.length;
              break;
            } else {
              this.trenutniKrug = this.mojRaspored.rezultati[j].krugovi.length;
            }
          }
        } 
        this.rezultati = this.mojRaspored.rezultati;
        this.zavrseno = this.mojRaspored.zavrseno;

         if (this.trenutniKrug==this.takmicenje.br_pokusaja) {
          this.krugBroj = 800;
          this.krajTakmicenja = true;
        }

     
    } else {
      for (let i=0; i < this.takmicenje.ucesnici.length; i++) {
        let noviRezulat: Rezultat = new Rezultat;

        noviRezulat.ime = this.takmicenje.ucesnici[i];
        noviRezulat.rezultat = [];
        noviRezulat.krugovi = [];
        this.rezultati.push(noviRezulat);
      }
    }
  
  }
    )
    })

  
      

  }

  sport: String;
  disciplina: String;
  pol: String;
  vrsta: String;

  poruka: String;

  takmicenje:  Takmicenje;
  brojPokusaja: Number[] = [];

  vreme: string;
  
  mojRaspored : RasporedIndividualni;


  //kreiranje Rasporeda
  kreirajRaspored() {

    if (this.vreme==null) this.poruka='Unesite vreme pocetka';
    else { 
      
      let regex = RegExp("[0-2][0-9]\:[0-6][0-9]");
      let test=regex.test(this.vreme);

    if (!test) this.poruka = 'Unesite vreme u naznacenom formatu';
    else {

      this.rasporedIServis.dohvatiRasporedSaIstimVremenom(this.takmicenje.lokacija, this.takmicenje.datum_kraja, this.vreme).subscribe((raspored: RasporedIndividualni[])=>{

        if (raspored.length > 0) this.poruka = 'Vec postoji zakazano takmicenje na toj lokaciji u to vreme!';
        else {

          this.rasporedIServis.kreirajRaspored(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.datum_kraja, this.takmicenje.vrsta, this.takmicenje.pol, this.takmicenje.lokacija, this.takmicenje.br_pokusaja, this.takmicenje.br_takmicara, this.takmicenje.mera, this.vreme, this.rezultati).subscribe();
          this.rasporedIServis.dohvatiRaspored(this.takmicenje.sport, this.takmicenje.datum_kraja, this.disciplina, this.pol).subscribe((raspored: RasporedIndividualni)=>{
            this.mojRaspored = raspored;

            for (let i=0; i < this.mojRaspored.rezultati.length-1; i++) {
              for (let j=i+1; j < this.mojRaspored.rezultati.length; j++) {
                if (this.mojRaspored.rezultati[i].krugovi.length!=this.mojRaspored.rezultati[j].krugovi.length) {
                  this.trenutniKrug = this.mojRaspored.rezultati[i].krugovi.length > this.mojRaspored.rezultati[j].krugovi.length ? this.mojRaspored.rezultati[j].krugovi.length : this.mojRaspored.rezultati[i].krugovi.length;
                  break;
                } else this.trenutniKrug = this.mojRaspored.rezultati[j].krugovi.length;
              }
            } 
            this.rezultati = this.mojRaspored.rezultati;
          })
        }

    })
  
  }
  }
}

krug: string;
trenutniKrug: number = 0;
rezultat: string;
rezultati: Rezultat[]=[];
krugBroj: number = 800;
krajTakmicenja: boolean = false;

parsuj() {
  this.krugBroj = parseInt(this.krug);
}

unesiRezultat(u: Rezultat) {

  let mojiRezultati;
  let mojiKrugovi;

  for (let i=0; i < this.rezultati.length; i++) {
    if (this.rezultati[i].ime==u.ime) {
      this.rezultati[i].rezultat[this.krugBroj-1]=this.rezultat;
      this.rezultati[i].krugovi[this.krugBroj-1]=this.krug;
      mojiRezultati = this.rezultati[i].rezultat;
      mojiKrugovi = this.rezultati[i].krugovi;
     }
  }

  this.rasporedIServis.dodajRezultat(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.pol, this.takmicenje.datum_kraja, mojiRezultati, mojiKrugovi, u.ime).subscribe(res=>{
    if (res['poruka']=='ok') {
              for (let i=0; i < this.rezultati.length-1; i++) {
          for (let j=i+1; j < this.rezultati.length; j++) {
            if (this.rezultati[i].krugovi.length!=this.rezultati[j].krugovi.length) {
              this.trenutniKrug = this.rezultati[i].krugovi.length > this.rezultati[j].krugovi.length ? this.rezultati[j].krugovi.length : this.rezultati[i].krugovi.length;
              break;
            } else this.trenutniKrug = this.mojRaspored.rezultati[j].krugovi.length;
          }
        } 
  
  if (this.trenutniKrug==this.takmicenje.br_pokusaja) {
    this.krugBroj = 800;
    this.krajTakmicenja = true;
  }
    }
  });

  

}

prvi : string;
drugi: string;
treci: string;


zavrseno: number;
zavrsiTakmicenje() {

  this.rasporedIServis.dohvatiRaspored(this.takmicenje.sport, this.takmicenje.datum_kraja, this.takmicenje.disciplina, this.takmicenje.pol).subscribe((raspored: RasporedIndividualni)=>{
    this.mojRaspored = raspored;


    switch (this.mojRaspored.mera) {
      case "CC:MM:SS,TT":
        //uvek je jedan pokusaj
      
        let najbolji : myBest[] = [];
        let regex = RegExp('[0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]\,[0-9][0-9]');
      
        for (let i=0; i<this.mojRaspored.rezultati.length; i++){
          let mojiNajbolji: myBest[] = [];
          for (let j=0; j < this.mojRaspored.rezultati[i].rezultat.length; j++) {
            if (regex.test(this.mojRaspored.rezultati[i].rezultat[j])) {
            let format = this.mojRaspored.rezultati[i].rezultat[j].split(':');
            format[3] = format[2].split(',')[1];
            format[2] = format[2].split(',')[0];
            let rez: myBest = new myBest;
            rez.ime = this.mojRaspored.rezultati[i].ime;
            rez.casovi=parseInt(format[0]);
            rez.minuti = parseInt(format[1]);
            rez.sekunde = parseInt(format[2]);
            rez.stotinke =parseInt(format[3]);
            rez.stotinke = ((rez.casovi*60 + rez.minuti)*60 + rez.sekunde)*100+rez.stotinke;
            mojiNajbolji.push(rez);
            }
          }
          mojiNajbolji.sort(function(a, b){
            return a.stotinke - b.stotinke;
          });
          najbolji.push(mojiNajbolji[0]);
        }
          najbolji.sort(function(a, b){
            return a.stotinke - b.stotinke;
          });

          this.prvi = najbolji[0].ime;
          this.drugi = najbolji[1].ime;
          this.treci = najbolji[2].ime;

          this.rekordServis.dohvatiRekord(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.pol).subscribe((rekord: Rekord)=> {
            let format = rekord.rekord.split(':');
            format[3] = format[2].split(',')[1];
            format[2] = format[2].split(',')[0];
            let stotinke = ((parseInt(format[0])*60 + parseInt(format[1]))*60 + parseInt(format[2]))*100+parseInt(format[3]);

            let noviRekord: string;
            if (najbolji[0].stotinke < stotinke) {
              for (let i=0; i < this.mojRaspored.rezultati.length; i++) {
                for (let j = 0; j < this.mojRaspored.rezultati[i].rezultat.length; j++){
                  if (this.mojRaspored.rezultati[i].ime == this.prvi) {
                    noviRekord = this.mojRaspored.rezultati[i].rezultat[j];
                  }
                }
              }
              this.rekordServis.postaviNoviRekord(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.pol, najbolji[0].ime.split('-')[0], najbolji[0].ime.split('-')[1], noviRekord).subscribe();
            }
          })

        
        break;
    
      case "MM,CM":

       
        let najbolji2 : myBest[] = [];
        let regex2 = RegExp('[0-9][0-9]\,[0-9][0-9]');
      
        for (let i=0; i<this.mojRaspored.rezultati.length; i++){
          let mojiNajbolji2: myBest[] = [];
          for (let j=0; j < this.mojRaspored.rezultati[i].rezultat.length; j++) {
            if (regex2.test(this.mojRaspored.rezultati[i].rezultat[j])) {
            let format2 = this.mojRaspored.rezultati[i].rezultat[j].split(',');
            let rez2: myBest = new myBest;
            rez2.ime = this.mojRaspored.rezultati[i].ime;
            rez2.metri=parseInt(format2[0]);
            rez2.centimetri = parseInt(format2[1]);
            rez2.centimetri = rez2.metri*100 + rez2.centimetri;
            mojiNajbolji2.push(rez2);
            }
          }
          mojiNajbolji2.sort(function(a, b){
            return b.centimetri - a.centimetri;
          });
          najbolji2.push(mojiNajbolji2[0]);
        }
          najbolji2.sort(function(a, b){
            return b.centimetri - a.centimetri;
          });

          this.prvi = najbolji2[0].ime;
          this.drugi = najbolji2[1].ime;
          this.treci = najbolji2[2].ime;

          this.rekordServis.dohvatiRekord(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.pol).subscribe((rekord: Rekord)=> {
            let format = rekord.rekord.split(',');
            let centimetri = parseInt(format[0])*100 + parseInt(format[1]);

            let noviRekord2: string;
            if (najbolji2[0].centimetri > centimetri) {
              for (let i=0; i < this.mojRaspored.rezultati.length; i++) {
                for (let j = 0; j < this.mojRaspored.rezultati[i].rezultat.length; j++){
                  if (this.mojRaspored.rezultati[i].ime == this.prvi) {
                    noviRekord2 = this.mojRaspored.rezultati[i].rezultat[j];
                  }
                }
              }
              this.rekordServis.postaviNoviRekord(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.pol, najbolji2[0].ime.split('-')[0], najbolji2[0].ime.split('-')[1], noviRekord2).subscribe();
            }
          })
        break;

      case "krugovi":

        let sviKurugovi : myBest[] =[];

        for (let i=0; i < this.mojRaspored.rezultati.length; i++) {
           let rez3: myBest = new myBest;
            rez3.ime = this.mojRaspored.rezultati[i].ime;
            rez3.krugovi = 0;
          for (let j=0; j < this.mojRaspored.rezultati[i].rezultat.length; j++) {
           rez3.krugovi += +this.mojRaspored.rezultati[i].rezultat[j];
          }
          sviKurugovi.push(rez3);
        }

        sviKurugovi.sort(function(a,b){
          return b.krugovi - a.krugovi;
        })

        this.prvi = sviKurugovi[0].ime;
        this.drugi = sviKurugovi[1].ime;
        this.treci = sviKurugovi[2].ime;

        this.rekordServis.dohvatiRekord(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.pol).subscribe((rekord: Rekord)=> {
    
          let noviRekord: string;
          if (sviKurugovi[0].krugovi > +rekord.rekord) {
            for (let i=0; i < this.mojRaspored.rezultati.length; i++) {
              for (let j = 0; j < this.mojRaspored.rezultati[i].rezultat.length; j++){
                if (this.mojRaspored.rezultati[i].ime == this.prvi) {
                  noviRekord = this.mojRaspored.rezultati[i].rezultat[j];
                }
              }
            }
            this.rekordServis.postaviNoviRekord(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.pol, sviKurugovi[0].ime.split('-')[0], sviKurugovi[0].ime.split('-')[1], noviRekord).subscribe();
          }
        })
      break;
    }

    this.medaljeServis.azurirajZlatne(this.prvi.split('-')[1]).subscribe(res=>{
      if (res['poruka']=='ok') {
        this.medaljeServis.azurirajSrebrne(this.drugi.split('-')[1]).subscribe(res=>{
          if (res['poruka']=='ok') {
            this.medaljeServis.azurirajBronzane(this.treci.split('-')[1]).subscribe(res=> {
              if (res['poruka']=='ok') {
                this.sportistaServis.dodajMedalju(1, this.prvi.split('-')[0], this.takmicenje.disciplina).subscribe(res=>{
                  if (res['poruka']=='ok') {
                    this.sportistaServis.dodajMedalju(2, this.drugi.split('-')[0], this.takmicenje.disciplina).subscribe(res=>{
                      if (res['poruka']=='ok') {
                        this.sportistaServis.dodajMedalju(3, this.treci.split('-')[0], this.takmicenje.disciplina).subscribe(res=>{
                          if (res['poruka']=='ok') {
                              this.rasporedIServis.zavrsiTakmicenje(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.pol).subscribe(res=>{
                                this.zavrseno=1;

                                this.takmServis.azurirajMesta(this.takmicenje.sport, this.takmicenje.disciplina, this.takmicenje.pol, this.prvi, this.drugi, this.treci).subscribe();
                              })
                          }
                        });
                      }
                    })
                  }
                })
              }
            });
          }
        });
      }
    });
    
    
  })

}

}
