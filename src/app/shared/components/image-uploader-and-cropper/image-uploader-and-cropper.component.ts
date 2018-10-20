import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'image-uploader-and-cropper',
  templateUrl: './image-uploader-and-cropper.component.html',
  styleUrls: ['./image-uploader-and-cropper.component.scss']
})
export class ImageUploaderAndCropperComponent implements OnInit {
  @Output() OnImageUploadedAndCropped = new EventEmitter<string>();
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCroppedBase64(imageBase64: string) {
      this.croppedImage = imageBase64;
      this.OnImageUploadedAndCropped.emit(this.croppedImage);
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }

}
