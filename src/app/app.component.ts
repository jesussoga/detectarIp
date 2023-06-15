import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DireccionIp} from "./models/direccionip.model";
import {Localizacion} from "./models/localizacionip.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public direccionIp: DireccionIp;
  public cargando: boolean;
  public geoLocalizacion! : Localizacion;

  constructor(private httpClient: HttpClient) {
    this.direccionIp = {ip : ""};
    this.cargando = false;
  }

  public obtenerIp(): void{
    this.cargando = true;
      this.httpClient.get<DireccionIp>("https://api.ipify.org/?format=json").subscribe(
        {
          next: (datos: DireccionIp)=> {
            console.log("Ya han llegado los datos", datos);
            this.direccionIp = datos;
            this.cargando = false;
          },
          error: (error)=> {
            console.log("No han llegado los datos", error);
            this.cargando = false;
          }
        }
      );

  }public localizacion(): void{
      // this.httpClient.get<Localizacion>("https://ipinfo.io/" + this.direccionIp.ip + "/geo").subscribe(
      this.httpClient.get<Localizacion>("https://ipinfo.io/188.85.194.218/geo").subscribe(
        {
          next: (datos: Localizacion)=> {
            console.log("Ya han llegado los datos", datos);
            this.geoLocalizacion = datos;
          },
          error: (error)=> {
            console.log("No han llegado los datos", error);
          }
        }
      );
  }

}
