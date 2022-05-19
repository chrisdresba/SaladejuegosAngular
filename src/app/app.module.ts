import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule,} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { NavComponent } from './components/nav/nav.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AhorcadoComponent } from './components/listado-juegos/ahorcado/ahorcado.component';
import { MayormenorComponent } from './components/listado-juegos/mayormenor/mayormenor.component';
import { PreguntadosComponent } from './components/listado-juegos/preguntados/preguntados.component';
import { JuegopropioComponent } from './components/listado-juegos/juegopropio/juegopropio.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListadoMensajesComponent } from './components/listado-mensajes/listado-mensajes.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ResultadosComponent } from './components/resultados/resultados.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    NavComponent,
    JuegosComponent,
    AhorcadoComponent,
    MayormenorComponent,
    PreguntadosComponent,
    JuegopropioComponent,
    ChatComponent,
    ListadoMensajesComponent,
    EncuestaComponent,
    ResultadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
