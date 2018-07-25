import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

/* Naming NOTE
  The API's file field is `fileItem` thus, we name it the same below
  it's like saying <input type='file' name='fileItem' />
  on a standard file field
*/

@Injectable()
export class UploadService {
  fileName: string;

  apiBaseURL = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient) {}

  updateFileName(filename: string) {
    this.fileName = filename;
  }

  fileUpload(fileItem: File, extraData?): any {
    const apiCreateEndpoint = `${this.apiBaseURL}files/create/`;
    const formData: FormData = new FormData();

    formData.append('fileItem', fileItem, fileItem.name);
    if (extraData) {
      for (const key of extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key]);
      }
    }

    const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
      reportProgress: true // for progress data
    });
    return this.http.request(req);
  }

  optionalFileUpload(fileItem?: File, extraData?): any {
    const apiCreateEndpoint = `${this.apiBaseURL}files/create/`;
    const formData: FormData = new FormData(); //
    let fileName;
    if (extraData) {
      for (const key of extraData) {
        // iterate and set other form data
        if (key === 'fileName') {
          fileName = extraData[key];
        }
        formData.append(key, extraData[key]);
      }
    }

    if (fileItem) {
      if (!fileName) {
        fileName = fileItem.name;
      }
      formData.append('image', fileItem, fileName);
    }
    const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
      reportProgress: true // for progress data
    });
    return this.http.request(req);
  }
  list(): Observable<any> {
    const listEndpoint = `${this.apiBaseURL}files/`;
    return this.http.get(listEndpoint);
  }
}
