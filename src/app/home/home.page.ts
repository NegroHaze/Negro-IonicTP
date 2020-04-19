import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  imgData: string;
  currentDate: Date;
  currentPosAndDate = new Array<Array<string>>();
  trackingStart: boolean = false;
  notificationActive: boolean = false;
  print: string;

  watch:any;
  subscription: any;

  constructor(private alertController: AlertController, private camera: Camera, private geolocation: Geolocation, private localNotifications: LocalNotifications) {}

  launchNotif(){

    if(this.notificationActive){
      this.localNotifications.clearAll();
    }else {
      this.localNotifications.schedule({
        id: 1,
        title: 'titre',
        text: 'Tu es notifié',
        data: { secret: "key" },
      });
    }
    this.notificationActive = !this.notificationActive;
  }

  timing(){
    if(this.trackingStart){
      this.subscription.unsubscribe();
      return this.trackingStart = false;
    }else {
      this.watch = this.geolocation.watchPosition();
      this.subscription = this.watch.subscribe((resp) => {
        let PosAndDate = new Array<string>();
  
        PosAndDate.push(resp.coords.longitude.toFixed(4).toString());
        PosAndDate.push(resp.coords.latitude.toFixed(4).toString());
        PosAndDate.push(new Date().toLocaleTimeString());
  
        this.currentPosAndDate.push(PosAndDate);
        return this.trackingStart = true;;
      });
    }
  }
  
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

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.currentDate = new Date();
      this.imgData = 'data:image/jpeg;base64,' + imageData;
    }).catch(error => {
      console.log('Error getting picture: ', error);
    });
  }
}
