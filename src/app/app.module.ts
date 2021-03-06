import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule,} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { NavComponent } from './components/nav/nav.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChatComponent } from './components/chat/chat.component';
import { ListadoMensajesComponent } from './components/listado-mensajes/listado-mensajes.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { AppRoutingModule } from './app-routing.module';
import { EncuestasComponent } from './components/encuestas/encuestas.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    NavComponent,
    ChatComponent,
    ListadoMensajesComponent,
    EncuestaComponent,
    ResultadosComponent,
    EncuestasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
