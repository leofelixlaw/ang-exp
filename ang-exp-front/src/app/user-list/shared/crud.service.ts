import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HandleErrorService } from "../../shared/services/handle-error.service";

@Injectable({
  providedIn: "root"
})
export class CrudService {
  url = "http://localhost:3000/";

  constructor(
    private httpClient: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  getUsers(): Observable<any> {
    return this.httpClient.get<any[]>(this.url + 'users').pipe(
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

  // saveItem(data: any): Observable<any> {
  //   return this.httpClient.post<any>(this.url, data).pipe(
  //     tap(_ => console.log("sms save successfull")),
  //     catchError(this.handleErrorService.handleError)
  //   );
  // }

  // putItem(id: number, data: any): Observable<any> {
  //   return this.httpClient.put<any>(this.url + "/" + id, data).pipe(
  //     tap(_ => console.log("sms save successfull")),
  //     catchError(this.handleErrorService.handleError)
  //   );
  // }

  // deleteItem(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(this.url + "/" + id).pipe(
  //     tap(_ => console.log("sms deleted")),
  //     catchError(this.handleErrorService.handleError)
  //   );
  // }
}
