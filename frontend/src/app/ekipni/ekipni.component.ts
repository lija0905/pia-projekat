import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poeni } from 'src/models/poeni';
import { rasporedEkipni } from 'src/models/rasporedEkipni';
import { RasporedIndividualni } from 'src/models/rasporedIndividualni';
import { Sportista } from 'src/models/sportista';
import { Takmicenje } from 'src/models/takmicenje';
import { MedaljeService } from '../medalje.service';
import { RasporedEkipniService } from '../raspored-ekipni.service';
import { RasporedIndividualniService } from '../raspored-individualni.service';
import { SportistaService } from '../sportista.service';
import { TakmicenjaService } from '../takmicenja.service';

@Component({
  selector: 'app-ekipni',
  templateUrl: './ekipni.component.html',
  styleUrls: ['./ekipni.component.css']
})
export class EkipniComponent implements OnInit {

  constructor(private ruter: ActivatedRoute, private takmServis: TakmicenjaService,
    private rasporedE: RasporedEkipniService, private rasporedI: RasporedIndividualniService,
    private medaljeServis: MedaljeService, private sportistaServis: SportistaService) { }

  ngOnInit(): void {

    this.sport = this.ruter.snapshot.paramMap.get("sport");
    this.pol = this.ruter.snapshot.paramMap.get("pol");

    this.takmServis.dohvatiTakmicenje(this.sport, '', this.pol).subscribe((takm: Takmicenje)=>{
      this.mojeTakmicenje = takm;

      if (this.mojeTakmicenje.prvi!=null) this.zavrseno = true;

      if (this.mojeTakmicenje.br_takmicara==8) {
        this.faza1 = true;
        this.faza2 = false;
      } else if (this.mojeTakmicenje.br_takmicara == 4) {
        this.faza1 = true;
        this.faza3 = false;
      }

      this.rasporedE.dohvatiRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((raspored: rasporedEkipni[])=>{
        if (raspored){
          this.mojRaspored = raspored;
          
          this.provera();
        } 

    })
    })
  }

  sport: string;
  pol: string;

  mojeTakmicenje: Takmicenje;
  mojRaspored: rasporedEkipni[];

  faza1: boolean = false;
  faza2: boolean = true;
  faza3: boolean = true;
  faza4: boolean = true;
  faza5: boolean = false;
  provera() {

    if (this.mojeTakmicenje.br_takmicara==12) {
      if (this.mojRaspored.length > 0 )this.faza1 = true;
      for (let i=0; i< 30;i++) {
          if (this.mojRaspored[i].pobednik==0) this.faza1 = false;
      }
 
      if (this.faza1==true) this.faza2=false;

      if (this.mojRaspored.length > 30) {
      if (this.faza1 == true) {
        this.faza2 = true;
      for (let i = 30; i < 34; i++) {
        if (this.mojRaspored[i].pobednik==0) this.faza2 = false;
      }

      if (this.faza2 == true) this.faza3 = false;
    }
  }
  
  if (this.mojRaspored.length > 34) {
      if (this.faza2==true) {
        this.faza3= true;
      for (let i = 34; i < 36; i++) {
        if (this.mojRaspored[i].pobednik==0) this.faza3 = false;
      }
      if (this.faza3 == true) this.faza4 = false;
    }



    if (this.mojRaspored.length > 36) {
      if (this.faza3 == true) {
        this.faza4=true;
        for (let i = 36; i < 38; i++) {
          if (this.mojRaspored[i].pobednik==0) this.faza4 = false;
        }
        if (this.faza4 == true) this.faza5 = true;
      }

    }
    }
    } else if (this.mojeTakmicenje.br_takmicara==8) {

      if (this.mojRaspored.length > 0) this.faza2 = true;
      for (let i = 0; i < 4; i++) {
        if (this.mojRaspored[i].pobednik==0) this.faza2 = false;
      }

      if (this.faza2==true) this.faza3=false;

      if (this.mojRaspored.length > 4){
      if (this.faza2==true) {
        this.faza3= true;
        for (let i = 4; i < 6; i++) {
          if (this.mojRaspored[i].pobednik==0) this.faza3 = false;
        }

        if (this.faza3==true) this.faza4=false;
      }
    }

    if (this.mojRaspored.length > 6) {
      if (this.faza3 == true) {
        this.faza4=true;
        for (let i = 6; i < 8; i++) {
          if (this.mojRaspored[i].pobednik==0) this.faza4 = false;
        }
        if (this.faza4 == true) this.faza5 = true;
      }
    }
    } else if (this.mojeTakmicenje.br_takmicara==4) {
      if (this.mojRaspored.length > 0) this.faza3 = true;
      for (let i = 0; i < 2; i++) {
        if (this.mojRaspored[i].pobednik==0) this.faza3 = false;
      }
      if (this.faza3==true) this.faza4=false;

      if (this.mojRaspored.length > 2) {
      if (this.faza3 == true) {
        this.faza4=true;
        for (let i = 2; i < 4; i++) {
          if (this.mojRaspored[i].pobednik==0) this.faza4 = false;
        }

        if (this.faza4 == true) this.faza5 = true;
      }
    }
    
  }
}

  kreirajRaspored() {

      this.kreirajGrupe();
  }

  pokreniCetvrtfinale() {

    if (this.mojeTakmicenje.br_takmicara==12) this.rangirajTimove();
    else this.kreirajCetvrtfinale();
  }

  pokreniPolufinale() {

    if (this.mojeTakmicenje.br_takmicara==12 || this.mojeTakmicenje.br_takmicara==8) this.odrediPolufinaliste();
    else this.kreirajPolufinale();
  }

  pokreniFinale() {

    this.odrediFinaliste();
  }

  kreirajGrupe() {

    
    let grupaA: string[]= [];
    let grupaB: string[] = [];

    let rundaA: string = "grupa A";
    let rundaB: string = "grupa B";

    for (let i=0; i< 6; i++) grupaA.push(this.mojeTakmicenje.ucesnici[i]);
    for (let i=6; i< 12; i++) grupaB.push(this.mojeTakmicenje.ucesnici[i]);

    for (let i=0; i < grupaA.length - 1; i++) {
      for (let j = i+1; j < grupaA.length; j++) {
        this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, grupaA[i], grupaA[j], rundaA).subscribe();
      }
    }

    for (let i=0; i < grupaB.length - 1; i++) {
      for (let j = i+1; j < grupaB.length; j++) {
        this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, grupaB[i], grupaB[j], rundaB).subscribe();
      }
    }

    this.rasporedE.dohvatiRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((raspored: rasporedEkipni[])=>{
        this.mojRaspored = raspored;
    })
  }

  datum: string;
  vreme: string;
  rezultat: string;
  poruka: string;
  
  unesiDatum(r: rasporedEkipni) {

    this.rasporedE.unesiDatum(r.sport, r.disciplina, r.pol, this.datum, r.timA, r.timB, r.runda).subscribe(res=>{
      if (res['poruka']=='ok') {
          this.rasporedE.dohvatiRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((raspored: rasporedEkipni[])=>{
        this.mojRaspored = raspored;
    })
      }
    });
  }

   unesiVreme(r: rasporedEkipni) {

    this.rasporedE.dohvatiTakmicenjeSaIstimVremenom(r.lokacija, this.vreme, r.datum).subscribe((raspored: rasporedEkipni)=>{
      if (raspored!=null) {
        this.poruka = 'Vec postoji zakazano takmicenje na ovom mestu u ovo vreme';}

      else this.rasporedI.dohvatiRasporedSaIstimVremenom(r.lokacija,r.datum, this.vreme).subscribe((raspored: RasporedIndividualni[])=>{
        if (raspored.length > 0) {
          this.poruka = 'Vec postoji zakazano takmicenje na ovom mestu u ovo vreme';}

        else {
          this.poruka = null;
         this.rasporedE.unesiVreme(r.sport, r.disciplina, r.pol, this.vreme, r.timA, r.timB, r.runda).subscribe(res=>{
               if (res['poruka']=='ok') {
          this.rasporedE.dohvatiRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((raspored: rasporedEkipni[])=>{
        this.mojRaspored = raspored;
        })
      }
          });
        }
      })
      
    })

  }

  unesiRezultat(r: rasporedEkipni) {

    let rezultati = this.rezultat.split(':');
    let pobednik = 0;
    if ((+rezultati[0]) > (+rezultati[1])) pobednik = 1;
    else pobednik = 2;

    this.rasporedE.unesiRezultat(r.sport, r.disciplina, r.pol, this.rezultat,pobednik, r.timA, r.timB, r.runda).subscribe(res=>{
      if (res['poruka']=='ok') {
          this.rasporedE.dohvatiRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((raspored: rasporedEkipni[])=>{
        this.mojRaspored = raspored;

        this.provera();
    })
      }
    });
  }

  //cetvrtfinale - i sve vezano za to
  grupaA : Poeni[]=[];
  grupaB : Poeni[]=[];
  A: rasporedEkipni[];
  B: rasporedEkipni[];
  cetvrtfinale: string[]=[];

  rangirajTimove() {

    this.rasporedE.dohvatiGrupu(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, "grupa A").subscribe((grupe: rasporedEkipni[])=>{
      this.A = grupe;
      this.rasporedE.dohvatiGrupu(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, "grupa B").subscribe((grupe: rasporedEkipni[])=>{
        this.B=grupe;

        for (let i=0; i< 6; i++){
          let poeni = new Poeni;
          poeni.zemlja = this.mojeTakmicenje.ucesnici[i];
          poeni.brojPoena = 0;
          poeni.razlika = 0;
          this.grupaA.push(poeni);
        } 
        for (let i=6; i< 12; i++) {
          let poeni = new Poeni;
          poeni.zemlja = this.mojeTakmicenje.ucesnici[i];
          poeni.brojPoena = 0;
          poeni.razlika = 0;
          this.grupaB.push(poeni);
        }


        for (let i=0; i < this.A.length; i++) {
          if (this.A[i].pobednik==1) {
            for (let j = 0; j < this.grupaA.length; j++) {
              if (this.grupaA[j].zemlja == this.A[i].timA) {
                this.grupaA[j].brojPoena+=2;
                this.grupaA[j].razlika += +this.A[i].rezultat.split(':')[0] - +this.A[i].rezultat.split(':')[1];
              }
              if (this.grupaA[j].zemlja == this.A[i].timB) this.grupaA[j].brojPoena+=1;
            }
          } else if (this.A[i].pobednik==2) {
            for (let j = 0; j < this.grupaA.length; j++) {
              if (this.grupaA[j].zemlja == this.A[i].timA) {
                this.grupaA[j].brojPoena+=1;
                this.grupaA[j].razlika += +this.A[i].rezultat.split(':')[1] - +this.A[i].rezultat.split(':')[0];
              }
              if (this.grupaA[j].zemlja == this.A[i].timB) this.grupaA[j].brojPoena+=2;
            }
          }
        }

        for (let i=0; i < this.B.length; i++) {
          if (this.B[i].pobednik==1) {
            for (let j = 0; j < this.grupaB.length; j++) {
              if (this.grupaB[j].zemlja == this.B[i].timA) {
                this.grupaB[j].brojPoena+=2;
                this.grupaB[j].razlika += +this.B[i].rezultat.split(':')[0] - +this.B[i].rezultat.split(':')[1];
              }
              if (this.grupaB[j].zemlja == this.B[i].timB) this.grupaB[j].brojPoena+=1;
            }
          } else if (this.B[i].pobednik==2) {
            for (let j = 0; j < this.grupaB.length; j++) {
              if (this.grupaB[j].zemlja == this.B[i].timA) this.grupaB[j].brojPoena+=1;
              if (this.grupaB[j].zemlja == this.B[i].timB) {
                this.grupaB[j].brojPoena+=2;
                this.grupaB[j].razlika += +this.B[i].rezultat.split(':')[1] - +this.B[i].rezultat.split(':')[0];
              } 
            }
          }
        }
        
        this.grupaA.sort(function(a, b){
          return b.brojPoena - a.brojPoena;
        })

        this.grupaB.sort(function(a, b){
          return b.brojPoena - a.brojPoena;
        })

        if (this.grupaA[3].brojPoena == this.grupaA[4].brojPoena && this.grupaA[4].razlika > this.grupaA[3].razlika) {
          let tmp = this.grupaA[3];
          this.grupaA[3]=this.grupaA[4];
          this.grupaA[4] = tmp;
        }

        if (this.grupaB[3].brojPoena == this.grupaB[4].brojPoena && this.grupaB[4].razlika > this.grupaB[3].razlika) {
          let tmp = this.grupaB[3];
          this.grupaB[3]=this.grupaB[4];
          this.grupaB[4] = tmp;
        }


        for (let i=0; i < 4; i++) this.cetvrtfinale.push(this.grupaA[i].zemlja);
        for (let i=0; i < 4; i++) this.cetvrtfinale.push(this.grupaB[i].zemlja);

        this.kreirajCetvrtfinale();
    });

  
  });
}

kreirajCetvrtfinale() {

  let pomocniNiz:string[];
  let runda = 'cetvrtfinale';

  if (this.mojeTakmicenje.br_takmicara==12) pomocniNiz = this.cetvrtfinale;
  else if (this.mojeTakmicenje.br_takmicara == 8) pomocniNiz = this.mojeTakmicenje.ucesnici;

  this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, pomocniNiz[0], pomocniNiz[7], runda + " A1+B4").subscribe();
  this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, pomocniNiz[5], pomocniNiz[2], runda + " B2+A3").subscribe();
  this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, pomocniNiz[4], pomocniNiz[3], runda + " B1+A4").subscribe();
  this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, pomocniNiz[1], pomocniNiz[6], runda + " A2+B3").subscribe();

  this.rasporedE.dohvatiRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((raspored: rasporedEkipni[])=>{
    this.mojRaspored = raspored;
})
}


polufinalisti: string[]=[];
//polufinale
odrediPolufinaliste() {

  
  this.rasporedE.dohvatiCetvrtfinale(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((rasporedi : rasporedEkipni[])=>{
    
    for (let i=0; i < rasporedi.length; i++) {
      if (rasporedi[i].pobednik==1) this.polufinalisti.push(rasporedi[i].timA);
      else if (rasporedi[i].pobednik==2) this.polufinalisti.push(rasporedi[i].timB);
    }

    this.kreirajPolufinale();
  })
  
}

kreirajPolufinale() {

  let pomocniNiz: string[];

  if (this.mojeTakmicenje.br_takmicara==12 || this.mojeTakmicenje.br_takmicara==8) pomocniNiz=this.polufinalisti;
  else pomocniNiz=this.mojeTakmicenje.ucesnici;

  this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, pomocniNiz[0], pomocniNiz[1], "polufinale (A1+B4)+(B2+A3)").subscribe();
  this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, pomocniNiz[2], pomocniNiz[3], "polufinale (A4+B1)+(B3+A2)").subscribe();

  this.rasporedE.dohvatiRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((raspored: rasporedEkipni[])=>{
    this.mojRaspored = raspored;

  
})
}

//finale
finalisti: string[] = [];
treceMesto: string[] = [];
odrediFinaliste() {

  this.rasporedE.dohvatiPolufinale(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((rasporedi: rasporedEkipni[])=>{

    for (let i=0; i < rasporedi.length; i++) {
      if (rasporedi[i].pobednik==1) {
        this.finalisti.push(rasporedi[i].timA);
        this.treceMesto.push(rasporedi[i].timB);
      }
      else if (rasporedi[i].pobednik==2) {
        this.finalisti.push(rasporedi[i].timB);
        this.treceMesto.push(rasporedi[i].timA);
      }
    }

    this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, this.finalisti[0], this.finalisti[1], 'finale').subscribe();
    this.rasporedE.dodajRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.mojeTakmicenje.lokacija, this.treceMesto[0], this.treceMesto[1], 'trece mesto').subscribe();
  
    this.rasporedE.dohvatiRaspored(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol).subscribe((raspored: rasporedEkipni[])=>{
      this.mojRaspored = raspored;
  })
  })

}

prvo: string;
drugo: string;
trece: string;
zavrseno:boolean = false;

krajTakmicenja() {

  let finalisti: rasporedEkipni;
  let trece: rasporedEkipni;
  this.rasporedE.dohvatiFinale(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, "finale").subscribe((finale: rasporedEkipni)=>{
      finalisti = finale;
  this.rasporedE.dohvatiFinale(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, "trece mesto").subscribe((trece: rasporedEkipni)=>{
      trece = trece;

      if (finale.pobednik==1) {
        this.prvo = finale.timA;
        this.drugo = finale.timB;
      } else {
        this.prvo = finale.timB;
        this.drugo = finale.timA;
      }

      if (trece.pobednik==1) this.trece=trece.timA;
      else this.trece = trece.timB;

      this.medaljeServis.azurirajZlatne(this.prvo).subscribe();
      this.medaljeServis.azurirajSrebrne(this.drugo).subscribe();
      this.medaljeServis.azurirajBronzane(this.trece).subscribe();

      this.zavrseno = true;
      this.takmServis.azurirajMesta(this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina, this.mojeTakmicenje.pol, this.prvo, this.drugo, this.trece).subscribe(res=>{
        if (res['poruka']=='ok') {

          this.sportistaServis.dohvatiMojeSportiste(this.prvo, this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina).subscribe((sportisti: Sportista[])=>{

            for (let i=0; i < sportisti.length; i++){
              this.sportistaServis.dodajMedalju(1, sportisti[i].ime, "").subscribe();
            }
          })
    
          this.sportistaServis.dohvatiMojeSportiste(this.drugo, this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina).subscribe((sportisti: Sportista[])=>{
    
            for (let i=0; i < sportisti.length; i++){
              this.sportistaServis.dodajMedalju(2, sportisti[i].ime, "").subscribe();
            }
          })
    
          this.sportistaServis.dohvatiMojeSportiste(this.trece, this.mojeTakmicenje.sport, this.mojeTakmicenje.disciplina).subscribe((sportisti: Sportista[])=>{
    
            for (let i=0; i < sportisti.length; i++){
              this.sportistaServis.dodajMedalju(3, sportisti[i].ime, "").subscribe();
            }
          })
        }      
      });
  
  

    })
  })


}

}
