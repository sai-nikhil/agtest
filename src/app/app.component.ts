import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://task-nik.firebaseio.com/posts.json')
    .pipe(map(data=>{
      const resArray = [];
      for(let key in data){
        if(data.hasOwnProperty(key)){
          resArray.push({...data[key],id:key})
        }
        
      }
      return resArray;
    }))
    .subscribe(data=>{this.loadedPosts=data})
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://task-nik.firebaseio.com/posts.json',
        postData,{
          observe:'body'
        }
      )
      
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.http.get('https://task-nik.firebaseio.com/posts.json')
    .pipe(map(data=>{
      const resArray = [];
      for(let key in data){
        if(data.hasOwnProperty(key)){
          resArray.push({...data[key],id:key})
        }
        
      }
      return resArray;
    }))
    .subscribe(data=>console.log(data))
  }

  onClearPosts() {
    // Send Http request
  }
}
