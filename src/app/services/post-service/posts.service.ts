import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../../models/post.interface";
import { BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {
  jumbotronInfos = new BehaviorSubject({title: 100, subtitle: 10});
    constructor(private http: HttpClient) {
    }
    getPosts() {
        return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    }

    getPostById(id: number) {
        return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    }

    setJumbotronInfos(title: number, subtitle: number) {
      this.jumbotronInfos.next({title, subtitle});
    }

    getJumbotronInfos() {
      return this.jumbotronInfos.asObservable();
    }
}
