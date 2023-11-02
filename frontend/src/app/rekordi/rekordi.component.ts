import { Component, OnInit } from '@angular/core';
import { Rekord } from 'src/models/rekord';
import { RekordService } from '../rekord.service';

@Component({
  selector: 'app-rekordi',
  templateUrl: './rekordi.component.html',
  styleUrls: ['./rekordi.component.css']
})
export class RekordiComponent implements OnInit {

  constructor(private rekordServis: RekordService) { }

  ngOnInit(): void {

    this.rekordServis.dohvatiRekorde().subscribe((rekordi: Rekord[])=> {
      this.rekordi = rekordi;
    })

  }

  rekordi: Rekord[];

}
