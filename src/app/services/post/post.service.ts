import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient) {

  }

  moreSeePosts(): Observable<number[]> {
    return this.http.get<PostResponse>(`${environment.apiUrl}/royal/more-see-posts`)
      .pipe(map((response) => {
        if (response.success) {
          return response.result?.map(value => parseInt(value.post_id, 0));
        }
        return [];
      }));
  }

  seePost(postId: number, meta = 'see_counter'): Observable<ResponseAPI> {
    return this.http.get<PostResponse>(`${environment.apiUrl}/royal/see-post`, {params: {postId, meta}});
  }


}

export interface PostResponse extends ResponseAPI {
  get: any;
  result: any[];
}

export interface ResponseAPI {
  success: boolean;
  request?: any;
}


