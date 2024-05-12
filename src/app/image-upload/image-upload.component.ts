import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  imports: [ReactiveFormsModule], // Now valid because the component is standalone
  standalone: true
})
export class ImageUploadComponent {
  uploadForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.uploadForm.patchValue({ image: file });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('image')!.value);
    formData.append('title', this.uploadForm.get('title')!.value);
    formData.append('description', this.uploadForm.get('description')!.value);

    // Implement the service call to upload the image
  }
}
