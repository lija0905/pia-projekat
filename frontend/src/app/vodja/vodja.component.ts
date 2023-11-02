import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Disciplina } from 'src/models/disciplina';
import { Korisnik } from 'src/models/korisnik';
import { Sport } from 'src/models/sport';
import { Sportista } from 'src/models/sportista';
import { Takmicenje } from 'src/models/takmicenje';
import { SportService } from '../sport.service';
import { SportistaService } from '../sportista.service';
import { TakmicenjaService } from '../takmicenja.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private sportistaServis: SportistaService, private sportServis: SportService, private takmServis: TakmicenjaService) { }

  ngOnInit(): void {

    this.delegat = JSON.parse(localStorage.getItem('ulogovan'));
    this.prikaz = "sport";

    this.sportServis.dohvatiSportove().subscribe((sportovi: Sport[])=>{
      this.sportovi = sportovi;

      this.sportistaServis.dohvatiSveMojeSportiste(this.delegat.drzava).subscribe((Sportisti: Sportista[])=>{
        this.mojiSportisti = Sportisti;
        this.ukupanBrojSportista = Sportisti.length;

        for (let i =0; i < this.sportovi.length; i++){
          this.sportistaServis.dohvatiMojeSportiste(this.delegat.drzava, this.sportovi[i].sport, "").subscribe((sportisti: Sportista[])=>{
            this.sportovi[i].brojMojihSportista = sportisti.length;
          
          })
        }
  
      })

    
      })


  }

  delegat: Korisnik;
  //dodavanje Sportiste
  ime: String;
  pol: String;
  sport: String;
  disciplina: String;
  brojPrijavljenih: number = 0;
  porukaDodaj: String;
  mojeDiscipline: Disciplina[];

  //prikaz
  mojiSportisti: Sportista[];
  sportovi: Sport[]=[];
  ukupanBrojSportista : Number;

  trenutneDiscipline: Disciplina[];
  prikaz: String = "sport";
  trenutniSport: String;
  trenutnaDisciplina: String;
  trenutniSportisti: Sportista[];

  dohvatiMojeDiscipline() {

    this.sportServis.dohvatiSport(this.sport).subscribe((s: Sport)=> {
      this.mojeDiscipline = s.disciplina;
    })

  }

  dodajSportistu() {

    if (this.sport == null || this.ime==null || this.pol == null) this.porukaDodaj = 'Sva polja osim discipline su obavezna';


    else {
      let p;
      if (this.pol=='m') p='muski';
      else p='zenski';

      this.takmServis.dohvatiTakmicenje(this.sport, this.disciplina, p).subscribe((takm: Takmicenje)=>{
        if (takm) alert('Prijava za ovo takmicenje je zavrsena!');
        else {
          this.sportServis.dohvatiSport(this.sport).subscribe((sport: Sport)=> {
         
            if (sport.vrsta == "ekipni") {
              this.brojPrijavljenih = 0;
              for (let i=0; i < this.mojiSportisti.length; i++) {
                if (this.mojiSportisti[i].sport == this.sport && this.mojiSportisti[i].pol==this.pol){
                 this.brojPrijavljenih++;
                } 
              }
              let brIgraca  = sport.broj_igraca.split('/');
              let brojIgraca = parseInt(brIgraca[1]);
              if (this.brojPrijavljenih == brojIgraca) this.porukaDodaj = 'Maksimalan broj prijavljenih igaraca za ovo takmicenje je ' + brojIgraca;
              else {
               this.sportistaServis.dodajSportistu(this.ime, this.sport, this.delegat.drzava, this.pol, this.disciplina).subscribe(res=>{
                 if (res['poruka'] == 'ok')  {
                   alert('Uspesno prijavljenn sportista');
           
                   this.sportServis.dohvatiSportove().subscribe((sportovi: Sport[])=>{
                     this.sportovi = sportovi;
               
                     this.sportistaServis.dohvatiSveMojeSportiste(this.delegat.drzava).subscribe((Sportisti: Sportista[])=>{
                       this.ukupanBrojSportista = Sportisti.length;
               
                       for (let i =0; i < this.sportovi.length; i++){
                         this.sportistaServis.dohvatiMojeSportiste(this.delegat.drzava, this.sportovi[i].sport, "").subscribe((sportisti: Sportista[])=>{
                           if (sportisti) this.sportovi[i].brojMojihSportista = sportisti.length;
                         })
                       }
                 
                     })
                  
                     })
   
                 }
               })
             }
            } else {
              this.sportistaServis.dodajSportistu(this.ime, this.sport, this.delegat.drzava, this.pol, this.disciplina).subscribe(res=>{
                if (res['poruka'] == 'ok')  {
                  alert('Uspesno prijavljenn sportista');
          
                  this.sportServis.dohvatiSportove().subscribe((sportovi: Sport[])=>{
                    this.sportovi = sportovi;
              
                    this.sportistaServis.dohvatiSveMojeSportiste(this.delegat.drzava).subscribe((Sportisti: Sportista[])=>{
                      this.ukupanBrojSportista = Sportisti.length;
              
                      for (let i =0; i < this.sportovi.length; i++){
                        this.sportistaServis.dohvatiMojeSportiste(this.delegat.drzava, this.sportovi[i].sport, "").subscribe((sportisti: Sportista[])=>{
                          if (sportisti) this.sportovi[i].brojMojihSportista = sportisti.length;
                        })
                      }
                
                    })
              
                  
                    })
  
                }
              })
            }
       
         })
   
        }
      })

     
    }

    

  }


  discipline(s: Sport){
    this.trenutniSport = s.sport;
    this.prikaz = 'discipline';

    if (s.disciplina.length ==0) {
      this.sportistaServis.dohvatiMojeSportiste(this.delegat.drzava, this.trenutniSport, "").subscribe((sportisti: Sportista[])=>{
        this.trenutniSportisti = sportisti;
        this.prikaz = 'sportisti';
      })
    } else {
      this.trenutneDiscipline = s.disciplina;

      for (let i=0; i < this.trenutneDiscipline.length; i++) {
        this.sportistaServis.dohvatiMojeSportiste(this.delegat.drzava, this.trenutniSport, s.disciplina[i].naziv).subscribe((sportisti: Sportista[])=> {
         if(sportisti) this.trenutneDiscipline[i].brojMojihSportista = sportisti.length;
         else this.trenutneDiscipline[i].brojMojihSportista = null;
        })
      }

     
    }

   
  }

  sportisti(d: Disciplina) {

    this.trenutnaDisciplina = d.naziv;
    this.prikaz  = 'sportisti';

    this.sportistaServis.dohvatiMojeSportiste(this.delegat.drzava, this.trenutniSport, d.naziv).subscribe((sportisti: Sportista[])=>{
      this.trenutniSportisti = sportisti;
    })

  }

  povratakSport() {
    this.prikaz = 'sport';
    this.trenutniSport = null;
    this.trenutnaDisciplina = null;
  }

  povratakDisciplina() {
    this.trenutnaDisciplina = null;
    this.prikaz = 'discipline';
  }
}
