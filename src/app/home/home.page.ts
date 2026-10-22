import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { locationOutline, navigateOutline, openOutline, saveOutline } from 'ionicons/icons';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  ],
})
export class HomePage {
  urlUbicacion = 'https://www.google.com/maps/@-0.2025464,-78.4941719';

  urlRuta =
    'https://www.google.com/maps/dir/?api=1' +
    '&origin=-0.180653,-78.467838' +
    '&destination=-0.229415,-78.524581' +
    '&waypoints=-0.201452,-78.498124%7C-0.220164,-78.512328';

  mensaje = '';

  constructor() {
    addIcons({ locationOutline, navigateOutline, openOutline, saveOutline });
  }

  async guardar(nombre: string, contenido: string) {
    try {
      await Filesystem.writeFile({
        path: nombre,
        data: contenido,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      const uri = await Filesystem.getUri({ path: nombre, directory: Directory.Documents });
      this.mensaje = `Guardado en: ${uri.uri}`;
    } catch (e) {
      this.mensaje = 'Error al guardar: ' + e;
    }
  }

  guardarUbicacion() {
    this.guardar('ubicacion.txt', this.urlUbicacion);
  }

  guardarRuta() {
    this.guardar('ruta.txt', this.urlRuta);
  }
}
