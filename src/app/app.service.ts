import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AlvsCandidate } from './models/alvs-candidate.entity';
import { AlvsCandidateResult } from './models/alvs-candidate-result.entity';

@Injectable({
  providedIn: 'root'
})
export class AppService {
// tslint:disable-next-line: max-line-length
  readonly alvsBaseUrl = 'https://location.sa.gov.au/arcgis/rest/services/Locators/ALVS2CompositeSearch_PLBPro/GeocodeServer/findAddressCandidates?f=pjson&Street=';

  constructor(
    private http: HttpClient,
  ) { }

  avlsSearchUrl(street: string): string {
    let url = this.alvsBaseUrl;
    if (street) {
      url += street.replace(/\s+/g, '+');
    }
    return url;
  }

  getCandidates(street: string): Observable<AlvsCandidateResult> {
    const url = this.avlsSearchUrl(street);
    return this.http.get<AlvsCandidateResult>(url)
      .pipe(
        tap(_ => this.log('fetched candidates')),
        catchError(this.handleError<AlvsCandidateResult>('getCandidates', null)),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(msg: string) {
    console.log(msg);
  }

}
