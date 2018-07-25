import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpEventType, HttpResponse } from '../../../../node_modules/@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';
import { UploadService } from '../../services/upload.service';

const URL = 'http://127.0.0.1:5000/upload';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  file: File;
  percentDone = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private upload: UploadService
  ) {}

  ngOnInit() {}

  onFileChanged(event) {
    this.percentDone = 0;
    this.file = event.target.files[0];
  }

  onUpload() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append('myFile', this.file, this.file.name);

    // this.http.post('http://127.0.0.1:8888/upload', this.file, {
    this.http.post('http://127.0.0.1:8888/api/upload', uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
        console.log(event); // handle event here
        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          this.percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${this.percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('Start Analysis!');
          this.upload.updateFileName(event.body['name']);
          this.router.navigate(['analysis']);
        }
    });
  }

}
