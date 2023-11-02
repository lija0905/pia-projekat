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
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private sportistaServis: SportistaService, private sportServis: SportService, private takmServis: TakmicenjaService) { }

  ngOnInit(): void {

    this.delegat =JSON.parse(localStorage.getItem('ulogovan'));

    this.takmServis.dohvatiTakmicenjaDelegata(this.delegat.korime).subscribe((takmicenja: Takmicenje[])=>{
      this.mojaTakmicenja = takmicenja;
    })

  }

  delegat: Korisnik;
  mojaTakmicenja: Takmicenje[];


}
