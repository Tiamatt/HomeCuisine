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
  imageCropped(image: string) {
      this.croppedImage = image;
      this.OnImageUploadedAndCropped.emit(this.croppedImage);
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }

}
