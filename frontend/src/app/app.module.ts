import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './registracija/registracija.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PromenalozinkeComponent } from './promenalozinke/promenalozinke.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';
import { TakmicenjaComponent } from './takmicenja/takmicenja.component';
import { RekordiComponent } from './rekordi/rekordi.component';
import { DelegatComponent } from './delegat/delegat.component';
import { VodjaComponent } from './vodja/vodja.component';
import { RasporedComponent } from './raspored/raspored.component';
import { EkipniComponent } from './ekipni/ekipni.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    PrijavaComponent,
    RegistracijaComponent,
    ZahteviComponent,
    OrganizatorComponent,
    PromenalozinkeComponent,
    TakmicenjaComponent,
    RekordiComponent,
    DelegatComponent,
    VodjaComponent,
    RasporedComponent,
    EkipniComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
