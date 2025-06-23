import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca2,flags';
  private cachedCountries: string[] | null = null;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<string[]> {
    if (this.cachedCountries) {
      return of(this.cachedCountries);
    }

    return this.http.get<any[]>(this.API_URL).pipe(
      map(countries => {
        this.cachedCountries = countries.map(c => c.name.common).sort();
        return this.cachedCountries;
      }),
      catchError(() => of([]))
    );
  }
}