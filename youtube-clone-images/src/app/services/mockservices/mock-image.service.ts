import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockImageService {
  constructor() {}

  getImages() {
    // Return an array of mock image data
    return [
      { id: 1, url: 'assets/images/image1.jpg', title: 'First Image', description: 'This is the first image' },
      { id: 2, url: 'assets/images/image2.jpg', title: 'Second Image', description: 'This is the second image' }
    ];
  }
}
