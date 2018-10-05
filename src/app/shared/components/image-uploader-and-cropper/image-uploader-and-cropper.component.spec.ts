import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploaderAndCropperComponent } from './image-uploader-and-cropper.component';

describe('ImageUploaderAndCropperComponent', () => {
  let component: ImageUploaderAndCropperComponent;
  let fixture: ComponentFixture<ImageUploaderAndCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploaderAndCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploaderAndCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
