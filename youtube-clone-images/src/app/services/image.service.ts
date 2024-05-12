import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from './image';



@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://127.0.0.1:5000';
  
  // constructor(private http: HttpClient) { }

  // uploadImage(formData: FormData): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/upload`, formData);
  // }

  async getAllImages(): Promise<Image[]> {
    const data = await fetch(`${this.baseUrl}/images`);
    return await data.json() ?? [];
  }

  async uploadImage(imageData: Image, file: File): Promise<any> {
    const formData = new FormData();
    formData.append('user_id', imageData.user_id.toString());
    formData.append('title', imageData.title);
    formData.append('description', imageData.description || '');
    formData.append('image', file);
    if (imageData.category) {
      formData.append('category', imageData.category);
    }

    const response = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      body: formData
    });
    return await response.json();
  }
}
