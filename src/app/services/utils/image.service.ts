import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {
  }

  getImage(imageUrl: string): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.addEventListener('load', () => {
      const reader = new FileReader();
      reader.readAsDataURL(xhr.response);
      reader.addEventListener('loadend', () => {
      });
    });
  }


}
