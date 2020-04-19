import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CameraPreviewPage } from './camera-preview.page';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CameraPreviewPage
      }
    ])
  ],
  declarations: [CameraPreviewPage],
  providers: [CameraPreview]
})
export class CameraPreviewPageModule {}
