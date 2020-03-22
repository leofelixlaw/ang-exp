import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HandleErrorService } from "../../shared/services/handle-error.service";
import { environment } from '../../../environments/environment';
// import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: "root"
})

export class CrudService {
  url = environment.serverURL + '/user';
  options = { responseType: 'text' as 'json' };

  constructor(
    private httpClient: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getItems(): Observable<any> {
    return this.httpClient.get<any[]>(this.url + '/list').pipe(
      tap(_ => console.log("User item fetch successfull")),
      catchError(this.handleErrorService.handle("User getList", []))
    );
  }

  // getItem(id: number): Observable<any> {
  //   return this.httpClient.get<any>(this.url + "/" + id).pipe(
  //     tap(_ => console.log("sms fetch successfull")),
  //     catchError(this.handleErrorService.handle("SMS getList", []))
  //   );
  // }

  saveItem(data: any): Observable<any> {
    return this.httpClient.post<any>(this.url, data, this.options).pipe(
      tap(_ => console.log("item save successfull")),
      catchError(this.handleErrorService.handleError)
    );
  }

  putItem(id: any, data: any): Observable<any> {
    return this.httpClient.put<any>(this.url + "/" + id, data, this.options).pipe(
      tap(_ => console.log("item edited successfull")),
      catchError(this.handleErrorService.handleError)
    );
  }

  deleteItem(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.url + "/" + id, this.options).pipe(
      tap(_ => console.log("item deleted")),
      catchError(this.handleErrorService.handleError)
    );
  }
}
