import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { CameraPreview } from '@ionic-native/camera-preview/ngx';

import { CameraPreviewPage } from './camera-preview.page';
import {RouterTestingModule} from '@angular/router/testing';
import { By } from '@angular/platform-browser';


describe('CameraPreviewPage', () => {
  let component: CameraPreviewPage;
  let fixture: ComponentFixture<CameraPreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraPreviewPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule],
      providers: [CameraPreview]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //je n'ai pas reussit a tester unitairement la camera je n'ai pas compris comment la mock pour verifier les methodes.

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.tools).toBeTruthy();
    expect(component.showPreview).toBeTruthy();
    expect(component.toastedAcces).toBeFalsy();
    //cameraStart dois etre a true car elle passe dans ngOnInit()
    expect(component.cameraStart).toBeTruthy();
  });
  
  it('should open menu', () => {
    component.onTools();
    expect(component.tools).toBeFalsy();
  })
});
