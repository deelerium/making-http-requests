import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AppComponentService {
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  addQuoteToServ(data: any): Observable<any> {
    const promise = new Promise((resolve, reject) => {
      this.http
        .post(
          `https://making-http-requests-3c643-default-rtdb.europe-west1.firebasedatabase.app/quotes.json`,
          data
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
    return from(promise);
  }
  getQuotes(): Observable<any> {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(
          `https://making-http-requests-3c643-default-rtdb.europe-west1.firebasedatabase.app/quotes.json`
        )
        .pipe(
          map(responseData => {
            const postArray = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postArray.push({ ...responseData[key], id: key });
              }
            }
            return postArray;
          })
        )
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
    return from(promise);
  }
}
