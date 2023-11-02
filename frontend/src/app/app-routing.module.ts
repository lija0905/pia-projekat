import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DelegatComponent } from './delegat/delegat.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenalozinkeComponent } from './promenalozinke/promenalozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RekordiComponent } from './rekordi/rekordi.component';
import { TakmicenjaComponent } from './takmicenja/takmicenja.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';
import { VodjaComponent }  from './vodja/vodja.component';
import { RasporedComponent } from './raspored/raspored.component';
import { EkipniComponent } from './ekipni/ekipni.component';

const routes: Routes = [
  {path: '', component: PocetnaComponent},
  {path: 'prijava', component: PrijavaComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'zahtevi', component: ZahteviComponent},
  {path: 'organizator', component: OrganizatorComponent},
  {path: 'promenaLozinke', component: PromenalozinkeComponent},
  {path: 'takmicenja', component: TakmicenjaComponent},
  {path: 'rekordi', component: RekordiComponent},
  {path: 'vodja', component: VodjaComponent},
  {path: 'delegat', component: DelegatComponent},
  {path: 'raspored/:sport/:disciplina/:pol/:vrsta', component: RasporedComponent},
  {path: 'ekipni/:sport/:pol/:vrsta', component: EkipniComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
