import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule,} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { NavComponent } from './components/nav/nav.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChatComponent } from './pages/chat/chat.component';
import { ListadoMensajesComponent } from './pages/listado-mensajes/listado-mensajes.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { AppRoutingModule } from './app-routing.module';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { CookieService } from 'ngx-cookie-service';
import { FooterComponent } from './components/footer/footer.component';


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
    EncuestasComponent,
    FooterComponent
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
  bootstrap: [AppComponent],
  exports:[FooterComponent]
})
export class AppModule { }
