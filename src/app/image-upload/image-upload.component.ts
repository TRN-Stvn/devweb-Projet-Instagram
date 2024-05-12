import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ImageService } from '../services/image.service';
import { Image } from '../services/image';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  imports: [ReactiveFormsModule], // Now valid because the component is standalone
  standalone: true
})
export class ImageUploadComponent {
  uploadForm: FormGroup;
  imageService: ImageService = inject(ImageService);
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      userId: [null, Validators.required],
      category: ['']
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.uploadForm.patchValue({ image: file });
  }
  onSubmit(): void {
    if (this.uploadForm.valid) {
      const file: File = this.uploadForm.get('image')!.value;
      const imageData: Image = {
        user_id: this.uploadForm.get('userId')!.value,
        title: this.uploadForm.get('title')!.value,
        description: this.uploadForm.get('description')!.value,
        category: this.uploadForm.get('category')!.value,
        image_path: '',
        id: 0
      };
  
      this.imageService.uploadImage(imageData, file).then(response => {
        console.log('Upload successful', response);
      }).catch(error => {
        console.error('Upload failed', error);
      });
    } else {
      console.error('Form is not valid');
    }
  }

}
