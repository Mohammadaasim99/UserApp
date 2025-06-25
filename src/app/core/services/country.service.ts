import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface CountryApiResponse {
  name: { common: string };
  cca2: string;
  flags: any;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca2,flags';
  private cachedCountries: string[] | null = null;

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<string[]> {
    return this.http.get<CountryApiResponse[]>(this.API_URL).pipe(
      map(response => response.map(country => country.name.common).sort()),
      catchError(() => {
        console.error('Failed to fetch countries');
        return of([]);
      })
    );
  }
}