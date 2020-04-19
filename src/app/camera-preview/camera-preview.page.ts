import { Component, OnInit, OnDestroy} from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.page.html',
  styleUrls: ['./camera-preview.page.scss'],
})
export class CameraPreviewPage implements OnInit, OnDestroy {

  picture: string;

  tools: boolean = true;
  showPreview: boolean = true;
  toastedAcces: boolean = false;
  cameraStart: boolean = false;

  rangeZoom: number = 49;

  colorsEffectsOne: Array<string> = new Array<string>("aqua", "blackboard", "mono", "negative");
  colorsEffectsTwo: Array<string> = new Array<string>("posterize", "sepia", "solarize", "whiteboard");

  cameraPreviewSize: CameraPreviewDimensions = {
    width: 100,
    height: 100
  }

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: window.screen.height * 0.0766,
    width: window.screen.width,
    height: window.screen.height / 2,
    camera: 'rear',
    tapPhoto: false,
    toBack: false,
    previewDrag: false,
    alpha: 1
  }

  pictureOpts: CameraPreviewPictureOptions = {
    width: 50,
    height: 50,
    quality: 85
  }

  constructor(private cameraPreview: CameraPreview, public toastController: ToastController) { }

  startCamera(){
    this.cameraPreview.startCamera(this.cameraPreviewOpts);
    this.cameraStart = true;
  }

  takePicture(){
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
  }

  onTools(){
    this.tools = !this.tools;
  }

  changeCamera(){
    this.cameraPreview.switchCamera()
    .then(() => {
      this.presentToastWithOptions(true, 'Switch')
    }).catch(() => this.presentToastWithOptions(false, 'Switch'));
  }

  changeDisplayPreview(){
    this.showPreview = !this.showPreview;

    if(this.showPreview){
      this.cameraPreview.show()
        .then(() => this.presentToastWithOptions(true, 'Show preview'))
        .catch(() => this.presentToastWithOptions(false, 'Show preview'))
    } else {
      this.cameraPreview.hide()
        .then(() => this.presentToastWithOptions(true, 'Hide preview'))
        .catch(() => this.presentToastWithOptions(false, 'Show preview'));
    }
  }

  applyZoom(){
    /*
      Ne marche pas sur mon emulateur, mais ne sort pas d'erreur.
    */
    this.cameraPreview.setZoom(this.rangeZoom)
    .catch(() => this.presentToastWithOptions(false, 'Zoom'));
  }

  changeColorEffect(colorEffect: string){
    /*
      La methode getSupportedColorEffects n'est pas disponible sur ma version de camera preview
    */
    this.cameraPreview.setColorEffect(colorEffect)
    .then(() =>
      this.presentToastWithOptions(true, 'Color ' + colorEffect)
    ).catch(() => this.presentToastWithOptions(false, 'Color ' + colorEffect));
  }

  async presentToastWithOptions(success: boolean, options?: string, time?: number) {
    const toast = await this.toastController.create({
      message: options + (success ? ' effect work' : ' effect don\'t work'),
      position: 'bottom',
      duration: time ? time : 2000,
      color: success ? 'success' : 'danger'
    });

    if(!this.toastedAcces){
      toast.present().then(() => this.toastedAcces = true);
    } else{
      toast.dismiss().then(() => this.toastedAcces = false);
    }
    
  }

  ngOnInit() {
    this.startCamera();
  }

  ngOnDestroy() {
    this.cameraPreview.stopCamera();
  }
}
