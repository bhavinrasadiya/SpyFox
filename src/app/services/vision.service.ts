import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VisionService {

  constructor(private http: HTTP, private httpClient: HttpClient) { }

  getData(base64Image) {
    const body = {
      'requests': [
        {
          'image': {
            'content': base64Image
          },
          'features': [
            {
              'type': 'LABEL_DETECTION'
            },
            {
              'type': 'WEB_DETECTION'
            },
            {
              'type': 'FACE_DETECTION'
            },
            {
              'type': 'TEXT_DETECTION'
            }
          ]
        }
      ]
    };

    return this.httpClient.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body);
  }
}
