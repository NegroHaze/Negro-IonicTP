import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string;
  currentDate: Date;
  currentPosAndDate = new Array<Array<string>>();

  constructor(private alertController: AlertController, private geolocation: Geolocation) {
    this.currentDate = new Date();
  }

  updateTitle() {
    this.title = 'Mon Nouveau Titre';
  }

  timing(){

    this.geolocation.getCurrentPosition().then((resp) => {
      let PosAndDate = new Array<string>(); 

      PosAndDate.push(resp.coords.longitude.toString());
      PosAndDate.push(resp.coords.latitude.toString());
      PosAndDate.push(new Date().toLocaleTimeString());

      this.currentPosAndDate.push(PosAndDate);
    }).catch((error) => {
       console.log('Error getting location', error);
    });
  }
  /**
   * https://ionicframework.com/docs/api/alert
   */
  async fireAlert() {
    // creation de l alerte
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    // quand l alerte sera masquée
    alert.onDidDismiss().then(() => console.log('alerte masquée'))

    // affichage de l alerte
    await alert.present();
  }
}
