import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


interface HeroPosition {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private baseUrl = 'http://localhost:8080/hero'; // URL de l'API Spring Boot  

  private carteUrl = 'http://localhost:8080/api/carte'; // URL de votre API carte
  private moveHeroUrl = 'http://localhost:8080/api/moveHero'; // URL to your Spring Boot endpoint
  private positionHeroUrl = 'http://localhost:8080/api/position'; // URL to your Spring Boot endpoint

  constructor(private http: HttpClient) { }

  getCarte(): Observable<string[]> {
    return this.http.get<string[]>(this.carteUrl);
  }

  moveHero(direction: string): Observable<number[]> {
    return this.http.post<number[]>(`${this.moveHeroUrl}`, direction)
      .pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          return throwError(error); // Renvoyer l'erreur pour une gestion ultérieure
        })
      );
  }

  getHeroPosition(): Observable<HeroPosition> {
    return this.http.get<HeroPosition>(`${this.positionHeroUrl}`);
  }
 
}